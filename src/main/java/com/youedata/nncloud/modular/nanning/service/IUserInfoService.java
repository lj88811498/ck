package com.youedata.nncloud.modular.nanning.service;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.IService;
import com.youedata.nncloud.modular.nanning.model.UserInfo;
/**
 * 用户信息Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
public interface IUserInfoService extends IService<UserInfo>{

    /**
     * @author: Monkey
     * @param: []
     * @date: Created in  2018/9/17 16:49.
     * @return com.youedata.nncloud.modular.nanning.model.UserInfo
     */
    Page<UserInfo> selectOne(String userInfoType, String userInfoName, String userInfoNamePwd) throws Exception;
}
