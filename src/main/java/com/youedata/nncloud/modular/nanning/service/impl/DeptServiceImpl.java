package com.youedata.nncloud.modular.nanning.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.Dept;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IDeptService;


/**
 * 部门信息Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class DeptServiceImpl extends ServiceImpl<BaseMapper<Dept>,Dept> implements IDeptService {
}
