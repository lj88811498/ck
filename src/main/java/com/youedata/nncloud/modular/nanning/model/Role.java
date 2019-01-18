package com.youedata.nncloud.modular.nanning.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import java.io.Serializable;

/**
 * <p>
 * 角色信息
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
public class Role extends Model<Role> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "role_id", type = IdType.AUTO)
    private Integer roleId;
    /**
     * 部门id
     */
    private Integer roleDeptId;
    /**
     * 角色名
     */
    private String roleName;
    /**
     * 类型
     */
    private String roleType;
    /**
     * 状态
     */
    private String roleStatus;
    /**
     * 创建人
     */
    private Integer roleCreateBy;
    /**
     * 修改人
     */
    private Integer roleUpdateBy;
    /**
     * 修改时间
     */
    private Date roleUpdateTime;
    /**
     * 创建时间
     */
    private Date roleCreateTime;


    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getRoleDeptId() {
        return roleDeptId;
    }

    public void setRoleDeptId(Integer roleDeptId) {
        this.roleDeptId = roleDeptId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public String getRoleStatus() {
        return roleStatus;
    }

    public void setRoleStatus(String roleStatus) {
        this.roleStatus = roleStatus;
    }

    public Integer getRoleCreateBy() {
        return roleCreateBy;
    }

    public void setRoleCreateBy(Integer roleCreateBy) {
        this.roleCreateBy = roleCreateBy;
    }

    public Integer getRoleUpdateBy() {
        return roleUpdateBy;
    }

    public void setRoleUpdateBy(Integer roleUpdateBy) {
        this.roleUpdateBy = roleUpdateBy;
    }

    public Date getRoleUpdateTime() {
        return roleUpdateTime;
    }

    public void setRoleUpdateTime(Date roleUpdateTime) {
        this.roleUpdateTime = roleUpdateTime;
    }

    public Date getRoleCreateTime() {
        return roleCreateTime;
    }

    public void setRoleCreateTime(Date roleCreateTime) {
        this.roleCreateTime = roleCreateTime;
    }

    @Override
    protected Serializable pkVal() {
        return this.roleId;
    }

    @Override
    public String toString() {
        return "Role{" +
        "roleId=" + roleId +
        ", roleDeptId=" + roleDeptId +
        ", roleName=" + roleName +
        ", roleType=" + roleType +
        ", roleStatus=" + roleStatus +
        ", roleCreateBy=" + roleCreateBy +
        ", roleUpdateBy=" + roleUpdateBy +
        ", roleUpdateTime=" + roleUpdateTime +
        ", roleCreateTime=" + roleCreateTime +
        "}";
    }
}
