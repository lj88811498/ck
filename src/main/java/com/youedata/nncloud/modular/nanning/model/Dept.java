package com.youedata.nncloud.modular.nanning.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import java.io.Serializable;

/**
 * <p>
 * 部门信息
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
public class Dept extends Model<Dept> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "dept_id", type = IdType.AUTO)
    private Integer deptId;
    /**
     * 部门名
     */
    private String deptName;
    /**
     * 类型：1企业，2政府
     */
    private String deptType;
    /**
     * 状态
     */
    private String deptStatus;
    /**
     * 创建人
     */
    private Integer deptCreateBy;
    /**
     * 修改人
     */
    private Integer deptUpdateBy;
    /**
     * 修改时间
     */
    private Date deptUpdateTime;
    /**
     * 创建时间
     */
    private Date deptCreateTime;


    public Integer getDeptId() {
        return deptId;
    }

    public void setDeptId(Integer deptId) {
        this.deptId = deptId;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getDeptType() {
        return deptType;
    }

    public void setDeptType(String deptType) {
        this.deptType = deptType;
    }

    public String getDeptStatus() {
        return deptStatus;
    }

    public void setDeptStatus(String deptStatus) {
        this.deptStatus = deptStatus;
    }

    public Integer getDeptCreateBy() {
        return deptCreateBy;
    }

    public void setDeptCreateBy(Integer deptCreateBy) {
        this.deptCreateBy = deptCreateBy;
    }

    public Integer getDeptUpdateBy() {
        return deptUpdateBy;
    }

    public void setDeptUpdateBy(Integer deptUpdateBy) {
        this.deptUpdateBy = deptUpdateBy;
    }

    public Date getDeptUpdateTime() {
        return deptUpdateTime;
    }

    public void setDeptUpdateTime(Date deptUpdateTime) {
        this.deptUpdateTime = deptUpdateTime;
    }

    public Date getDeptCreateTime() {
        return deptCreateTime;
    }

    public void setDeptCreateTime(Date deptCreateTime) {
        this.deptCreateTime = deptCreateTime;
    }

    @Override
    protected Serializable pkVal() {
        return this.deptId;
    }

    @Override
    public String toString() {
        return "Dept{" +
        "deptId=" + deptId +
        ", deptName=" + deptName +
        ", deptType=" + deptType +
        ", deptStatus=" + deptStatus +
        ", deptCreateBy=" + deptCreateBy +
        ", deptUpdateBy=" + deptUpdateBy +
        ", deptUpdateTime=" + deptUpdateTime +
        ", deptCreateTime=" + deptCreateTime +
        "}";
    }
}
