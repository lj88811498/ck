package com.youedata.nncloud.core.filter;


import org.springframework.stereotype.Component;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;

/**
 * 跨域支持
 * @author monkey
 * @date 2018-09-26
 */
//多个以逗号分开 (urlPatterns={})
//@WebFilter("/*")
//@Component
public class AllowCredentialsFilter implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		HttpServletResponse response = (HttpServletResponse) res;
//		response.setHeader("Access-Control-Allow-Credentials", "true");
//		response.setHeader("Access-Control-Allow-Origin","*");
////        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
//        response.setHeader("Access-Control-Allow-Methods", "*");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        //response.setHeader("Access-Control-Allow-Headers", "x-requested-with, Content-Type");
////		response.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization,token");
//		response.setHeader("Access-Control-Allow-Headers", "*");
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
		
	}

}
