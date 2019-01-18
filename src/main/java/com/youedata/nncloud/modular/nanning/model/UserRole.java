package com.youedata.nncloud.modular.nanning.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.enums.IdType;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import java.io.Serializable;

/**
 * <p>
 * 用户角色
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
public class UserRole extends Model<UserRole> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "user_role_id", type = IdType.AUTO)
    private Integer userRoleId;
    /**
     * 角色id
     */
    private Integer userRoleRoleId;
    /**
     * 用户id
     */
    private Integer userRoleUserId;


    public Integer getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(Integer userRoleId) {
        this.userRoleId = userRoleId;
    }

    public Integer getUserRoleRoleId() {
        return userRoleRoleId;
    }

    public void setUserRoleRoleId(Integer userRoleRoleId) {
        this.userRoleRoleId = userRoleRoleId;
    }

    public Integer getUserRoleUserId() {
        return userRoleUserId;
    }

    public void setUserRoleUserId(Integer userRoleUserId) {
        this.userRoleUserId = userRoleUserId;
    }

    @Override
    protected Serializable pkVal() {
        return this.userRoleId;
    }

    @Override
    public String toString() {
        return "UserRole{" +
        "userRoleId=" + userRoleId +
        ", userRoleRoleId=" + userRoleRoleId +
        ", userRoleUserId=" + userRoleUserId +
        "}";
    }
}
