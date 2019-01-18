package com.youedata.nncloud.modular.nanning.service;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.IService;
import com.youedata.nncloud.modular.nanning.model.vo.QuestionVo;
import com.youedata.nncloud.modular.nanning.model.Question;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


import java.util.List;

/**
 * 问题反馈Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
public interface IQuestionService extends IService<Question>{

    /**
     * 添加留言
     * @Author: Monkey
     * @Param: [questionId, questionUserId, questionUserName, questionContent]
     * @Date: Created in  2018/9/12 14:23.
     * @Returns void
     */
    void addQuestionBoard(@Param("file") MultipartFile[] file,
                          @Param("questionId") int questionId,
                          @Param("questionUserId") int questionUserId,
                          @Param("questionUserName") String questionUserName,
                          @Param("questionContent") String questionContent) throws IOException;

    /**
     * 反馈问题列表-企业端
     * @param orderByField
     * @param isAsc
     * @param size
     * @param curPage
     * @return
     */
    Page getListByUserId(int userId, String orderByField, boolean isAsc, int size, int curPage);

    /**
     * 反馈问题列表-政府端
     * @param orderByField
     * @param isAsc
     * @param size
     * @param curPage
     * @return
     */
    Page getListByProgress(String progress, String orderByField, boolean isAsc, int size, int curPage);

    /**
     * 问题详情
     * @param questionId
     * @return
     */
    Page getById(Integer questionId);

    /**
     * 审核、受理、转交、自行答复等通用接口
     * @param questionId
     * @param questionProgress
     * @param questionErrorMsg
     * @return
     */
    boolean update(int questionId, int answerQuestionUserId, int questionOfficeId, String questionProgress, String questionErrorMsg) throws Exception;
    /**
     * 当月问题件数
     * @return
     */
    Integer getMonthCount(String date);

    /**
     * 当月问题解决件数
     * @return
     */
    Integer getMonthSolveCount(String date);
    /**
     * 问题解决平均天数
     * @return
     */
    double getSolveDayAvg(String date);

    /**
     * 委办局解决问题排序
     * @return
     */
    List<QuestionVo> getOfficeSort(String date);

}
