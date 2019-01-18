package com.youedata.nncloud.modular.nanning.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import java.io.Serializable;

/**
 * <p>
 * 用户信息
 * </p>
 *
 * @author Monkey
 * @since 2018-09-12
 */
public class UserInfo extends Model<UserInfo> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "user_info_id", type = IdType.AUTO)
    private Integer userInfoId;
    /**
     * 账号
     */
    private String userInfoName;
    /**
     * 密码
     */
    private String userInfoNamePwd;
    /**
     * 类型：1企业，2政府
     */
    private String userInfoType;
    /**
     * 图片地址
     */
    private String userInfoUrl;
    /**
     * 状态
     */
    private String userInfoStatus;
    /**
     * 创建人
     */
    private Integer userInfoCreateBy;
    /**
     * 修改人
     */
    private Integer userInfoUpdateBy;
    /**
     * 修改时间
     */
    private Date userInfoUpdateTime;
    /**
     * 创建时间
     */
    private Date userInfoCreateTime;

    /**
     * 盐值
     * @author: Monkey
     * @param:
     * @date: Created in  2018/9/17 17:23.
     * @return
     */
    private String userInfoSalt;

    public String getUserInfoSalt() {
        return userInfoSalt;
    }

    public void setUserInfoSalt(String userInfoSalt) {
        this.userInfoSalt = userInfoSalt;
    }

    public Integer getUserInfoId() {
        return userInfoId;
    }

    public void setUserInfoId(Integer userInfoId) {
        this.userInfoId = userInfoId;
    }

    public String getUserInfoName() {
        return userInfoName;
    }

    public void setUserInfoName(String userInfoName) {
        this.userInfoName = userInfoName;
    }

    public String getUserInfoNamePwd() {
        return userInfoNamePwd;
    }

    public void setUserInfoNamePwd(String userInfoNamePwd) {
        this.userInfoNamePwd = userInfoNamePwd;
    }

    public String getUserInfoType() {
        return userInfoType;
    }

    public void setUserInfoType(String userInfoType) {
        this.userInfoType = userInfoType;
    }

    public String getUserInfoUrl() {
        return userInfoUrl;
    }

    public void setUserInfoUrl(String userInfoUrl) {
        this.userInfoUrl = userInfoUrl;
    }

    public String getUserInfoStatus() {
        return userInfoStatus;
    }

    public void setUserInfoStatus(String userInfoStatus) {
        this.userInfoStatus = userInfoStatus;
    }

    public Integer getUserInfoCreateBy() {
        return userInfoCreateBy;
    }

    public void setUserInfoCreateBy(Integer userInfoCreateBy) {
        this.userInfoCreateBy = userInfoCreateBy;
    }

    public Integer getUserInfoUpdateBy() {
        return userInfoUpdateBy;
    }

    public void setUserInfoUpdateBy(Integer userInfoUpdateBy) {
        this.userInfoUpdateBy = userInfoUpdateBy;
    }

    public Date getUserInfoUpdateTime() {
        return userInfoUpdateTime;
    }

    public void setUserInfoUpdateTime(Date userInfoUpdateTime) {
        this.userInfoUpdateTime = userInfoUpdateTime;
    }

    public Date getUserInfoCreateTime() {
        return userInfoCreateTime;
    }

    public void setUserInfoCreateTime(Date userInfoCreateTime) {
        this.userInfoCreateTime = userInfoCreateTime;
    }

    @Override
    protected Serializable pkVal() {
        return this.userInfoId;
    }

    public UserInfo() {

    }


    public UserInfo(String userInfoType, String userInfoName) {
        this.userInfoType = userInfoType;
        this.userInfoName = userInfoName;
        this.userInfoNamePwd = userInfoNamePwd;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
        "userInfoId=" + userInfoId +
        ", userInfoName=" + userInfoName +
        ", userInfoNamePwd=" + userInfoNamePwd +
        ", userInfoType=" + userInfoType +
        ", userInfoUrl=" + userInfoUrl +
        ", userInfoStatus=" + userInfoStatus +
        ", userInfoCreateBy=" + userInfoCreateBy +
        ", userInfoUpdateBy=" + userInfoUpdateBy +
        ", userInfoUpdateTime=" + userInfoUpdateTime +
        ", userInfoCreateTime=" + userInfoCreateTime +
        "}";
    }
}
