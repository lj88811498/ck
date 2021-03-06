package com.youedata.nncloud.modular.nanning.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.youedata.nncloud.core.util.Encrypt;
import com.youedata.nncloud.core.util.JsonUtil;
import com.youedata.nncloud.modular.nanning.dao.UserInfoMapper;
import com.youedata.nncloud.modular.nanning.model.UserInfo;
import com.youedata.nncloud.modular.nanning.model.UserMini;
import com.youedata.nncloud.modular.nanning.service.IUserInfoService;
import com.youedata.nncloud.modular.system.model.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


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
        if (userInfo != null) {
            if("1".equals(userInfo.getUserInfoStatus())){
                throw new Exception("账户已冻结，请联系管理员");
            }
        }
        if (userInfo == null || !userInfo.getUserinfoPwd().equals(Encrypt.getMd5(userinfoPwd))) {
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
        if (user != null) {//手机号查重
            throw new Exception("该手机已注册");
        }

        //查询当前登录用户信息（推荐人信息）
        UserInfo userInfo = userInfoMapper.selectById(userInfoId);
        //查询当前最大id
        //新用户信息补全
        UserInfo newUser = new UserInfo();
        Integer id = userInfoMapper.selectMaxId();
        if(id != null){
            newUser.setUserinfoId(id+18);
        }
        String nextTreeCode = userInfoMapper.getTreeCodeNext(userInfo.getUserinfoTreecode());
        if (StringUtils.isBlank(nextTreeCode)) {
            nextTreeCode = userInfo.getUserinfoTreecode() + "-01";
        }
        newUser.setUserinfoName(userinfoTel);//用户名就是手机号
        newUser.setUserinfoTel(userinfoTel);
        newUser.setUserinfoWx(userinfoWx);
        newUser.setUserinfoNickname(userinfoNickname);
        newUser.setUserinfoPwd(Encrypt.getMd5(userinfoPwd));
        newUser.setUserinfoLv("0");
        newUser.setUserinfoOrg(userInfo.getUserinfoCode());
        newUser.setUserInfoStatus("0");
        newUser.setUserinfoTreecode(nextTreeCode);
        newUser.setUserinfoCreateBy(Integer.valueOf(userInfoId));
        newUser.setUserinfoCreateTime(new Date());
        userInfoMapper.insertNewUser(newUser);

    }

    /**
     * 修改密码
     *
     * @param userInfoId
     * @param oldPassord
     * @param newPassord
     */
    @Override
    public void changePwd(String userInfoId, String oldPassord, String newPassord,String userinfoTel) throws Exception {
        //查询当前登录用户信息
        UserInfo userInfo = userInfoMapper.selectByTel(userinfoTel);
        if (userInfo == null){
            throw new Exception("手机号码错误");
        }
        if (userInfo.getUserinfoPwd().equals(Encrypt.getMd5(oldPassord))) {
            userInfo.setUserinfoPwd(Encrypt.getMd5(newPassord));
            userInfo.updateById();
        } else {
            throw new Exception("原密码错误");
        }

    }

    /**
     * 忘记密码
     *
     * @param userinfoTel
     * @param newPassord
     */
    @Override
    public void forgetPwd(String userinfoTel, String newPassord) throws Exception {
        UserInfo userInfo = userInfoMapper.selectByTel(userinfoTel);
        if (userInfo == null) {
            throw new Exception("用户不存在");
        }
        userInfo.setUserinfoPwd(Encrypt.getMd5(newPassord));
        userInfo.updateById();
    }


    /**
     * 我的团队
     *
     * @param userInfoId
     * @return
     */
    @Override
    public JSONObject myGroup(String userInfoId) {
        JSONObject page = new JSONObject();
        //直系下线查询
        List<UserMini> userList = userInfoMapper.selectImmediateList(userInfoId);
        page.put("data", userList);
        page.put("myGroupSum", userList.size());
        Integer sum = userInfoMapper.selectHeirCount(userInfoId);
        if(sum >0){
            sum--;
        }
        page.put("sum", sum);
        return page;
    }


    /**
     * 修改个人信息
     *
     * @param userInfoId
     * @return
     */
    @Override
    public void update(String userInfoId, String userinfoHead, String userInfoSurname, String userInfoSex,
                       String userinfoTel, String userInfoProvince, String userInfoCity, String userinfoWx,
                       String userinfoNickname) {
        UserInfo userInfo = userInfoMapper.selectById(userInfoId);
        userInfo.setUserinfoHead(userinfoHead);
        userInfo.setUserInfoSurname(userInfoSurname);
        userInfo.setUserInfoSex(userInfoSex);
        userInfo.setUserinfoTel(userinfoTel);
        userInfo.setUserinfoName(userinfoTel);
        userInfo.setUserInfoProvince(userInfoProvince);
        userInfo.setUserInfoCity(userInfoCity);
        userInfo.setUserinfoWx(userinfoWx);
        userInfo.updateById();
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

        return userInfoMapper.selectHighLvUser(userInfoTreecode, userInfoLv, true);
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
        List<UserMini> list = new ArrayList();
        UserInfo userInfo = userInfoMapper.selectById(userInfoId);
        if (userInfo != null) {
            userInfoTreecode = userInfo.getUserinfoTreecode();
            userInfoLv = userInfo.getUserinfoLv();
            targetLv = (Integer.parseInt(userInfoLv) + 1) + "";
            userInfoOrg = userInfo.getUserinfoOrg();
        } else {
            throw new Exception("不存在此用户");
        }
        UserMini mini5 = null;
        UserMini leader = null;
        //如果是0级
        if ("0".equals(userInfoLv)) {
            mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, "5", true);
//            if (mini5 == null) {
//                mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, "5", false);
//            }
            //先找直系的
            int temp = 5;
            while (mini5 == null  && temp < 10) {
                mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, ++temp  + "", true);
            }
            //找不到就找不是直系的
            temp = 5;
            while (mini5 == null  && temp < 10) {
                mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, ++temp  + "", false);
            }
            //0星的时候，升级1星是查询直系1代
            leader = userInfoMapper.selectLeader(userInfoOrg);
        }
        //如果是4级
        else if ("4".equals(userInfoLv)) {
            mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, "5", true);
