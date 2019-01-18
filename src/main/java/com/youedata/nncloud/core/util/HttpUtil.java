package com.youedata.nncloud.core.util;

import com.youedata.nncloud.core.support.HttpKit;

import javax.servlet.http.HttpServletResponse;

/**
 * http设置下载作用域
 * @Author: Monkey
 * @Date: Created in 14:23  2018/9/3.
 * @Description:
 */
public class HttpUtil {

    public static void setResponse(String fileName) throws Exception{
        HttpServletResponse response = HttpKit.getResponse();
        response.setContentType("multipart/form-data");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Content-Disposition", "attachment;fileName="
                + new String(fileName.getBytes("gb2312"), "ISO8859-1"));
    }
}
