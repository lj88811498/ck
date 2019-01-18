package com.youedata.nncloud.modular.nanning.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 * 问题反馈
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
public class Question extends Model<Question> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "question_id", type = IdType.AUTO)
    private Integer questionId;
    /**
     * 父类id（相当于留言）
     */
    private Integer questionPid;
    /**
     * 问题编号
     */
    private String questionCode;
    /**
     * 用户id
     */
    private Integer questionUserId;
    /**
     * 用户名
     */
    private String questionUserName;
    /**
     * 科室id
     */
    private Integer questionOfficeId;
    /**
     * 科室名
     */
    private String questionOfficeName;
    /**
     * 问题标题
     */
    private String questionTitle;
    /**
     * 内容
     */
    private String questionContent;
    /**
     * 类型:1咨询,2投诉,3建议
     */
    @ApiModelProperty("类型:1咨询,2投诉,3建议")
    private String questionType;
    /**
     * 隐私设置:1公开该问题,2仅自己可见
     */
    @ApiModelProperty("隐私设置:1公开该问题,2仅自己可见")
    private String questionPrivilege;
    /**
     * 状态:0关闭反馈，1打开反馈 2转交相关部门。。。（具体得分析）
     */
    private String questionStatus;
    /**
     * 进度：0待审核,1等待受理，2已受理，3已转交相关部门，4等待用户确认,5等待用户评价,6已评价,7已关闭
     */

    private String questionProgress;
    /**
     * 消息收藏状态（0.未收藏；1.已收藏）
     */
    private String questionCollet;
    /**
     * 创建人
     */
    private Integer questionCreateBy;
    /**
     * 修改人
     */
    private Integer questionUpdateBy;
    /**
     * 修改时间
     */
    private Date questionUpdateTime;
    /**
     * 创建时间
     */
    private Date questionCreateTime;

    private String questionErrorMsg;

    /**
     * 浏览量
     * @author: Monkey
     * @param:
     * @date: Created in  2018/9/17 16:14.
     * @return
     */
    private Integer questionView;

    /**
     * 问题子集
     */
    private List<Question> childList;
    /**
     * 问题附件
     */
    private List<Attachment> attachmentList;

    public String getQuestionErrorMsg() {
        return questionErrorMsg;
    }

    public void setQuestionErrorMsg(String questionErrorMsg) {
        this.questionErrorMsg = questionErrorMsg;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public Integer getQuestionPid() {
        return questionPid;
    }

    public void setQuestionPid(Integer questionPid) {
        this.questionPid = questionPid;
    }

    public String getQuestionCode() {
        return questionCode;
    }

    public void setQuestionCode(String questionCode) {
        this.questionCode = questionCode;
    }

    public Integer getQuestionUserId() {
        return questionUserId;
    }

    public void setQuestionUserId(Integer questionUserId) {
        this.questionUserId = questionUserId;
    }

    public String getQuestionUserName() {
        return questionUserName;
    }

    public void setQuestionUserName(String questionUserName) {
        this.questionUserName = questionUserName;
    }

    public Integer getQuestionOfficeId() {
        return questionOfficeId;
    }

    public void setQuestionOfficeId(Integer questionOfficeId) {
        this.questionOfficeId = questionOfficeId;
    }

    public String getQuestionOfficeName() {
        return questionOfficeName;
    }

    public void setQuestionOfficeName(String questionOfficeName) {
        this.questionOfficeName = questionOfficeName;
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public String getQuestionContent() {
        return questionContent;
    }

    public void setQuestionContent(String questionContent) {
        this.questionContent = questionContent;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getQuestionPrivilege() {
        return questionPrivilege;
    }

    public void setQuestionPrivilege(String questionPrivilege) {
        this.questionPrivilege = questionPrivilege;
    }

    public String getQuestionStatus() {
        return questionStatus;
    }

    public void setQuestionStatus(String questionStatus) {
        this.questionStatus = questionStatus;
    }

    public String getQuestionProgress() {
        return questionProgress;
    }

    public void setQuestionProgress(String questionProgress) {
        this.questionProgress = questionProgress;
    }

    public String getQuestionCollet() {
        return questionCollet;
    }

    public void setQuestionCollet(String questionCollet) {
        this.questionCollet = questionCollet;
    }

    public Integer getQuestionCreateBy() {
        return questionCreateBy;
    }

    public void setQuestionCreateBy(Integer questionCreateBy) {
        this.questionCreateBy = questionCreateBy;
    }

    public Integer getQuestionUpdateBy() {
        return questionUpdateBy;
    }

    public void setQuestionUpdateBy(Integer questionUpdateBy) {
        this.questionUpdateBy = questionUpdateBy;
    }

    public Date getQuestionUpdateTime() {
        return questionUpdateTime;
    }

    public void setQuestionUpdateTime(Date questionUpdateTime) {
        this.questionUpdateTime = questionUpdateTime;
    }

    public Date getQuestionCreateTime() {
        return questionCreateTime;
    }

    public void setQuestionCreateTime(Date questionCreateTime) {
        this.questionCreateTime = questionCreateTime;
    }

    public List<Question> getChildList() {
        return childList;
    }

    public void setChildList(List<Question> childList) {
        this.childList = childList;
    }

    public List<Attachment> getAttachmentList() {
        return attachmentList;
    }

    public void setAttachmentList(List<Attachment> attachmentList) {
        this.attachmentList = attachmentList;
    }

    public Integer getQuestionView() {
        return questionView;
    }

    public void setQuestionView(Integer questionView) {
        this.questionView = questionView;
    }

    public Question(int questionPid, int questionUserId, String questionUserName, String questionContent){
        this.questionPid = questionPid;
        this.questionUserId = questionUserId;
        this.questionUserName = questionUserName;
        this.questionContent = questionContent;
    }

    public Question(){

    }
    @Override
    protected Serializable pkVal() {
        return this.questionId;
    }

    @Override
    public String toString() {
        return "Question{" +
                "questionId=" + questionId +
                ", questionPid=" + questionPid +
                ", questionCode=" + questionCode +
                ", questionUserId=" + questionUserId +
                ", questionUserName=" + questionUserName +
                ", questionOfficeId=" + questionOfficeId +
                ", questionOfficeName=" + questionOfficeName +
                ", questionTitle=" + questionTitle +
                ", questionContent=" + questionContent +
                ", questionType=" + questionType +
                ", questionPrivilege=" + questionPrivilege +
                ", questionStatus=" + questionStatus +
                ", questionCollet=" + questionCollet +
                ", questionProgress=" + questionProgress +
                ", questionCreateBy=" + questionCreateBy +
                ", questionUpdateBy=" + questionUpdateBy +
                ", questionUpdateTime=" + questionUpdateTime +
                ", questionCreateTime=" + questionCreateTime +
                ", questionView=" + questionView +
                "}";
    }
}
