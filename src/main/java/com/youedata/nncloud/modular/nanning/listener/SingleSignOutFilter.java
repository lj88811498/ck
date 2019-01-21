package com.youedata.nncloud.modular.nanning.listener;

import org.jasig.cas.client.session.SessionMappingStorage;
import org.jasig.cas.client.session.SingleSignOutHandler;
import org.jasig.cas.client.util.AbstractConfigurationFilter;



import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;

import java.io.IOException;

/**
 * Created by cdyoue on 2016/10/26.
 */
public final class SingleSignOutFilter extends AbstractConfigurationFilter {
    private static final SingleSignOutHandler handler = new SingleSignOutHandler();

    //private String logoutParameterName = "logoutRequest";
    
    public SingleSignOutFilter() {
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        if(!this.isIgnoreInitConfiguration()) {
            handler.setArtifactParameterName(this.getPropertyFromInitParams(filterConfig, "artifactParameterName", "ticket"));
            handler.setLogoutParameterName(this.getPropertyFromInitParams(filterConfig, "logoutParameterName", "logoutRequest"));
        }

        handler.init();
    }

    public void setArtifactParameterName(String name) {
        handler.setArtifactParameterName(name);
    }

    public void setLogoutParameterName(String name) {
        handler.setLogoutParameterName(name);
    }

    public void setSessionMappingStorage(SessionMappingStorage storage) {
        handler.setSessionMappingStorage(storage);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        if(handler.isTokenRequest(request)) {
            handler.recordSession(request);
        } else {
//        	AuthManageDao authManageDao = ConnectHessianFactoryUtils.getInstance();
//    		JSONObject jsonObject = new JSONObject();
//    		jsonObject.put(StaticUtils.STATIC_USER_INFO, request.getHeader(StaticUtils.STATIC_LOCAL_ACCOUNT_TOKEN));
//    		RecordLogUtils.info("authManageDao : " + authManageDao);
//    		RecordLogUtils.info("jsonObject : " + jsonObject);
//    		//删除用户权限
//    		JSONObject js = authManageDao.delUserAuth(jsonObject);
//    		RecordLogUtils.info("回调结果 : " + js.toJSONString());
			request.getSession().invalidate();

            this.log.trace("Ignoring URI " + request.getRequestURI());
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
    }

    protected static SingleSignOutHandler getSingleSignOutHandler() {
        return handler;
    }
}