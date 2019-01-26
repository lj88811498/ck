package com.youedata.nncloud.modular.nanning.model;

import io.swagger.annotations.ApiModel;
import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import java.io.Serializable;

/**
 * <p>
 * 升级表
 * </p>
 *
 * @author Monkey
 * @since 2019-01-21
 */
@ApiModel
public class Upgrade extends Model<Upgrade> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "upgrade_id", type = IdType.AUTO)
    private Integer upgradeId;
    /**
     * 用户id
     */
    private Integer upgradeUserinfoId;
    /**
     * 审核领导id
     */
    private Integer upgradeLeaderId;
    /**
     * 状态0未审核1审核通过2审核不通过
     */
    private String upgradeStatus;
    /**
     * 创建时间
     */
    private Date upgradeCreateTime;
    /**
     * 修改时间
     */
    private Date upgradeUpdateTime;

    /**
     * 随机码
     */
    private String upgradeCode;

    public Integer getUpgradeId() {
        return upgradeId;
    }

    public void setUpgradeId(Integer upgradeId) {
        this.upgradeId = upgradeId;
    }

    public Integer getUpgradeUserinfoId() {
        return upgradeUserinfoId;
    }

    public void setUpgradeUserinfoId(Integer upgradeUserinfoId) {
        this.upgradeUserinfoId = upgradeUserinfoId;
    }

    public Integer getUpgradeLeaderId() {
        return upgradeLeaderId;
    }

    public void setUpgradeLeaderId(Integer upgradeLeaderId) {
        this.upgradeLeaderId = upgradeLeaderId;
    }

    public String getUpgradeStatus() {
        return upgradeStatus;
    }

    public void setUpgradeStatus(String upgradeStatus) {
        this.upgradeStatus = upgradeStatus;
    }

    public Date getUpgradeCreateTime() {
        return upgradeCreateTime;
    }

    public void setUpgradeCreateTime(Date upgradeCreateTime) {
        this.upgradeCreateTime = upgradeCreateTime;
    }

    public Date getUpgradeUpdateTime() {
        return upgradeUpdateTime;
    }

    public void setUpgradeUpdateTime(Date upgradeUpdateTime) {
        this.upgradeUpdateTime = upgradeUpdateTime;
    }

    public String getUpgradeCode() {
        return upgradeCode;
    }

    public void setUpgradeCode(String upgradeCode) {
        this.upgradeCode = upgradeCode;
    }

    @Override
    protected Serializable pkVal() {
        return this.upgradeId;
    }

    @Override
    public String toString() {
        return "Upgrade{" +
        "upgradeId=" + upgradeId +
        ", upgradeUserinfoId=" + upgradeUserinfoId +
        ", upgradeLeaderId=" + upgradeLeaderId +
        ", upgradeStatus=" + upgradeStatus +
        ", upgradeCode=" + upgradeCode +
        ", upgradeCreateTime=" + upgradeCreateTime +
        ", upgradeUpdateTime=" + upgradeUpdateTime +
        "}";
    }
}
