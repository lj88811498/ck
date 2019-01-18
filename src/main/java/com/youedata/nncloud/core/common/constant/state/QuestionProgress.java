package com.youedata.nncloud.core.common.constant.state;

/**
 * @Author: Monkey
 * @Date: Created in 15:30  2018/9/13.
 * @Description:
 */
public enum QuestionProgress {

    ZORE("0", "您的问题反馈正在待审核。"),
    ONE("1", "您的问题反馈正在等待受理。"),
    TWO("2", "客服人员已受理您的问题反馈。"),
    THREE("3", "您的问题反馈已转交委办局【$$$】处理。"),
    FOUR("4", "您的问题反馈工作人员正在解答。"),
    FIVE("5", "委办局【$$$】已答复您的问题，等待您确认。"),
    SIX("6", "您的问题反馈正在等待您评价。"),
    SEVEN("7", "您的问题反馈已评价成功。"),
    EIGHT("8", "您的问题反馈已关闭。"),
    NIGHT("9", "您的问题反馈审核未通过。"),
    TEN("10", "您的问题反馈已删除。"),
    ELEVEN("11", "客服已答复您的问题。"),
//    TWELVE("12", "客服人员给您的问题留言了。");
    TWELVE("12", "用户有新的留言。"),
    THIRTEEN("13", "用户已评分。"),
    FOURTEEN("14", "客服人员给您的问题留言了。");


    private String code;
    private String msg;

    QuestionProgress(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public static String getMsg(String code) {
        if (code == null) {
            return "";
        } else {
            for (QuestionProgress s : QuestionProgress.values()) {
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
            for (QuestionProgress s : QuestionProgress.values()) {
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
