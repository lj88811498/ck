package com.youedata.nncloud.modular.nanning.model;


import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.enums.IdType;

import java.util.Date;

/**
 * <p>
 * 用户表
 * </p>
 *
 * @author Monkey
 * @since 2019-01-21
 */
public class UserMini{

    private Integer userinfoId;

    /**
     * 头像
     */
    private String userinfoHead;
    /**
     * 登录用户名（同手机号）
     */
    private String userinfoName;
    /**
     * 性别
     */
    private String userInfoSex;
    /**
     * 真实姓名
     */
    private String userinfoNickname;
    /**
     * 昵称
     */
    @TableField("userInfo_surname")
    private String userInfoSurname;
    /**
     * 生日
     */
    private Date userInfoBirthday;
    /**
     * 省份
     */
    private String userInfoProvince;
    /**
     * 城市
     */
    private String userInfoCity;
    /**
     * 电话
     */
    private String userinfoTel;
    /**
     * 微信号
     */
    private String userinfoWx;
    /**
     * 会员等级
     */
    private String userinfoLv;
    /**
     * 我的推荐码
     */
    private String userinfoCode;

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

    @Override
    public String toString() {
        return "UserMini{" +
                "userinfoId=" + userinfoId +
                ", userinfoHead='" + userinfoHead + '\'' +
                ", userinfoName='" + userinfoName + '\'' +
                ", userInfoSex='" + userInfoSex + '\'' +
                ", userinfoNickname='" + userinfoNickname + '\'' +
                ", userInfoSurname='" + userInfoSurname + '\'' +
                ", userInfoBirthday=" + userInfoBirthday +
                ", userInfoProvince='" + userInfoProvince + '\'' +
                ", userInfoCity='" + userInfoCity + '\'' +
                ", userinfoTel='" + userinfoTel + '\'' +
                ", userinfoWx='" + userinfoWx + '\'' +
                ", userinfoLv='" + userinfoLv + '\'' +
                ", userinfoCode='" + userinfoCode + '\'' +
                '}';
    }
}
