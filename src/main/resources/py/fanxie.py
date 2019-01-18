#coding:utf-8
import pandas as pd
import numpy as np
import math
import pymysql
import mysql
import MySQLdb
from sqlalchemy import create_engine
from sqlalchemy.types import NVARCHAR, Float, Integer
from datetime import datetime
import sys
reload(sys)
sys.setdefaultencoding('utf-8')


def main():
    print "begin"
    ############################转化情况###################################################
    ####；连接数据库
    db = pymysql.connect('172.16.0.5', 'root', '1qaz@WSX', 'fxplat', charset='utf8')
    cursor = db.cursor()
    ###查询所需字段
    zhqk_sql = 'select  involving_evil_user_id,involving_evil_time,' \
               'involving_evil_start_time,involving_evil_work,involving_evil_noticed_time,involving_evil_status,involving_evil_family_in from involving_evil'
    zhqk = pd.read_sql(zhqk_sql, db)
    ###生成练功时间字段，这里没考虑转化时间为空的情况，若为空，用datetime.now()替代/////生成纳入监管时长字段，现在时-纳入工作时间
    zhqk['lgsc'] = zhqk.involving_evil_time.map(lambda x: x.year) - zhqk.involving_evil_start_time.map(lambda x: x.year)
    zhqk['jgsc'] = datetime.now().year - zhqk.involving_evil_noticed_time.map(lambda x: x.year)
    ###填补缺失值
    zhqk.involving_evil_status.fillna('未转化需攻坚', inplace=True)
    zhqk.involving_evil_family_in.fillna('无', inplace=True)
    zhqk.involving_evil_work.fillna(0, inplace=True)
    ####分类变量转为数值型
    zhqk.loc[zhqk['involving_evil_status'] == '未转化需攻坚','involving_evil_status'] = 2
    zhqk.loc[zhqk['involving_evil_status'] == '已转化需巩固','involving_evil_status'] = 1
    zhqk.loc[zhqk['involving_evil_status'] == '已转化并解脱','involving_evil_status'] = 0

    zhqk.loc[zhqk['involving_evil_family_in'] == '有','involving_evil_family_in'] = 1
    zhqk.loc[zhqk['involving_evil_family_in'] == '无', 'involving_evil_family_in'] = 0

    zhqk.loc[zhqk['involving_evil_work'] == 'director', 'involving_evil_work'] = 1
    ##选择所需字段建模
    jm = zhqk.loc[:,['involving_evil_user_id', 'lgsc', 'involving_evil_work', 'jgsc', 'involving_evil_status',
               'involving_evil_family_in']]
    ####排秩
    jm['RSR_lgsc'] = jm.lgsc.rank(ascending=False)
    jm['RSR_involving_evil_work'] = jm.involving_evil_work.rank(ascending=False)
    jm['RSR_jgsc'] = jm.jgsc.rank(ascending=True)
    jm['RSR_involving_evil_status'] = jm.involving_evil_status.rank(ascending=False)
    jm['RSR_involving_evil_family_in'] = jm.involving_evil_family_in.rank(ascending=False)
    ###计算秩和比
    jm['zhqk_RSR'] = (jm['RSR_lgsc'] + jm['RSR_involving_evil_work'] + jm['RSR_jgsc'] + jm['RSR_involving_evil_status'] + jm[
        'RSR_involving_evil_family_in']) / (5 * jm.shape[0])
    jm['zhqk_RSR'] = jm['zhqk_RSR'].map(lambda x: 100-round(x * 100))
    zhqk_result = jm[['involving_evil_user_id','zhqk_RSR']]
    zhqk_result.columns=[['zhqk_user_id','zhqk_RSR']]
    # zhqk_result.to_csv('zhqk.csv',index=False)
    ################################帮教情况#####################################################
    bjqk_sql = 'select user_heretics_record_user_id,user_heretics_record_time from user_heretics_record'
    bjqk = pd.read_sql(bjqk_sql, db)

    bjqk['month'] = bjqk.user_heretics_record_time.map(lambda x: x.month)
    bjqk_a = bjqk.ix[bjqk['month'] == datetime.now().month, :]
    if bjqk_a.shape[0] == 0:
        bjqk_month = bjqk.ix[bjqk['month'] == (datetime.now().month - 1), :]
    else:
        bjqk_month = bjqk_a

    bj = bjqk_month.groupby('user_heretics_record_user_id').sum()
    bj['amount'] = bj['month'] / datetime.now().month
    bj = bj.reset_index()
    bj['bj_index'] = pow(bj['amount'] - 4, 2)
    bj['bj_index1'] = bj['bj_index'].map(lambda x: math.sqrt(x))
    bj['bj_index3'] = bj['bj_index1'].map(lambda x: round(100 / (1 + np.exp(-x))))
    bj_result = bj[['user_heretics_record_user_id','bj_index3']]
    bj_result.columns = [['bj_user_id', 'bj_index']]
    # bj_result.to_csv('bj_RSR.csv',index=False)
    ################################受打击情况#############################################
    sdj_sql1 = 'select involving_evil_reg_user_id,involving_evil_reg_arrest_time from involving_evil_reg'
    sdj_sql2 = 'select involving_evil_user_id,involving_evil_still_in from involving_evil'
    sdj_sql3 = 'select involving_evil_record_user_id,involving_evil_record_type,involving_evil_record_unpunished_time,' \
               'involving_evil_record_arrest_time from involving_evil_record'

    sdj_a1 = pd.read_sql(sdj_sql1, db)
    sdj_a2 = pd.read_sql(sdj_sql2, db)
    sdj_a3 = pd.read_sql(sdj_sql3, db)

    sdj_a1 = sdj_a1.groupby('involving_evil_reg_user_id').count().reset_index()
    sdj_a1.columns = ['involving_evil_reg_user_id', 'arrest_amount']

    sdj_a3['involving_evil_record_type'] = sdj_a3['involving_evil_record_type'].apply(c1)
    sdj_a3 = sdj_a3.dropna()
    sdj_a3['punished_time'] = map(lambda x, y: c2(x, y), sdj_a3['involving_evil_record_unpunished_time'],
                              sdj_a3['involving_evil_record_arrest_time'])
    sdj_a3['RSR_type'] = sdj_a3.involving_evil_record_type.rank(ascending=False)
    sdj_a3['RSR_punished_time'] = sdj_a3.punished_time.rank(ascending=False)
    sdj_a3['punish_RSR'] = (sdj_a3['RSR_type'] + sdj_a3['RSR_punished_time']) / (2 * sdj_a3.shape[0])
    punish_degree = pd.DataFrame(sdj_a3['punish_RSR'].groupby(sdj_a3['involving_evil_record_user_id']).mean()).reset_index()

    punish_amount = pd.DataFrame(sdj_a3['punish_RSR'].groupby(sdj_a3['involving_evil_record_user_id']).count()).reset_index()
    punish_amount.columns = ['involving_evil_record_user_id', 'punish_amount']
    punish = pd.merge(punish_amount, punish_degree, how='inner', left_on='involving_evil_record_user_id',
                      right_on='involving_evil_record_user_id')

    punish['RSR_punish_amount'] = punish.punish_amount.rank(ascending=False)
    punish['RSR_punish_RSR'] = punish.punish_RSR.rank()
    punish['RSR_punish'] = (punish['RSR_punish_amount'] + punish['RSR_punish_RSR']) / (2 * punish.shape[0])
    punish = punish[['involving_evil_record_user_id', 'RSR_punish']]

    a = pd.merge(sdj_a1, sdj_a2, how='outer', left_on='involving_evil_reg_user_id', right_on='involving_evil_user_id')
    a['a_user_id'] = map(lambda x, y: do_something(x, y), a['involving_evil_reg_user_id'], a['involving_evil_user_id'])
    sdj = pd.merge(a, punish, how='outer', left_on='a_user_id', right_on='involving_evil_record_user_id')
    sdj['user_id'] = map(lambda x, y: do_something(x, y), sdj['a_user_id'], sdj['involving_evil_record_user_id'])
    sdj = sdj[['user_id', 'RSR_punish', 'arrest_amount', 'involving_evil_still_in']]

    sdj.RSR_punish.fillna(1, inplace=True)
    sdj.arrest_amount.fillna(0, inplace=True)
    sdj.involving_evil_still_in.fillna(0, inplace=True)
    sdj['involving_evil_still_in'] = sdj['involving_evil_still_in'].apply(linux)
    # sdj.loc[sdj['involving_evil_still_in'] == '是', 'involving_evil_still_in'] = 1
    # sdj.loc[sdj['involving_evil_still_in'] == '否', 'involving_evil_still_in'] = 0

    sdj['rank_RSR_punish'] = sdj.RSR_punish.rank()
    sdj['rank_arrest_amount'] = sdj.arrest_amount.rank(ascending=False)
    sdj['rank_involving_evil_still_in'] = sdj.involving_evil_still_in.rank(ascending=False)
    sdj['sdj_RSR'] = (sdj['rank_RSR_punish'] + sdj['rank_arrest_amount'] + sdj['rank_involving_evil_still_in']) / (
        sdj.shape[0] * 3)
    sdj['sdj_RSR'] = sdj['sdj_RSR'].map(lambda x: round(100 * x)) ###转化为整数
    sdj_result = sdj[['user_id', 'sdj_RSR']]
    sdj_result.columns = [['sdj_user_id', 'sdj_RSR']]
    ########################################合并#############################################
    ###################zhqk、bj合并#############
    hb = pd.merge(zhqk_result,bj_result,how='outer',left_on='zhqk_user_id',right_on='bj_user_id')
    hb['hb_user_id'] = map(lambda x, y: do_something(x, y), hb['zhqk_user_id'],
                         hb['bj_user_id'])
    hb=hb[['hb_user_id','zhqk_RSR','bj_index']]
    ###########sdj合并####################
    hb2 = pd.merge(hb,sdj_result,how='outer',left_on='hb_user_id',right_on='sdj_user_id')
    hb2['hb2_user_id'] = map(lambda  x,y: do_something(x,y),hb2['hb_user_id'],hb2['sdj_user_id'])
    hb2=hb2[['hb2_user_id','zhqk_RSR','bj_index','sdj_RSR']]
    hb2['rcxw']=50
    hb2['qzwx']=50
    hb2=hb2.fillna(0)
