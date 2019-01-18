package com.youedata.nncloud.core.common.constant.state;

/**
 * @Author: Monkey
 * @Date: Created in 17:27  2018/9/13.
 * @Description:
 */
public enum QuestionAutoAnswer {

    zore("0", "【处理进度：等待审核】您好，您的问题正在审核中，请耐心等待"),
    one("1", "【处理进度：等待受理】您好，您的问题已通过初步审核，请您耐心等待工作人员受理"),
    two("2", "【处理进度：已受理】您好，您的问题工作人员已受理，会尽快为您处理，请您耐心等待"),
    three("3", "【处理进度：已转交相关部门】您好，根据问题内容，您的问题已经转交给 $$$"),
    five("5", "【处理进度：等待用户确认】 "),
    night("9", "【处理进度：审核未通过】您好，您的问题因###审核未通过，请重新填写提交问题");

    private String code;

    private String msg;

    QuestionAutoAnswer(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public static String getMsg(String code) {
        if (code == null) {
            return "";
        } else {
            for (QuestionAutoAnswer s : QuestionAutoAnswer.values()) {
                if (s.getCode().equals(code)) {
                    return s.getMsg();
                }
            }
            return "";
        }
    }
    public static String getCode(String msg) {
        if (msg == null) {
            return "";
        } else {
            for (QuestionAutoAnswer s : QuestionAutoAnswer.values()) {
                if (s.getMsg().equals(msg)) {
                    return s.getCode();
                }
            }
            return "";
        }
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
