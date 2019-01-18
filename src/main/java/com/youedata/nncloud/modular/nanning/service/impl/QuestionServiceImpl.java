package com.youedata.nncloud.modular.nanning.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.youedata.nncloud.config.properties.GunsProperties;
import com.youedata.nncloud.core.common.constant.factory.PageFactory;
import com.youedata.nncloud.core.common.constant.state.QuestionAutoAnswer;
import com.youedata.nncloud.core.common.constant.state.QuestionProgress;
import com.youedata.nncloud.core.constant.Constant;
import com.youedata.nncloud.core.util.DateUtil;
import com.youedata.nncloud.core.util.UploadUtil;
import com.youedata.nncloud.modular.nanning.dao.*;
import com.youedata.nncloud.modular.nanning.model.vo.QuestionVo;
import com.youedata.nncloud.modular.nanning.model.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IQuestionService;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;


/**
 * 问题反馈Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class QuestionServiceImpl extends ServiceImpl<BaseMapper<Question>,Question> implements IQuestionService {

    @Resource
    @Autowired
    private GunsProperties gunsProperties;

    @Autowired
    private QuestionMapper questionMapper;

    @Autowired
    private AttachmentMapper attachmentMapper;

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private UserInfoMapper userInfoMapper;

    @Autowired
    private OfficeMapper officeMapper;
    /**
     * 添加留言
     *
     * @param file
     * @param questionId
     * @param questionUserId
     * @param questionUserName
     * @param questionContent
     * @Author: Monkey
     * @Param: [file, questionId, questionUserId, questionUserName, questionContent]
     * @Date: Created in  2018/9/12 14:23.
     * @Returns void
     */
    @Override
    public void addQuestionBoard(@Param("file") MultipartFile[] file,
                                 @Param("questionId") int questionId,
                                 @Param("questionUserId") int questionUserId,
                                 @Param("questionUserName") String questionUserName,
                                 @Param("questionContent") String questionContent) throws IOException {

        Question question = new Question(questionId, questionUserId, questionUserName, questionContent);
        questionMapper.addQuestionBoard(question);
        int t_questionId = question.getQuestionId();

        if (file != null) {
            String serverPath = gunsProperties.getFileUploadPath();
            String folderPath =  File.separator + DateUtil.getDays() + File.separator;
            for (int i = 0; i < file.length; i ++) {
                MultipartFile temp = file[i];
                if (temp != null) {
                    String picName = temp.getOriginalFilename();
                    String suffix = picName.substring(picName.lastIndexOf("."));
                    String tempName = System.currentTimeMillis() + suffix;
                    UploadUtil.uploadFile(temp, serverPath + folderPath, tempName);

                    Attachment attachment = new Attachment();
                    attachment.setAttachmentName(picName);
                    attachment.setAttachmentUrl(folderPath + tempName);
                    attachment.setAttachmentQuestionId(t_questionId);
                    attachmentMapper.insert(attachment);
                }
            }
        }
    }

    /**
     * 反馈问题列报表
     * @param orderByField
     * @param isAsc
     * @param size
     * @param curPage
     * @return
     */
    @Override
    public Page getListByUserId(int userId, String orderByField, boolean isAsc, int size, int curPage) {
        Page page =  new PageFactory<Map<String, String>>().defaultPage2(size, curPage);
        List<Question> result = questionMapper.getListByUserId(userId,page,orderByField,isAsc);
        page.setRecords(result);
        return page;
    }

    /**
     * 反馈问题列报表
     * @param orderByField
     * @param isAsc
     * @param size
     * @param curPage
     * @return
     */
    @Override
    public Page getListByProgress(String progress, String orderByField, boolean isAsc, int size, int curPage) {
        Page page =  new PageFactory<Map<String, String>>().defaultPage2(size, curPage);
        List progressList = new ArrayList();
        if(progress.equals("0")){//待处理
            progressList.add("0");
            progressList.add("1");
        }
        if(progress.equals("1")){//处理中
            progressList.add("2");
            progressList.add("3");
            progressList.add("4");
            progressList.add("5");
        }
        if(progress.equals("2")){//已处理
            progressList.add("6");
            progressList.add("7");
            progressList.add("8");
            progressList.add("9");
        }
        List<Question> result = questionMapper.getListByProgress(page,orderByField,isAsc, progressList);
        page.setRecords(result);
        return page;
    }

    /**
     * 问题详情
     * @param questionId
     * @return
     */
    @Override
    public Page getById(Integer questionId) {
        Page page =  new Page();
        //留言
        Question question = questionMapper.getById(questionId);
        List<Attachment> attachments = attachmentMapper.getByQuestionId(questionId);
        question.setAttachmentList(attachments);
        //回复
        List<Question> questionsChild = questionMapper.getChildByPid(question.getQuestionId());
        for(int i = 0 ; i < questionsChild.size() ; i++){
            List<Attachment> attachmentsChild = attachmentMapper.getByQuestionId(questionId);
            questionsChild.get(i).setAttachmentList(attachmentsChild);
        }
        question.setChildList(questionsChild);

//        结果集封装为list
        List<Question> resultList = new ArrayList<>();
        resultList.add(question);
        page.setRecords(resultList);
        return page;

    }

    /**
     * 审核、受理、转交、自行答复等通用接口
     *
     * @param questionId
     * @param questionProgress
     * @param questionErrorMsg
     * @return
     */
    @Override
    public boolean update(int questionId, int answerQuestionUserId, int questionOfficeId, String questionProgress, String questionErrorMsg) throws Exception {

        Question tempQuestion = questionMapper.selectById(questionId);
        String temp = tempQuestion.getQuestionProgress();
        boolean flag = false;
        //此处有多种情况
        //审核
        if (questionProgress.equals(Constant.PROGRESS_ONE)) {
            if (!temp.equals(Constant.PROGRESS_ZORE)) {
                flag = true;
            }
        }
        //受理
        else if (questionProgress.equals(Constant.PROGRESS_TWO)) {
            if (!temp.equals(Constant.PROGRESS_ONE)) {
                flag = true;
            }
        }
        //已转交相关部门 和 自行答复
        else if (questionProgress.equals(Constant.PROGRESS_THREE) || temp.equals(Constant.PROGRESS_FOUR)) {
            if (!(temp.equals(Constant.PROGRESS_TWO) || temp.equals(Constant.PROGRESS_THREE)
                    || temp.equals(Constant.PROGRESS_FOUR))) {
                flag = true;
            }
        }
        //等待用户确认
        else if (questionProgress.equals(Constant.PROGRESS_FIVE)) {
            if (!(temp.equals(Constant.PROGRESS_THREE) || temp.equals(Constant.PROGRESS_FOUR))) {
                flag = true;
            }
        }
        //等待用户评价
        else if (questionProgress.equals(Constant.PROGRESS_SIX)) {
            if (!(temp.equals(Constant.PROGRESS_FIVE))) {
                flag = true;
            }
        }
        //已评价
        else if (questionProgress.equals(Constant.PROGRESS_SEVEN)) {
            if (!(temp.equals(Constant.PROGRESS_SIX))) {
                flag = true;
            }
        }
        //审核未通过
        else if (questionProgress.equals(Constant.PROGRESS_NIGHT)) {
            if (!(temp.equals(Constant.PROGRESS_ZORE))) {
                flag = true;
            }
        }
        //总结状态来作出响应
        if (flag) {
            throw new Exception(Constant.PROGRESS_ERROR_MSG);
        } else {
            //入库
            addToDB(questionId, questionErrorMsg, questionProgress, answerQuestionUserId, tempQuestion.getQuestionUserId(), questionOfficeId);
        }

        return true;
    }

    /**
     * 添加入库
     * @param questionId
     * @param questionErrorMsg
     * @param questionProgress
     * @param questionUserId
     * @param questionOfficeId
     */
    private void addToDB(int questionId, String questionErrorMsg, String questionProgress, int answerQuestionUserId, int questionUserId, int questionOfficeId) {
        Office office = officeMapper.selectById(questionOfficeId);
        String officeName = null;
        if (office != null) {
            officeName = office.getOfficeName();
        }
        //更新状态
        Question question = new Question();
        question.setQuestionId(questionId);
        question.setQuestionOfficeId(questionOfficeId);
        question.setQuestionOfficeName(officeName);
        question.setQuestionErrorMsg(questionErrorMsg);
        question.setQuestionProgress(questionProgress);
        questionMapper.updateById(question);

        //新增回复
        String msg = QuestionAutoAnswer.getMsg(questionProgress);
        if (StringUtils.isNotBlank(msg)) {
            msg = msg.replaceAll(Matcher.quoteReplacement(Constant.SIGN_ERROR_MSG), questionErrorMsg);
            msg = msg.replaceAll(Matcher.quoteReplacement(Constant.SIGN_OFFICE), officeName);
            Question answerQuestion = new Question();
            answerQuestion.setQuestionPid(questionId);
            answerQuestion.setQuestionOfficeId(questionOfficeId);
            answerQuestion.setQuestionOfficeName(officeName);
            answerQuestion.setQuestionUserId(answerQuestionUserId);
            answerQuestion.setQuestionContent(msg);
            UserInfo userInfo = userInfoMapper.selectById(answerQuestionUserId);
            if (userInfo != null) {
                answerQuestion.setQuestionUserName(userInfo.getUserInfoName());
            }
            questionMapper.insert(answerQuestion);
        }

        //添加消息通知
        Message message = new Message();
        message.setMessageQuestionId(questionId);
        message.setMessageUserId(questionUserId);
        message.setMessageContent(QuestionProgress.getMsg(questionProgress));
        messageMapper.insert(message);
    }
    /**
     * 当月问题件数
     * @return
     */
    @Override
    public Integer getMonthCount(String date) {
        return questionMapper.getMonthCount(date);
    }

    /**
     * 当月问题解决件数
     * @return
     */
    @Override
    public Integer getMonthSolveCount(String date) {
        return questionMapper.getMonthSolveCount(date);
    }

    /**
     * 平均解决问题件数
     * @return
     */
    @Override
    public double getSolveDayAvg(String date) {
        return questionMapper.getSolveDayAvg(date);
    }

    /**
     * 解决问题委办局排名
     * @return
     */
    @Override
    public List<QuestionVo> getOfficeSort(String date) {
        return questionMapper.getOfficeSort(date);
    }
}