//            if (mini5 == null) {
//                mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, "5", false);
//            }
            int temp = 5;
            while (mini5 == null  && temp < 10) {
                mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, ++temp  + "", true);
            }
            //找不到就找不是直系的
            temp = 5;
            while (mini5 == null  && temp < 10) {
                mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, ++temp  + "", false);
            }
            leader = userInfoMapper.selectHighLvUser(userInfoTreecode, "9", true);
            if (leader == null) {
                leader = userInfoMapper.selectHighLvUser(userInfoTreecode, "9", false);
            }
        }
        //其他情况
        else {
            mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, targetLv, true);
//            if (mini5 == null) {
//                mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, targetLv, false);
//            }
            int temp = Integer.parseInt(targetLv);
            while (mini5 == null  && temp < 10) {
                mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, ++temp  + "", true);
            }
            temp = Integer.parseInt(targetLv);
            while (mini5 == null  && temp < 10) {
                mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, ++temp  + "", false);
            }
        }

        if (mini5 != null) {
            list.add(mini5);
        }

        if (leader != null) {
            list.add(leader);
        }

        if (list.size() == 0 || list.isEmpty()) {
            mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, targetLv, false);
            int temp = Integer.parseInt(targetLv);
            while (mini5 == null && temp < 10) {
                mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, ++temp  + "", true);
            }
            temp = Integer.parseInt(targetLv);
            while (mini5 == null && temp < 10) {
                mini5 = userInfoMapper.selectHighLvUser(userInfoTreecode, ++temp  + "", false);
            }
            list.add(mini5);
        }

        js.put("page", list);
        return js;

    }

    /**
     * 获取商家信息第二版
     * @param userInfoId
     * @return
     * @throws Exception
     */
    @Override
    public JSONObject getMerchants2(int userInfoId) throws Exception {
        String userInfoTreecode;
        String userInfoLv;
        String targetLv;
        String userInfoOrg;
        JSONObject js = JsonUtil.createOkJson();
        List<UserMini> list = new ArrayList();
        UserInfo userInfo = userInfoMapper.selectById(userInfoId);
        if (userInfo != null) {
            userInfoTreecode = userInfo.getUserinfoTreecode();
            userInfoLv = userInfo.getUserinfoLv();
            targetLv = (Integer.parseInt(userInfoLv) + 1) + "";
            userInfoOrg = userInfo.getUserinfoOrg();
        } else {
            throw new Exception("不存在此用户");
        }
        UserMini boss = null;
        UserMini leader = null;


        //准备升一级
        if ("0".equals(userInfoLv)) {
            boss = userInfoMapper.selectHighLvUser(userInfoTreecode, "5", true);
            int temp = 5;
            while (boss == null  && temp < 10) {
                boss = userInfoMapper.selectHighLvUser(userInfoTreecode, ++temp  + "", true);
            }
            temp = 5;
            while (boss == null  && temp < 10) {
                boss = userInfoMapper.selectHighLvUser(userInfoTreecode, ++temp  + "", false);
            }
        }
        //准备升五级
        else if ("4".equals(userInfoLv)) {
            boss = userInfoMapper.selectHighLvUser(userInfoTreecode, "9", true);
            if (boss == null) {
                boss = userInfoMapper.selectHighLvUser(userInfoTreecode, "9", false);
            }
        }
        //查询自己的N代领导
        //升几级就是几代
        //判断treecode “-”可以得到有几代
        String treecode = userInfo.getUserinfoTreecode();

        int length1 = treecode.length();
        int length2 = treecode.replaceAll("-", "").length();
        int dissLv = length1 - length2;
        int nextLv = Integer.parseInt(userInfoLv) + 1;
        //之差等于有没有对应的几代领导，如果有，则得到对应那代的treecode
        if (dissLv < nextLv) {
            String temp1 = treecode;
            if (temp1.contains("-")) {
                temp1 = temp1.substring(0, temp1.indexOf("-"));
            }
            String code[] = treecode.split("-");
            for (int i = 0; i < code.length; i ++) {
                if (i > 0) {
                    temp1 += "-" + code[i];
                }
                UserInfo tempUser = new UserInfo();
                tempUser = tempUser.selectOne(new EntityWrapper().eq("userInfo_treecode", temp1));
                if (tempUser != null ){
                    //目前的逻辑，肯定会有人选择，最高则为treecode=ck01的用户
                    if (Integer.parseInt(tempUser.getUserinfoLv()) >= Integer.parseInt(targetLv)) {
                        leader = new UserMini();
                        BeanUtils.copyProperties(tempUser, leader);
                        break;
                    }
                }
            }
        }

        while (leader == null) {
            if (dissLv >= nextLv) {
                int i = nextLv++;
                String temp = treecode;
                while (i-- > 0) {
                    temp = temp.substring(0, temp.lastIndexOf("-"));
                }
                UserInfo tempUser = new UserInfo();
//            UserInfo leader2 = userInfoMapper.selectOne(new EntityWrapper<UserInfo>());
//            if (leader2.getUserinfoLv() >= Integer.parseInt(userInfoLv) + 1) {
//
//            }
                tempUser = tempUser.selectOne(new EntityWrapper().eq("userInfo_treecode", temp));
                if (tempUser != null ){
                    if (Integer.parseInt(tempUser.getUserinfoLv()) >= Integer.parseInt(targetLv)) {
                        leader = new UserMini();
                        BeanUtils.copyProperties(tempUser, leader);
                    } else {
                         continue;
                    }
                }
            }
            else {
                break;
            }
        //用户对应的那代领导不存在

        }
        if (boss != null) {
            list.add(boss);
        }

        if (leader != null) {
            list.add(leader);
        }

        js.put("page", list);
        return js;
    }


}
