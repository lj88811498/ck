package com.youedata.nncloud.modular.nanning.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.youedata.nncloud.core.util.Encrypt;
import com.youedata.nncloud.core.util.JsonUtil;
import com.youedata.nncloud.core.util.MD5Util;
import com.youedata.nncloud.modular.nanning.dao.UserInfoMapper;
import com.youedata.nncloud.modular.nanning.model.UserMini;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.UserInfo;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IUserInfoService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * 用户信息Service
 *
 * @author Monkey
 * @Date 2019-01-21 09:55:01
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class UserInfoServiceImpl extends ServiceImpl<BaseMapper<UserInfo>, UserInfo> implements IUserInfoService {
    @Autowired
    UserInfoMapper userInfoMapper;

    /**
     * 用户登录
     *
     * @param userInfoName
     * @param userinfoPwd
     */
    @Override
    public UserMini login(String userInfoName, String userinfoPwd) throws Exception {
        UserInfo userInfo = userInfoMapper.selectByTel(userInfoName);
        if (userInfo == null ||  !userInfo.getUserinfoPwd().equals(Encrypt.getMd5(userinfoPwd))) {
            throw new Exception("用户名或密码错误");
        } else {
            return userInfoMapper.selectMiniMessage(userInfoName);
        }

    }

    /**
     * 帮助注册
     *
     * @param userInfoId
     * @param userinfoTel
     * @param userinfoWx
     * @param userinfoNickname
     * @param userinfoPwd
     */
    @Override
    public void addUser(String userInfoId, String userinfoTel, String userinfoWx, String userinfoNickname, String userinfoPwd) throws Exception {
        UserInfo user = userInfoMapper.selectByTel(userinfoTel);
        if(user != null){//手机号查重
            throw new Exception("该手机已注册");
        }

        //查询当前登录用户信息（推荐人信息）
        UserInfo userInfo = userInfoMapper.selectById(userInfoId);

        //新用户信息补全
        UserInfo newUser = new UserInfo();
        newUser.setUserinfoName(userinfoTel);//用户名就是手机号
        newUser.setUserinfoTel(userinfoTel);
        newUser.setUserinfoWx(userinfoWx);
        newUser.setUserinfoNickname(userinfoNickname);
        newUser.setUserinfoPwd(Encrypt.getMd5(userinfoPwd));
        newUser.setUserinfoLv("0");
        newUser.setUserinfoOrg(userInfo.getUserinfoCode());

        newUser.setUserinfoTreecode(userInfoMapper.getTreeCodeNext(userInfo.getUserinfoTreecode()));
        newUser.setUserinfoCreateBy(Integer.valueOf(userInfoId));
        newUser.setUserinfoCreateTime(new Date());
        newUser.insert();

    }

    /**
     * 修改密码
     *
     * @param userInfoId
     * @param oldPassord
     * @param newPassord
     */
    @Override
    public void changePwd(String userInfoId, String oldPassord, String newPassord) throws Exception {
        //查询当前登录用户信息
        UserInfo userInfo = userInfoMapper.selectById(userInfoId);
        if (userInfo.getUserinfoPwd().equals(Encrypt.getMd5(oldPassord))) {
            userInfo.setUserinfoPwd(Encrypt.getMd5(newPassord));
            userInfo.updateById();
        } else {
            throw new Exception("原密码错误");
        }

    }

    /**
     * 我的团队
     * @param userInfoId
     * @return
     */
    @Override
    public JSONObject myGroup(String userInfoId) {
        JSONObject page = new JSONObject();
        //直系下线查询
        List<UserMini> userList = userInfoMapper.selectImmediateList(userInfoId);
        page.put("data",userList);
        Integer integer = userInfoMapper.selectHeirCount(userInfoId);
        page.put("sum",integer);
        return page;
    }

    /**
     * 获取指定等级的推荐用户-五级和九级
     *
     * @param userInfoTreecode
     * @param userInfoLv
     * @return
     */
    @Override
    public UserMini selectHighLvUser(String userInfoTreecode, String userInfoLv) {

        return userInfoMapper.selectHighLvUser(userInfoTreecode, userInfoLv);
    }

    /**
     * 获取商家信息
     *
     * @param userInfoId
     * @return
     */
    @Override
    public JSONObject getMerchants(int userInfoId) throws Exception {
        String userInfoTreecode;
        String userInfoLv;
        String targetLv;
        String userInfoOrg;
        JSONObject js = JsonUtil.createOkJson();
        List list = new ArrayList();
        UserInfo userInfo = userInfoMapper.selectById(userInfoId);
        if (userInfo != null){
            userInfoTreecode = userInfo.getUserinfoTreecode();
            userInfoLv = userInfo.getUserinfoLv();
            targetLv = (Integer.parseInt(userInfoLv) + 1 ) + "";
            userInfoOrg = userInfo.getUserinfoOrg();
        }  else {
            throw new Exception("不存在此用户");
        }
        //如果是0级
        if ("0".equals(userInfoLv)) {
            UserMini mini5 =    userInfoMapper.selectHighLvUser(userInfoTreecode, "5");
            UserMini leader = userInfoMapper.selectLeader(userInfoOrg);
            list.add(mini5);
            list.add(leader);

        }
        //如果是4级
        else if ("4".equals(userInfoLv)){
            UserMini mini5 =    userInfoMapper.selectHighLvUser(userInfoTreecode, "5");
            UserMini mini9 =    userInfoMapper.selectHighLvUser(userInfoTreecode, "9");
            list.add(mini5);
            list.add(mini9);
        }
        //其他情况
        else {
            UserMini mini5 =    userInfoMapper.selectHighLvUser(userInfoTreecode, targetLv);
            list.add(mini5);
        }
        js.put("page", list);
        return js;

    }

}
