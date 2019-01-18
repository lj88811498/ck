package com.youedata.nncloud.modular.nanning.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.youedata.nncloud.modular.nanning.dao.OfficeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.Office;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IOfficeService;


/**
 * 科室Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class OfficeServiceImpl extends ServiceImpl<BaseMapper<Office>,Office> implements IOfficeService {
    @Autowired
    private OfficeMapper officeMapper;
    @Override
    public Integer selectOfficeByName(String officeName) {
        return officeMapper.selectOfficeByName(officeName);
    }
}
