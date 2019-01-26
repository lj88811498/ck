package com.youedata.nncloud.modular.nanning.dao;

import com.baomidou.mybatisplus.plugins.Page;
import com.youedata.nncloud.modular.nanning.model.Upgrade;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 升级表 Mapper 接口
 * </p>
 *
 * @author Monkey
 * @since 2019-01-21
 */
@Transactional
@Component
public interface UpgradeMapper extends BaseMapper<Upgrade> {

    List<Map<String, String>> orderList(@Param("userInfoId") String userInfoId);

    /**
     * 审核升级
     */
    void auditEscalation(@Param("upgradeId") String upgradeId, @Param("upgradeStatus")String upgradeStatus,@Param("userinfoId")String userinfoId);

    /**
     * 历史通过订单
     * @param userInfoId
     * @return
     */
    List<Map<String,String>> historicalOrder(@Param("userInfoId")String userInfoId);

    /**
     * 查询用户未审核和审核失败的记录数
     * @param userInfoId
     * @return
     */
    int selectCount(@Param("userInfoId")Integer userInfoId);

    /**
     * 审核统计
     * @return
     */
    List<Object> auditorTotal(@Param("page") Page page, @Param("userInfoId")Integer userInfoId);
}
