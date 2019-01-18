package com.youedata.nncloud.modular.nanning.model.vo;

public class QuestionVo {
    /**
     * 委办局id
     */
    private int officeId;
    /**
     * 委办局名称
     */
    private String officeName;
    /**
     * 问题数
     */
    private int questionCount;

    public int getOfficeId() {
        return officeId;
    }

    public void setOfficeId(int officeId) {
        this.officeId = officeId;
    }

    public String getOfficeName() {
        return officeName;
    }

    public void setOfficeName(String officeName) {
        this.officeName = officeName;
    }

    public int getQuestionCount() {
        return questionCount;
    }

    public void setQuestionCount(int questionCount) {
        this.questionCount = questionCount;
    }

    @Override
    public String toString() {
        return "QuestionVo{" +
                "officeId=" + officeId +
                ", officeName='" + officeName +
                ", questionCount='" + questionCount +
                '}';
    }
}
