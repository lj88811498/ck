package com.youedata.nncloud.modular.nanning.dao;

import com.baomidou.mybatisplus.plugins.Page;
import com.youedata.nncloud.modular.nanning.model.vo.QuestionVo;
import com.youedata.nncloud.modular.nanning.model.Question;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <p>
 * 问题反馈 Mapper 接口
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
@Transactional
@Component
public interface QuestionMapper extends BaseMapper<Question> {

    /**
     * 添加留言
     * @Author: Monkey
     * @Param: [question]
     * @Date: Created in  2018/9/12 14:23.
     * @Returns void
     */
    void addQuestionBoard(Question question);

    /**
     * 返回问题列表-企业端
     * @param page
     * @param orderByField
     * @param isAsc
     * @return
     */
    List<Question> getListByUserId(@Param("userId") int userId,
                                   @Param("page") Page page,
                                   @Param("orderByField") String orderByField,
                                   @Param("isAsc") boolean isAsc);

    /**
     * 返回问题列表-政府端
     * @param page
     * @param orderByField
     * @param isAsc
     * @return
     */
    List<Question> getListByProgress(@Param("page") Page page,
                                     @Param("orderByField") String orderByField,
                                     @Param("isAsc") boolean isAsc,
                                     @Param("progressList") List progressList);

    /**
     * 问题详情
     * @param questionPid
     * @return
     */
    List<Question> getChildByPid(@Param("questionPid") Integer questionPid);

    /**
     * 问题详情
     * @param questionId
     * @return
     */
    Question getById(@Param("questionId") Integer questionId);

    /**
     * 查询问题的进度
     * @param questionId
     * @return
     */
    String selectQuestionProgress(@Param("questionId") int questionId);
    /**
     * 当月问题件数
     * @return
     */
    Integer getMonthCount(@Param("date")String date);

    /**
     * 当月问题解决件数
     * @return
     */
    Integer getMonthSolveCount(@Param("date")String date);

    /**
     * 问题解决平均天数
     * @return
     */
    double getSolveDayAvg(@Param("date")String date);

    /**
     * 委办局解决问题排名
     * @return
     */
    List<QuestionVo> getOfficeSort(@Param("date")String date);
}
