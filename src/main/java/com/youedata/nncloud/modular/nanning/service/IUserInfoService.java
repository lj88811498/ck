package com.youedata.nncloud.modular.nanning.service;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.service.IService;
import com.youedata.nncloud.modular.nanning.model.UserInfo;
import com.youedata.nncloud.modular.nanning.model.UserMini;

/**
 * 用户信息Service
 *
 * @author Monkey
 * @Date 2019-01-21 09:55:01
 */
public interface IUserInfoService extends IService<UserInfo> {
    /**
     * 用户登录
     *
     * @param userInfoName
     * @param userinfoPwd
     */
    UserMini login(String userInfoName, String userinfoPwd) throws Exception;

    /**
     * 帮助注册
     *
     * @param userInfoId
     * @param userinfoTel
     * @param userinfoWx
     * @param userinfoNickname
     * @param userinfoPwd
     */
    void addUser(String userInfoId, String userinfoTel, String userinfoWx, String userinfoNickname, String userinfoPwd) throws Exception;

    /**
     * 修改密码
     *
     * @param userInfoId
     * @param oldPassord
     * @param newPassord
     */
    void changePwd(String userInfoId, String oldPassord, String newPassord, String userinfoTel) throws Exception;


    /**
     * 我的团队
     *
     * @param userInfoId
     * @return
     */
    JSONObject myGroup(String userInfoId);

    /**
     * 修改个人信息
     *
     * @param userInfoId
     * @return
     */
    void update(String userInfoId, String userinfoHead, String userInfoSurname, String userInfoSex, String userinfoTel, String userInfoProvince, String userInfoCity, String userinfoWx, String userinfoNickname);

    /**
     * 获取指定等级的推荐用户-五级和九级
     *
     * @param userInfoTreecode
     * @param userInfoLv
     * @return
     */
    UserMini selectHighLvUser(String userInfoTreecode, String userInfoLv);

    /**
     * 获取商家信息
     *
     * @return
     */
    JSONObject getMerchants(int userInfoId) throws Exception;


    /**
     * 获取商家信息第二版
     *
     * @return
     */
    JSONObject getMerchants2(int userInfoId) throws Exception;

    /**
     * 忘记密码
     *
     * @param userinfoTel
     * @param newPassord
     */
    void forgetPwd(String userinfoTel, String newPassord) throws Exception;
}