############################存数据库###############################################
    hb2.columns=[['risk_user_id','risk_zhqk_RSR','risk_bj_index','risk_sdj_RSR','risk_rcxw','risk_qzwx']]
    hb2['risk_index']=(hb2['risk_zhqk_RSR']+hb2['risk_bj_index']+hb2['risk_sdj_RSR']+hb2['risk_rcxw']+hb2['risk_qzwx'])/5
    hb2['risk_index']=hb2['risk_index'].map(lambda x:round(x))
    hb2['risk_update_time']=datetime.now().strftime("%Y-%m-%d %H:%M:%S")


    connect = create_engine('mysql+pymysql://root:1qaz@WSX@172.16.0.5/fxplat?charset=utf8')
    # # dtypedic = {'risk_user_id':NVARCHAR(length=32),'risk_zhqk_RSR': NVARCHAR(length=32),'risk_bj_index':NVARCHAR(length=32),
    # #             'risk_sdj_RSR':NVARCHAR(length=32),'risk_rcxw':NVARCHAR(length=32),'risk_qzwx': NVARCHAR(length=32),
    # #             'risk_index': NVARCHAR(length=32)}
    hb2.to_sql(name='risk', con=connect, if_exists='append', index=False, index_label=False)
    print 'end'

def do_something(x, y):
    if x == y:
        return x
    elif np.isnan(x) and np.isnan(y) == False:
        return y
    elif np.isnan(x) == False and np.isnan(y):
        return x
    else:
        return "xx"

def c1(x):
    if x == '判刑':
        return 4
    elif x == '劳教':
        return 3
    elif x == '刑事拘留':
        return 2
    elif x == '行政拘留':
        return 1
    else:
        return np.nan

def c2(x, y):
    period = x.day - y.day
    if period > 0:
        return period
    else:
        return 0

def linux(x):
    if x == '是':
        return 1
    elif x == '否':
        return 0
    else:
        return 0



if __name__ == '__main__':
    main()


