package com.youedata.nncloud.modular.nanning.service;

import com.baomidou.mybatisplus.service.IService;
import com.youedata.nncloud.modular.nanning.model.Upgrade;

import java.util.List;
import java.util.Map;

/**
 * 升级表Service
 *
 * @author Monkey
 * @Date 2019-01-21 20:53:59
 */
public interface IUpgradeService extends IService<Upgrade> {

    /**
     * 添加用户升级信息
     *
     * @param userInfoId
     * @return
     */
    boolean add(int userInfoId) throws Exception;

    /**
     * 审核升级-订单列表
     *
     * @param userInfoId
     * @return
     */
    List<Map<String, String>> orderList(String userInfoId);

    /**
     * 审核升级
     */
    void auditEscalation(String upgradeId, String upgradeStatus, String userinfoId);

    /**
     * 历史通过订单
     */
    List<Map<String, String>> historicalOrder(String upgradeId);
}
