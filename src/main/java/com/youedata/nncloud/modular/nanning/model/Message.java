package com.youedata.nncloud.modular.nanning.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import java.io.Serializable;

/**
 * <p>
 * 消息通知
 * </p>
 *
 * @author Monkey
 * @since 2018-09-13
 */
public class Message extends Model<Message> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "message_id", type = IdType.AUTO)
    private Integer messageId;
    /**
     * 问题id
     */
    private Integer messageQuestionId;
    /**
     * 用户id
     */
    private Integer messageUserId;
    /**
     * 消息内容
     */
    private String messageContent;
    /**
     * 创建时间
     */
    private Date messageCreateTime;


    public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    public Integer getMessageQuestionId() {
        return messageQuestionId;
    }

    public void setMessageQuestionId(Integer messageQuestionId) {
        this.messageQuestionId = messageQuestionId;
    }

    public Integer getMessageUserId() {
        return messageUserId;
    }

    public void setMessageUserId(Integer messageUserId) {
        this.messageUserId = messageUserId;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public Date getMessageCreateTime() {
        return messageCreateTime;
    }

    public void setMessageCreateTime(Date messageCreateTime) {
        this.messageCreateTime = messageCreateTime;
    }

    @Override
    protected Serializable pkVal() {
        return this.messageId;
    }

    @Override
    public String toString() {
        return "Message{" +
        "messageId=" + messageId +
        ", messageQuestionId=" + messageQuestionId +
        ", messageUserId=" + messageUserId +
        ", messageContent=" + messageContent +
        ", messageCreateTime=" + messageCreateTime +
        "}";
    }
}
