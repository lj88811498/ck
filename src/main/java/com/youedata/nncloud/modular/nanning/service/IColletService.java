package com.youedata.nncloud.modular.nanning.service;
import com.baomidou.mybatisplus.service.IService;
import com.youedata.nncloud.modular.nanning.model.Collet;
import com.youedata.nncloud.modular.nanning.model.Question;

/**
 * 收藏Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
public interface IColletService extends IService<Collet>{

    /**
     * 根据问题Id查询收藏
     * @param questionId
     * @return
     */
    Collet getByQuestionId(Integer questionId);

    /**
     * 根据问题Id删除收藏
     * @param questionId
     */
    void deleteByQuestionId(Integer questionId);
}
