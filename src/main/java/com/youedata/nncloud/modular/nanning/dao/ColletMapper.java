package com.youedata.nncloud.modular.nanning.dao;

import com.youedata.nncloud.modular.nanning.model.Collet;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 收藏 Mapper 接口
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
@Transactional
@Component
public interface ColletMapper extends BaseMapper<Collet> {

    /**
     * 根据问题Id查询收藏
     * @param questionId
     * @return
     */
    Collet getByQuestionId(@Param("questionId") Integer questionId);

    /**
     * 根据问题Id删除收藏
     * @param questionId
     * @return
     */
    void deleteByQuestionId(@Param("questionId") Integer questionId);
}
