package com.youedata.nncloud.modular.nanning.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.UserRole;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IUserRoleService;


/**
 * 用户角色Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class UserRoleServiceImpl extends ServiceImpl<BaseMapper<UserRole>,UserRole> implements IUserRoleService {
}
