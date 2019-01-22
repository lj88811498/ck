package com.youedata.nncloud.modular.nanning.model;

import io.swagger.annotations.ApiModel;
import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 用户表
 * </p>
 *
 * @author Monkey
 * @since 2019-01-21
 */
@ApiModel
@TableName("userInfo")
public class UserInfo extends Model<UserInfo> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "userInfo_id", type = IdType.AUTO)
    private Integer userinfoId;

    /**
     * 头像
     */
    @TableField("userinfo_head")
    private String userinfoHead;
    /**
     * 登录用户名（同手机号）
     */
    @TableField("userInfo_name")
    private String userinfoName;
    /**
     * 性别
     */
    @TableField("userInfo_sex")
    private String userInfoSex;
    /**
     * 密码
     */
    @TableField("userInfo_pwd")
    private String userinfoPwd;
    /**
     * 真实姓名
     */
    @TableField("userInfo_nickname")
    private String userinfoNickname;
    /**
     * 昵称
     */
    @TableField("userInfo_surname")
    private String userInfoSurname;
    /**
     * 生日
     */
    @TableField("userInfo_birthday")
    private Date userInfoBirthday;
    /**
     * 省份
     */
    @TableField("userInfo_province")
    private String userInfoProvince;
    /**
     * 城市
     */
    @TableField("userInfo_city")
    private String userInfoCity;
    /**
     * 电话
     */
    @TableField("userInfo_tel")
    private String userinfoTel;
    /**
     * 微信号
     */
    @TableField("userInfo_wx")
    private String userinfoWx;
    /**
     * 会员等级
     */
    @TableField("userInfo_lv")
    private String userinfoLv;
    /**
     * 我的推荐码
     */
    @TableField("userInfo_code")
    private String userinfoCode;
    /**
     * 推荐人的推荐码
     */
    @TableField("userInfo_org")
    private String userinfoOrg;
    /**
     * 组织码
     */
    @TableField("userInfo_treecode")
    private String userinfoTreecode;
    /**
     * 创建人
     */
    @TableField("userInfo_create_by")
    private Integer userinfoCreateBy;
    /**
     * 修改人
     */
    @TableField("userInfo_update_by")
    private Integer userinfoUpdateBy;
    /**
     * 创建时间
     */
    @TableField("userInfo_create_time")
    private Date userinfoCreateTime;
    /**
     * 修改时间
     */
    @TableField("userInfo_update_time")
    private Date userinfoUpdateTime;

    public Integer getUserinfoId() {
        return userinfoId;
    }

    public void setUserinfoId(Integer userinfoId) {
        this.userinfoId = userinfoId;
    }

    public String getUserinfoHead() {
        return userinfoHead;
    }

    public void setUserinfoHead(String userinfoHead) {
        this.userinfoHead = userinfoHead;
    }

    public String getUserinfoName() {
        return userinfoName;
    }

    public void setUserinfoName(String userinfoName) {
        this.userinfoName = userinfoName;
    }

    public String getUserInfoSex() {
        return userInfoSex;
    }

    public void setUserInfoSex(String userInfoSex) {
        this.userInfoSex = userInfoSex;
    }

    public String getUserinfoPwd() {
        return userinfoPwd;
    }

    public void setUserinfoPwd(String userinfoPwd) {
        this.userinfoPwd = userinfoPwd;
    }

    public String getUserinfoNickname() {
        return userinfoNickname;
    }

    public void setUserinfoNickname(String userinfoNickname) {
        this.userinfoNickname = userinfoNickname;
    }

    public String getUserInfoSurname() {
        return userInfoSurname;
    }

    public void setUserInfoSurname(String userInfoSurname) {
        this.userInfoSurname = userInfoSurname;
    }

    public Date getUserInfoBirthday() {
        return userInfoBirthday;
    }

    public void setUserInfoBirthday(Date userInfoBirthday) {
        this.userInfoBirthday = userInfoBirthday;
    }

    public String getUserInfoProvince() {
        return userInfoProvince;
    }

    public void setUserInfoProvince(String userInfoProvince) {
        this.userInfoProvince = userInfoProvince;
    }

    public String getUserInfoCity() {
        return userInfoCity;
    }

    public void setUserInfoCity(String userInfoCity) {
        this.userInfoCity = userInfoCity;
    }

    public String getUserinfoTel() {
        return userinfoTel;
    }

    public void setUserinfoTel(String userinfoTel) {
        this.userinfoTel = userinfoTel;
    }

    public String getUserinfoWx() {
        return userinfoWx;
    }

    public void setUserinfoWx(String userinfoWx) {
        this.userinfoWx = userinfoWx;
    }

    public String getUserinfoLv() {
        return userinfoLv;
    }

    public void setUserinfoLv(String userinfoLv) {
        this.userinfoLv = userinfoLv;
    }

    public String getUserinfoCode() {
        return userinfoCode;
    }

    public void setUserinfoCode(String userinfoCode) {
        this.userinfoCode = userinfoCode;
    }

    public String getUserinfoOrg() {
        return userinfoOrg;
    }

    public void setUserinfoOrg(String userinfoOrg) {
        this.userinfoOrg = userinfoOrg;
    }

    public String getUserinfoTreecode() {
        return userinfoTreecode;
    }

    public void setUserinfoTreecode(String userinfoTreecode) {
        this.userinfoTreecode = userinfoTreecode;
    }

    public Integer getUserinfoCreateBy() {
        return userinfoCreateBy;
    }

    public void setUserinfoCreateBy(Integer userinfoCreateBy) {
        this.userinfoCreateBy = userinfoCreateBy;
    }

    public Integer getUserinfoUpdateBy() {
        return userinfoUpdateBy;
    }

    public void setUserinfoUpdateBy(Integer userinfoUpdateBy) {
        this.userinfoUpdateBy = userinfoUpdateBy;
    }

    public Date getUserinfoCreateTime() {
        return userinfoCreateTime;
    }

    public void setUserinfoCreateTime(Date userinfoCreateTime) {
        this.userinfoCreateTime = userinfoCreateTime;
    }

    public Date getUserinfoUpdateTime() {
        return userinfoUpdateTime;
    }

    public void setUserinfoUpdateTime(Date userinfoUpdateTime) {
        this.userinfoUpdateTime = userinfoUpdateTime;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "userinfoId=" + userinfoId +
                ", userinfoHead='" + userinfoHead + '\'' +
                ", userinfoName='" + userinfoName + '\'' +
                ", userInfoSex='" + userInfoSex + '\'' +
                ", userinfoPwd='" + userinfoPwd + '\'' +
                ", userinfoNickname='" + userinfoNickname + '\'' +
                ", userInfoSurname='" + userInfoSurname + '\'' +
                ", userInfoBirthday=" + userInfoBirthday +
                ", userInfoProvince='" + userInfoProvince + '\'' +
                ", userInfoCity='" + userInfoCity + '\'' +
                ", userinfoTel='" + userinfoTel + '\'' +
                ", userinfoWx='" + userinfoWx + '\'' +
                ", userinfoLv='" + userinfoLv + '\'' +
                ", userinfoCode='" + userinfoCode + '\'' +
                ", userinfoOrg='" + userinfoOrg + '\'' +
                ", userinfoTreecode='" + userinfoTreecode + '\'' +
                ", userinfoCreateBy=" + userinfoCreateBy +
                ", userinfoUpdateBy=" + userinfoUpdateBy +
                ", userinfoCreateTime=" + userinfoCreateTime +
                ", userinfoUpdateTime=" + userinfoUpdateTime +
                '}';
    }

    @Override
    protected Serializable pkVal() {
        return this.userinfoId;
    }

}
