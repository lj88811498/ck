package com.youedata.nncloud.modular.nanning.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.UserInfo;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IUserInfoService;


/**
 * 用户信息Service
 *
 * @author Monkey
 * @Date 2019-01-21 09:55:01
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class UserInfoServiceImpl extends ServiceImpl<BaseMapper<UserInfo>,UserInfo> implements IUserInfoService {
}
