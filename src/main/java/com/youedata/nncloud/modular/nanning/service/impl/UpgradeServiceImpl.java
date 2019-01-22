package com.youedata.nncloud.modular.nanning.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.BaseMapper;
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
public class UpgradeServiceImpl extends ServiceImpl<BaseMapper<Upgrade>,Upgrade> implements IUpgradeService {

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
        if (list.size() > 0 ) {
            throw new Exception("用户还有未审核的申请！");
        }

        JSONObject merchants = userInfoService.getMerchants(userInfoId);
        if (merchants != null) {
            List<UserMini> users = (List)merchants.get("page");
            for (UserMini user : users) {
                Upgrade upgrade = new Upgrade();
                upgrade.setUpgradeLeaderId(user.getUserinfoId());
                upgrade.setUpgradeUserinfoId(userInfoId);
                upgrade.insert();
            }
        }
        return true;
    }
}
