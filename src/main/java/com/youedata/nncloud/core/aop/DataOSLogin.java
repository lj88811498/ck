package com.youedata.nncloud.core.aop;

import com.alibaba.fastjson.JSONObject;
import com.youedata.nncloud.config.properties.DataOsProperties;
import com.youedata.nncloud.core.util.GlobalHashMap;
import com.youedata.nncloud.core.util.JsonUtil;
import com.youedata.nncloud.modular.nanning.service.IUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Monkey on 2016/6/7.
 */

@RestControllerAdvice
public class DataOSLogin implements HandlerInterceptor {
    @Autowired
    IUserInfoService userInfoService;

    @Autowired
    DataOsProperties dataOsProperties;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object obj) throws Exception {
        String token = request.getHeader("accessToken");//从请求头中获取accessToken
        return GlobalHashMap.isUserOnline(token);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object obj, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object obj, Exception e) throws Exception {

    }
}
