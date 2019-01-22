package com.youedata.nncloud.modular.nanning.dao;

import com.youedata.nncloud.modular.nanning.model.UserInfo;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

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

    /**
     * 查询当前用户直系子集中最大编号+1
     * @param userinfoTreeCode
     * @return
     */
    String getTreeCodeNext(@Param("TreeCode") String userinfoTreeCode);

    /**
     * 根据手机号查询用户信息
     * @param userInfoName
     * @return
     */
    UserInfo selectByTel(@Param("userInfoName")String userInfoName);

    /**
     * 查询个人简版信息
     * @param userInfoName
     * @return
     */
    List<Map<String, String>> selectMiniMessage(@Param("userInfoName")String userInfoName);
}
