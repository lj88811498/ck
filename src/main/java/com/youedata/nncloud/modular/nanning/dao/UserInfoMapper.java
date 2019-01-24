package com.youedata.nncloud.modular.nanning.dao;

import com.youedata.nncloud.modular.nanning.model.UserInfo;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.youedata.nncloud.modular.nanning.model.UserMini;
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
    UserMini selectMiniMessage(@Param("userInfoName")String userInfoName);

    /**
     * 查询用户所有直系下线
     * @param userInfoId
     * @return
     */
    List<UserMini> selectImmediateList(@Param("userInfoId")String userInfoId);

    /**
     * 查询用户子孙节点中所有一星及以上下线总和
     * @param userInfoId
     * @return
     */
    Integer selectHeirCount(@Param("userInfoId")String userInfoId);

    /**
     * 获取指定等级的推荐用户-五级和九级
     * @param userInfoTreecode
     * @param userInfoLv
     * @return
     */
    UserMini selectHighLvUser(@Param("userInfoTreecode") String userInfoTreecode,
                              @Param("userInfoLv") String userInfoLv,
                              @Param("flag") boolean flag);


    /**
     * 查询用户的上一级
     * @param userInfoCode
     * @return
     */
    UserMini selectLeader(@Param("userInfoCode") String userInfoCode);

    /**
     * 查询客服信息
     * @return
     */
    List<Map<String,String>> customerService();

    /**
     * 查询下一个邀请码
     * @return
     */
    String selectNextCode();

    /**
     * 查询下一个邀请码
     * @return
     */
    Integer selectMaxId();
}
