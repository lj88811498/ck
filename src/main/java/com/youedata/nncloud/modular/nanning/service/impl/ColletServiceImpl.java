package com.youedata.nncloud.modular.nanning.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.youedata.nncloud.modular.nanning.dao.ColletMapper;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.Collet;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IColletService;

import javax.annotation.Resource;


/**
 * 收藏Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class ColletServiceImpl extends ServiceImpl<BaseMapper<Collet>,Collet> implements IColletService {

    @Resource
    private ColletMapper colletMapper;
    /**
     * 根据问题Id查询收藏
     * @param questionId
     * @return
     */
    @Override
    public Collet getByQuestionId(Integer questionId) {
        return colletMapper.getByQuestionId(questionId);
    }

    @Override
    public void deleteByQuestionId(Integer questionId) {
        colletMapper.deleteByQuestionId(questionId);
    }
}
