package com.youedata.nncloud.modular.nanning.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.youedata.nncloud.modular.nanning.dao.UpgradeMapper;
import com.youedata.nncloud.modular.nanning.dao.UserInfoMapper;
import com.youedata.nncloud.modular.nanning.model.UserInfo;
import com.youedata.nncloud.modular.nanning.model.UserMini;
import com.youedata.nncloud.modular.nanning.service.IUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.Upgrade;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IUpgradeService;
import sun.security.util.Length;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 升级表Service
 *
 * @author Monkey
 * @Date 2019-01-21 20:53:59
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class UpgradeServiceImpl extends ServiceImpl<BaseMapper<Upgrade>, Upgrade> implements IUpgradeService {

    @Autowired
    private IUserInfoService userInfoService;

    @Autowired
    private UserInfoMapper userInfoMapper;

    @Autowired
    private UpgradeMapper upgradeMapper;

    /**
     * 添加用户升级信息
     *
     * @param userInfoId
     * @return
     */
    @Override
    public boolean add(int userInfoId) throws Exception {
        UserInfo userInfo = userInfoMapper.selectById(userInfoId);
        if (userInfo == null) {
            throw new Exception("不存在此用户！");
        }
        Map map = new HashMap<>();
        map.put("upgrade_userinfo_id", userInfoId);
        List list = upgradeMapper.selectByMap(map);
        if (list.size() > 0) {
            throw new Exception("用户还有未审核的申请！");
        }

        JSONObject merchants = userInfoService.getMerchants(userInfoId);
        if (merchants != null) {
            List<UserMini> users = (List) merchants.get("page");
            for (UserMini user : users) {
                if (user == null) {
                    continue;
                }
                Upgrade upgrade = new Upgrade();
                upgrade.setUpgradeLeaderId(user.getUserinfoId());
                upgrade.setUpgradeUserinfoId(userInfoId);
                upgrade.insert();
            }
        }
        return true;
    }

    /**
     * 审核升级-订单列表
     *
     * @param userInfoId
     * @return
     */
    @Override
    public List<Map<String, String>> orderList(String userInfoId) {
        return upgradeMapper.orderList(userInfoId);
    }

    /**
     * 审核升级
     */
    public void auditEscalation(String upgradeId, String upgradeStatus, String userinfoId) {
//        修改当前订单状态
        Upgrade upgrade = selectById(upgradeId);
        upgradeMapper.auditEscalation(upgradeId, upgradeStatus,userinfoId);
//        查询是否还有未通过的订单
        Integer count = upgradeMapper.selectCount(new EntityWrapper<Upgrade>().eq("upgrade_status", "0"));
        if (count == 0) {
            UserInfo userInfo = userInfoMapper.selectById(upgrade.getUpgradeUserinfoId());
            Integer lv = Integer.valueOf(userInfo.getUserinfoLv())+1;
            userInfo.setUserinfoLv(lv+"");
            if(lv == 1){
                String num = (Integer.valueOf(userInfoMapper.selectNextCode().substring(2))+1)+"";
                int len = num.length();
                for (int i = 0; i < 5-len ; i++) {
                    num = "0"+num;
                }
                userInfo.setUserinfoCode("ck"+num);
            }
            userInfo.updateById();
        }
    }


    /**
     * 历史通过订单
     */
    @Override
    public List<Map<String, String>> historicalOrder(String userInfoId) {
        return upgradeMapper.historicalOrder(userInfoId);
    }
}
