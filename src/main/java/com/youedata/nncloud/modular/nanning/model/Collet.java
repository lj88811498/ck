package com.youedata.nncloud.modular.nanning.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.enums.IdType;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import java.io.Serializable;

/**
 * <p>
 * 收藏
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
public class Collet extends Model<Collet> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "collet_id", type = IdType.AUTO)
    private Integer colletId;
    /**
     * 用户id
     */
    private Integer colletUserId;
    /**
     * 问题id
     */
    private Integer colletQuestionId;


    public Integer getColletId() {
        return colletId;
    }

    public void setColletId(Integer colletId) {
        this.colletId = colletId;
    }

    public Integer getColletUserId() {
        return colletUserId;
    }

    public void setColletUserId(Integer colletUserId) {
        this.colletUserId = colletUserId;
    }

    public Integer getColletQuestionId() {
        return colletQuestionId;
    }

    public void setColletQuestionId(Integer colletQuestionId) {
        this.colletQuestionId = colletQuestionId;
    }

    @Override
    protected Serializable pkVal() {
        return this.colletId;
    }

    @Override
    public String toString() {
        return "Collet{" +
        "colletId=" + colletId +
        ", colletUserId=" + colletUserId +
        ", colletQuestionId=" + colletQuestionId +
        "}";
    }
}
