package com.youedata.nncloud.modular.nanning.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import io.swagger.annotations.ApiModel;

import java.io.Serializable;

/**
 * <p>
 * 满意度
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
@ApiModel
public class Degree extends Model<Degree> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "degree_id", type = IdType.AUTO)
    private Integer degreeId;
    /**
     * 问题id
     */
    private Integer degreeQuestionId;

    /**
     * @author: Monkey
     * @param:
     * @date: Created in  2018/9/14 10:22.
     * @return
     */
    private Integer degreeUserId;

    /**
     * 整体满意度
     */
    private String degreeMain;
    /**
     * 客服回复满意度
     */
    private String degreeAnswer;
    /**
     * 客服工作态度满意度
     */
    private String degreeWork;
    /**
     * 委办局满意度
     */
    private String degreeOffice;
    /**
     * 创建人
     */
    private Integer degreeCreateBy;
    /**
     * 修改人
     */
    private Integer degreeUpdateBy;
    /**
     * 修改时间
     */
    private Date degreeUpdateTime;
    /**
     * 创建时间
     */
    private Date degreeCreateTime;

    public Integer getDegreeUserId() {
        return degreeUserId;
    }

    public void setDegreeUserId(Integer degreeUserId) {
        this.degreeUserId = degreeUserId;
    }

    public Integer getDegreeId() {
        return degreeId;
    }

    public void setDegreeId(Integer degreeId) {
        this.degreeId = degreeId;
    }

    public Integer getDegreeQuestionId() {
        return degreeQuestionId;
    }

    public void setDegreeQuestionId(Integer degreeQuestionId) {
        this.degreeQuestionId = degreeQuestionId;
    }

    public String getDegreeMain() {
        return degreeMain;
    }

    public void setDegreeMain(String degreeMain) {
        this.degreeMain = degreeMain;
    }

    public String getDegreeAnswer() {
        return degreeAnswer;
    }

    public void setDegreeAnswer(String degreeAnswer) {
        this.degreeAnswer = degreeAnswer;
    }

    public String getDegreeWork() {
        return degreeWork;
    }

    public void setDegreeWork(String degreeWork) {
        this.degreeWork = degreeWork;
    }

    public String getDegreeOffice() {
        return degreeOffice;
    }

    public void setDegreeOffice(String degreeOffice) {
        this.degreeOffice = degreeOffice;
    }

    public Integer getDegreeCreateBy() {
        return degreeCreateBy;
    }

    public void setDegreeCreateBy(Integer degreeCreateBy) {
        this.degreeCreateBy = degreeCreateBy;
    }

    public Integer getDegreeUpdateBy() {
        return degreeUpdateBy;
    }

    public void setDegreeUpdateBy(Integer degreeUpdateBy) {
        this.degreeUpdateBy = degreeUpdateBy;
    }

    public Date getDegreeUpdateTime() {
        return degreeUpdateTime;
    }

    public void setDegreeUpdateTime(Date degreeUpdateTime) {
        this.degreeUpdateTime = degreeUpdateTime;
    }

    public Date getDegreeCreateTime() {
        return degreeCreateTime;
    }

    public void setDegreeCreateTime(Date degreeCreateTime) {
        this.degreeCreateTime = degreeCreateTime;
    }

    @Override
    protected Serializable pkVal() {
        return this.degreeId;
    }

    public Degree(){

    }

    public Degree(int degreeQuestionId, int degreeUserId, String degreeMain,
                  String degreeAnswer, String degreeWork, String degreeOffice){
        this.degreeQuestionId = degreeQuestionId;
        this.degreeUserId = degreeUserId;
        this.degreeMain = degreeMain;
        this.degreeAnswer = degreeAnswer;
        this.degreeWork = degreeWork;
        this.degreeOffice = degreeOffice;
    }

    @Override
    public String toString() {
        return "Degree{" +
        "degreeId=" + degreeId +
        ",degreeUserId=" + degreeUserId +
        ", degreeQuestionId=" + degreeQuestionId +
        ", degreeMain=" + degreeMain +
        ", degreeAnswer=" + degreeAnswer +
        ", degreeWork=" + degreeWork +
        ", degreeOffice=" + degreeOffice +
        ", degreeCreateBy=" + degreeCreateBy +
        ", degreeUpdateBy=" + degreeUpdateBy +
        ", degreeUpdateTime=" + degreeUpdateTime +
        ", degreeCreateTime=" + degreeCreateTime +
        "}";
    }
}
