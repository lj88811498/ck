package com.youedata.nncloud.modular.nanning.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.youedata.nncloud.modular.nanning.dao.DegreeMapper;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.Degree;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IDegreeService;

import javax.annotation.Resource;
import java.math.BigDecimal;


/**
 * 满意度Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class DegreeServiceImpl extends ServiceImpl<BaseMapper<Degree>,Degree> implements IDegreeService {
    @Resource
    private DegreeMapper degreeMapper;

    /**
     * 整体满意度
     * @return
     */
    @Override
    public int getMainAvg(String date) {
        double doubleDate = degreeMapper.getMainAvg(date);
        BigDecimal a1 = new BigDecimal(Double.toString(doubleDate));
        BigDecimal b1 = new BigDecimal(Double.toString(100));
        BigDecimal result = a1.multiply(b1);
        return result.intValue();
    }

    /**
     * 客服回复满意度
     * @return
     */
    @Override
    public int getAnswerAvg(String date) {
        double doubleDate = degreeMapper.getAnswerAvg(date);
        BigDecimal a1 = new BigDecimal(Double.toString(doubleDate));
        BigDecimal b1 = new BigDecimal(Double.toString(100));
        BigDecimal result = a1.multiply(b1);
        return result.intValue();
    }

    /**
     * 客服工作态度满意度
     * @return
     */
    @Override
    public int getWorkAvg(String date) {
        double doubleDate = degreeMapper.getWorkAvg(date);
        BigDecimal a1 = new BigDecimal(Double.toString(doubleDate));
        BigDecimal b1 = new BigDecimal(Double.toString(100));
        BigDecimal result = a1.multiply(b1);
        return result.intValue();
    }
}
