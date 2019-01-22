package com.youedata.nncloud.modular.nanning.service;

import com.baomidou.mybatisplus.service.IService;
import com.youedata.nncloud.modular.nanning.model.UserInfo;

import java.util.List;
import java.util.Map;

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
    List<Map<String, String>> login(String userInfoName, String userinfoPwd) throws Exception;

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
    void changePwd(String userInfoId, String oldPassord, String newPassord) throws Exception;


}
