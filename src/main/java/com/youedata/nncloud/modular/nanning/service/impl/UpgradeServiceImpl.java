package com.youedata.nncloud.modular.nanning.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.Upgrade;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IUpgradeService;


/**
 * 升级表Service
 *
 * @author Monkey
 * @Date 2019-01-21 20:53:59
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class UpgradeServiceImpl extends ServiceImpl<BaseMapper<Upgrade>,Upgrade> implements IUpgradeService {
}
