package com.youedata.nncloud.modular.nanning.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import java.io.Serializable;

/**
 * <p>
 * 科室
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
public class Office extends Model<Office> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "office_id", type = IdType.AUTO)
    private Integer officeId;
    /**
     * 问题标题
     */
    private String officeName;
    /**
     * 状态
     */
    private String officeStatus;
    /**
     * 创建人
     */
    private Integer officeCreateBy;
    /**
     * 修改人
     */
    private Integer officeUpdateBy;
    /**
     * 修改时间
     */
    private Date officeUpdateTime;
    /**
     * 创建时间
     */
    private Date officeCreateTime;


    public Integer getOfficeId() {
        return officeId;
    }

    public void setOfficeId(Integer officeId) {
        this.officeId = officeId;
    }

    public String getOfficeName() {
        return officeName;
    }

    public void setOfficeName(String officeName) {
        this.officeName = officeName;
    }

    public String getOfficeStatus() {
        return officeStatus;
    }

    public void setOfficeStatus(String officeStatus) {
        this.officeStatus = officeStatus;
    }

    public Integer getOfficeCreateBy() {
        return officeCreateBy;
    }

    public void setOfficeCreateBy(Integer officeCreateBy) {
        this.officeCreateBy = officeCreateBy;
    }

    public Integer getOfficeUpdateBy() {
        return officeUpdateBy;
    }

    public void setOfficeUpdateBy(Integer officeUpdateBy) {
        this.officeUpdateBy = officeUpdateBy;
    }

    public Date getOfficeUpdateTime() {
        return officeUpdateTime;
    }

    public void setOfficeUpdateTime(Date officeUpdateTime) {
        this.officeUpdateTime = officeUpdateTime;
    }

    public Date getOfficeCreateTime() {
        return officeCreateTime;
    }

    public void setOfficeCreateTime(Date officeCreateTime) {
        this.officeCreateTime = officeCreateTime;
    }

    @Override
    protected Serializable pkVal() {
        return this.officeId;
    }

    @Override
    public String toString() {
        return "Office{" +
        "officeId=" + officeId +
        ", officeName=" + officeName +
        ", officeStatus=" + officeStatus +
        ", officeCreateBy=" + officeCreateBy +
        ", officeUpdateBy=" + officeUpdateBy +
        ", officeUpdateTime=" + officeUpdateTime +
        ", officeCreateTime=" + officeCreateTime +
        "}";
    }
}
