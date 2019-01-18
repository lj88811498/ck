package com.youedata.nncloud.modular.nanning.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.youedata.nncloud.core.common.constant.factory.PageFactory;
import com.youedata.nncloud.core.shiro.ShiroKit;
import com.youedata.nncloud.modular.nanning.dao.UserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.UserInfo;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IUserInfoService;

import java.util.ArrayList;
import java.util.List;


/**
 * 用户信息Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class UserInfoServiceImpl extends ServiceImpl<BaseMapper<UserInfo>,UserInfo> implements IUserInfoService {

    @Autowired
    private UserInfoMapper userInfoMapper;

    /**
     * @param userInfoType
     * @param userInfoName
     * @param userInfoNamePwd
     * @return com.youedata.nncloud.modular.nanning.model.UserInfo
     * @author: Monkey
     * @param: []
     * @date: Created in  2018/9/17 16:49.
     */
    @Override
    public Page<UserInfo> selectOne(String userInfoType, String userInfoName, String userInfoNamePwd) throws Exception {
        Page<UserInfo> page = new PageFactory<UserInfo>().defaultPage2(0, 0 );
        UserInfo userInfo = new UserInfo(userInfoType, userInfoName);
        UserInfo temp = userInfoMapper.selectOne(userInfo);
        if (temp != null) {
            String password = temp.getUserInfoNamePwd();
            String salt = temp.getUserInfoSalt();
            if (password.equals(ShiroKit.md5(userInfoNamePwd, salt))) {
                List list = new ArrayList<>();
                temp.setUserInfoNamePwd(null);
                list.add(temp);
                page.setRecords(list);
                return page;
            }
        } else {
            throw new Exception("用户不存在！");
        }
        return null;
    }
}
