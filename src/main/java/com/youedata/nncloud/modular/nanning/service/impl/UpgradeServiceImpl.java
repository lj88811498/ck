package com.youedata.nncloud.modular.nanning.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.youedata.nncloud.core.common.constant.factory.PageFactory;
import com.youedata.nncloud.core.util.RecordLogUtil;
import com.youedata.nncloud.modular.nanning.dao.UpgradeMapper;
import com.youedata.nncloud.modular.nanning.dao.UserInfoMapper;
import com.youedata.nncloud.modular.nanning.model.UserInfo;
import com.youedata.nncloud.modular.nanning.model.UserMini;
import com.youedata.nncloud.modular.nanning.service.IUserInfoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.Upgrade;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IUpgradeService;


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
        map.put("upgrade_status", "0");
        //Integer integer = upgradeMapper.selectCount(new EntityWrapper<Upgrade>().eq("upgrade_userinfo_id", userInfoId).eq("upgrade_status", "0"));
        List list = upgradeMapper.selectByMap(map);
        if (list.size() > 0) {
            throw new Exception("用户还有未审核的申请！");
        } else{


//            Upgrade upgrade = new Upgrade();
//            upgrade.setUpgradeStatus("3");
//            EntityWrapper<Upgrade> entityWrapper = new EntityWrapper();
//            entityWrapper.eq("upgrade_userinfo_id", userInfoId);
//            upgradeMapper.update(upgrade, entityWrapper);

            String userinfoLv = userInfo.getUserinfoLv();
            if ("1".equals(userinfoLv) || "4".equals(userinfoLv)) {
                String userInfoCode = userInfo.getUserinfoCode();
//                Map map1 = new HashMap<>();
//                map1.put("userInfo_org", userInfoCode);
//                map1.put("userInfo_lv", userinfoLv);
//                List underLines = userInfoMapper.selectByMap(map1);
                Integer count = userInfoMapper.selectCount(new EntityWrapper<UserInfo>().eq("userInfo_org", userInfoCode).gt("userInfo_lv", 0));
                if (count < Math.pow(3, Double.parseDouble(userinfoLv))) {
                    throw new Exception("如需升级到" + (Integer.parseInt(userinfoLv) + 1) + "星会员，<br/>" +
                          "要直推一星及以上的" + ((int)Math.pow(3, Double.parseDouble(userinfoLv))) + "个会员！");
                }
            }

        }

        JSONObject merchants = userInfoService.getMerchants(userInfoId);
        if (merchants != null) {
            List<UserMini> users = (List) merchants.get("page");
            Long uuid = System.currentTimeMillis();
            for (UserMini user : users) {
                if (user == null) {
                    continue;
                }
                Upgrade upgrade = new Upgrade();
                upgrade.setUpgradeLeaderId(user.getUserinfoId());
                upgrade.setUpgradeUserinfoId(userInfoId);
                upgrade.setUpgradeCode(uuid + "");
                upgrade.insert();
            }
            if (users.size() > 0) {
                //删除0-1， 4-5出现审核不通过的订单
                Map map1 = new HashMap<>();
                map1.put("upgrade_userinfo_id", userInfoId);
                map1.put("upgrade_status", "2");
                //Integer integer = upgradeMapper.selectCount(new EntityWrapper<Upgrade>().eq("upgrade_userinfo_id", userInfoId).eq("upgrade_status", "0"));
                List<Upgrade> list1 = upgradeMapper.selectByMap(map1);
                for (Upgrade upgrade : list1) {
                    if (StringUtils.isBlank(upgrade.getUpgradeCode())) {
                        continue;
                    }
                    Map m2 = new HashMap();
                    m2.put("upgrade_code", upgrade.getUpgradeCode());
                    upgradeMapper.deleteByMap(m2);
                }

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
        upgradeMapper.auditEscalation(upgradeId, upgradeStatus, userinfoId);
//        查询是否还有未通过的订单
//        Integer count = upgradeMapper.selectCount(new EntityWrapper<Upgrade>().eq("upgrade_userinfo_id", userinfoId).eq("upgrade_status", "0").or().eq("upgrade_status", "2"));
        int count = upgradeMapper.selectCount(upgrade.getUpgradeUserinfoId());
        RecordLogUtil.info(" 查询用户" + userinfoId + "还有未通过的订单:" + count);
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

    @Override
    public Page<Upgrade> auditorTotal(int userInfoId, int pageSize, int curPage) {
        Page page = new PageFactory().defaultPage2(pageSize, curPage);

        return page;
    }
}
