package com.youedata.nncloud.modular.nanning.dao;

import com.youedata.nncloud.modular.nanning.model.Degree;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 满意度 Mapper 接口
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
@Transactional
@Component
public interface DegreeMapper extends BaseMapper<Degree> {

    /**
     * 整体满意度
     * @return
     */
    double getMainAvg(@Param("date")String date);

    /**
     * 客服回复满意度
     * @return
     */
    double getAnswerAvg(@Param("date")String date);

    /**
     * 客服工作态度满意度
     * @return
     */
    double getWorkAvg(@Param("date")String date);
}
