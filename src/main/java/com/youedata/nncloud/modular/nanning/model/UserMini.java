package com.youedata.nncloud.modular.nanning.model;


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
     * 用户名
     */
    private String userinfoName;
    /**
     * 昵称
     */
    private String userinfoNickname;
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

    public String getUserinfoName() {
        return userinfoName;
    }

    public void setUserinfoName(String userinfoName) {
        this.userinfoName = userinfoName;
    }

    public String getUserinfoNickname() {
        return userinfoNickname;
    }

    public void setUserinfoNickname(String userinfoNickname) {
        this.userinfoNickname = userinfoNickname;
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
                ", userinfoName='" + userinfoName + '\'' +
                ", userinfoNickname='" + userinfoNickname + '\'' +
                ", userinfoTel='" + userinfoTel + '\'' +
                ", userinfoWx='" + userinfoWx + '\'' +
                ", userinfoLv='" + userinfoLv + '\'' +
                ", userinfoCode='" + userinfoCode + '\'' +
                '}';
    }
}
