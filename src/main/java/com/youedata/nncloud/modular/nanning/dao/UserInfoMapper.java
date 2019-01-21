package com.youedata.nncloud.modular.nanning.dao;

import com.youedata.nncloud.modular.nanning.model.UserInfo;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 用户表 Mapper 接口
 * </p>
 *
 * @author Monkey
 * @since 2019-01-21
 */
@Transactional
@Component
public interface UserInfoMapper extends BaseMapper<UserInfo> {

}
