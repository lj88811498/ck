package com.youedata.nncloud.modular.nanning.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;

/**
 * <p>
 * 附件
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
public class Attachment extends Model<Attachment> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "attachment_id", type = IdType.AUTO)
    private Integer attachmentId;
    /**
     * 问题id
     */
    private Integer attachmentQuestionId;
    /**
     * 附件名称
     */
    private String attachmentName;
    /**
     * 附件地址
     */
    private String attachmentUrl;
    /**
     * 创建人
     */
    private Integer attachmentCreateBy;
    /**
     * 修改人
     */
    private Integer attachmentUpdateBy;
    /**
     * 修改时间
     */
    private String attachmentUpdateTime;
    /**
     * 创建时间
     */
    private String attachmentCreateTime;


    public Integer getAttachmentId() {
        return attachmentId;
    }

    public void setAttachmentId(Integer attachmentId) {
        this.attachmentId = attachmentId;
    }

    public Integer getAttachmentQuestionId() {
        return attachmentQuestionId;
    }

    public void setAttachmentQuestionId(Integer attachmentQuestionId) {
        this.attachmentQuestionId = attachmentQuestionId;
    }

    public String getAttachmentName() {
        return attachmentName;
    }

    public void setAttachmentName(String attachmentName) {
        this.attachmentName = attachmentName;
    }

    public String getAttachmentUrl() {
        return attachmentUrl;
    }

    public void setAttachmentUrl(String attachmentUrl) {
        this.attachmentUrl = attachmentUrl;
    }

    public Integer getAttachmentCreateBy() {
        return attachmentCreateBy;
    }

    public void setAttachmentCreateBy(Integer attachmentCreateBy) {
        this.attachmentCreateBy = attachmentCreateBy;
    }

    public Integer getAttachmentUpdateBy() {
        return attachmentUpdateBy;
    }

    public void setAttachmentUpdateBy(Integer attachmentUpdateBy) {
        this.attachmentUpdateBy = attachmentUpdateBy;
    }

    public String getAttachmentUpdateTime() {
        return attachmentUpdateTime;
    }

    public void setAttachmentUpdateTime(String attachmentUpdateTime) {
        this.attachmentUpdateTime = attachmentUpdateTime;
    }

    public String getAttachmentCreateTime() {
        return attachmentCreateTime;
    }

    public void setAttachmentCreateTime(String attachmentCreateTime) {
        this.attachmentCreateTime = attachmentCreateTime;
    }

    @Override
    protected Serializable pkVal() {
        return this.attachmentId;
    }

    @Override
    public String toString() {
        return "Attachment{" +
        "attachmentId=" + attachmentId +
        ", attachmentQuestionId=" + attachmentQuestionId +
        ", attachmentName=" + attachmentName +
        ", attachmentUrl=" + attachmentUrl +
        ", attachmentCreateBy=" + attachmentCreateBy +
        ", attachmentUpdateBy=" + attachmentUpdateBy +
        ", attachmentUpdateTime=" + attachmentUpdateTime +
        ", attachmentCreateTime=" + attachmentCreateTime +
        "}";
    }
}
