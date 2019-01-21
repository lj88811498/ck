//package com.youedata.nncloud.config.web;
//
//import com.youedata.nncloud.config.properties.GunsProperties;
//import com.youedata.nncloud.core.shiro.ShiroDbRealm;
//import com.youedata.nncloud.modular.nanning.listener.SingleSignOutFilter;
//import com.youedata.nncloud.modular.nanning.shiro.ShiroSettings;
//import com.youedata.nncloud.modular.nanning.shiro.UserRealm;
//import org.apache.shiro.cache.CacheManager;
//import org.apache.shiro.cache.ehcache.EhCacheManager;
//import org.apache.shiro.cas.CasFilter;
//import org.apache.shiro.cas.CasSubjectFactory;
//import org.apache.shiro.codec.Base64;
//import org.apache.shiro.spring.LifecycleBeanPostProcessor;
//import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
//import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
//import org.apache.shiro.web.filter.authc.LogoutFilter;
//import org.apache.shiro.web.mgt.CookieRememberMeManager;
//import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
//import org.apache.shiro.web.servlet.Cookie;
//import org.apache.shiro.web.servlet.ShiroHttpSession;
//import org.apache.shiro.web.servlet.SimpleCookie;
//import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
//import org.apache.shiro.web.session.mgt.ServletContainerSessionManager;
//import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
//import org.springframework.beans.factory.config.MethodInvokingFactoryBean;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.filter.DelegatingFilterProxy;
//
//import javax.servlet.Filter;
//import java.util.HashMap;
//import java.util.LinkedHashMap;
//import java.util.Map;
//
///**
// * shiro权限管理的配置
// *
// * @author fengshuonan
// * @date 2016年11月14日 下午3:03:44
// */
//@Configuration
//public class ShiroConfig {
//
//
//
//    @Bean(name = "shiroSettings")
//    public ShiroSettings getShiroSettings() {
//        ShiroSettings em = new ShiroSettings();
//        return em;
//    }
//
//    @Bean(name = "myShiroCasRealm")
//    public UserRealm myShiroCasRealm() {
//        return new UserRealm();
//    }
//
//
//    /**
//     * CAS过滤器
//     */
//    @Bean(name = "casFilter")
//    public CasFilter getCasFilter(ShiroSettings shiroSettings) {
//        CasFilter casFilter = new CasFilter();
//        casFilter.setName("casFilter");
//        casFilter.setEnabled(true);
//        // 登录失败后跳转的URL，也就是 Shiro 执行 CasRealm 的 doGetAuthenticationInfo 方法向CasServer验证tiket
//        casFilter.setFailureUrl(shiroSettings.getCasServerUrlPrefix() + shiroSettings.getLoginSuffix() + "?service=" + shiroSettings.getServerUrlPrefix() + shiroSettings.getCasFilterUrlPattern());
//        return casFilter;
//    }
//
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean() {
//        FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
//        filterRegistration.setFilter(new DelegatingFilterProxy("shiroFilter"));
//        //  该值缺省为false,表示生命周期由SpringApplicationContext管理,设置为true则表示由ServletContainer管理
//        filterRegistration.addInitParameter("targetFilterLifecycle", "true");
//        filterRegistration.setEnabled(true);
//        filterRegistration.addUrlPatterns("/*");
//        return filterRegistration;
//    }
//
//
//    /**
//     * Shiro生命周期处理器:
//     * 用于在实现了Initializable接口的Shiro bean初始化时调用Initializable接口回调(例如:UserRealm)
//     * 在实现了Destroyable接口的Shiro bean销毁时调用 Destroyable接口回调(例如:DefaultSecurityManager)
//     */
//    @Bean(name = "lifecycleBeanPostProcessor")
//    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
//        return new LifecycleBeanPostProcessor();
//    }
//
//    @Bean
//    public DefaultAdvisorAutoProxyCreator getDefaultAdvisorAutoProxyCreator() {
//        DefaultAdvisorAutoProxyCreator daap = new DefaultAdvisorAutoProxyCreator();
//        daap.setProxyTargetClass(true);
//        return daap;
//    }
//    @Bean
//    public AuthorizationAttributeSourceAdvisor getAuthorizationAttributeSourceAdvisor(DefaultWebSecurityManager securityManager) {
//        AuthorizationAttributeSourceAdvisor aasa = new AuthorizationAttributeSourceAdvisor();
//        aasa.setSecurityManager(securityManager);
//        return aasa;
//    }
//
//
//    /**
//     * 安全管理器
//     */
//    @Bean(name = "securityManager")
////    public DefaultWebSecurityManager securityManager(CookieRememberMeManager rememberMeManager, CacheManager cacheShiroManager, SessionManager sessionManager) {
//    public DefaultWebSecurityManager securityManager(UserRealm myShiroDbRealm) {
//        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
////        securityManager.setRealm(this.shiroDbRealm());
////        securityManager.setCacheManager(cacheShiroManager);
////        securityManager.setRememberMeManager(rememberMeManager);
////        securityManager.setSessionManager(sessionManager);
//        securityManager.setRealm(myShiroDbRealm);
//        securityManager.setSubjectFactory(new CasSubjectFactory());
//        return securityManager;
//    }
//
//    /**
//     * spring session管理器（多机环境）
//     */
//    @Bean
//    @ConditionalOnProperty(prefix = "guns", name = "spring-session-open", havingValue = "true")
//    public ServletContainerSessionManager servletContainerSessionManager() {
//        return new ServletContainerSessionManager();
//    }
//
//    /**
//     * session管理器(单机环境)
//     */
//    @Bean
//    @ConditionalOnProperty(prefix = "guns", name = "spring-session-open", havingValue = "false")
//    public DefaultWebSessionManager defaultWebSessionManager(CacheManager cacheShiroManager, GunsProperties gunsProperties) {
//        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
//        sessionManager.setCacheManager(cacheShiroManager);
//        sessionManager.setSessionValidationInterval(gunsProperties.getSessionValidationInterval() * 1000);
//        sessionManager.setGlobalSessionTimeout(gunsProperties.getSessionInvalidateTime() * 1000);
//        sessionManager.setDeleteInvalidSessions(true);
//        sessionManager.setSessionValidationSchedulerEnabled(true);
//        Cookie cookie = new SimpleCookie(ShiroHttpSession.DEFAULT_SESSION_ID_NAME);
//        cookie.setName("shiroCookie");
//        cookie.setHttpOnly(true);
//        sessionManager.setSessionIdCookie(cookie);
//        return sessionManager;
//    }
//
//    /**
//     * 缓存管理器 使用Ehcache实现
//     */
//    @Bean
//    public CacheManager getCacheShiroManager(EhCacheManagerFactoryBean ehcache) {
//        EhCacheManager ehCacheManager = new EhCacheManager();
//        ehCacheManager.setCacheManager(ehcache.getObject());
//        return ehCacheManager;
//    }
//
//    /**
//     * 项目自定义的Realm
//     */
//    @Bean(name = "myShiroCasRealm")
//    public ShiroDbRealm shiroDbRealm() {
//        return new ShiroDbRealm();
//    }
//
//    /**
//     * rememberMe管理器, cipherKey生成见{@code Base64Test.java}
//     */
//    @Bean
//    public CookieRememberMeManager rememberMeManager(SimpleCookie rememberMeCookie) {
//        CookieRememberMeManager manager = new CookieRememberMeManager();
//        manager.setCipherKey(Base64.decode("Z3VucwAAAAAAAAAAAAAAAA=="));
//        manager.setCookie(rememberMeCookie);
//        return manager;
//    }
//
//    /**
//     * 记住密码Cookie
//     */
//    @Bean
//    public SimpleCookie rememberMeCookie() {
//        SimpleCookie simpleCookie = new SimpleCookie("rememberMe");
//        simpleCookie.setHttpOnly(true);
//        simpleCookie.setMaxAge(7 * 24 * 60 * 60);//7天
//        return simpleCookie;
//    }
//
//    /**
//     * Shiro的过滤器链
//     */
//    @Bean(name = "shiroFilter")
//    public ShiroFilterFactoryBean shiroFilter(DefaultWebSecurityManager securityManager, CasFilter casFilter, ShiroSettings shiroSettings) {
//        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
//        shiroFilter.setSecurityManager(securityManager);
//        /**
//         * 默认的登陆访问url
//         */
//        //shiroFilter.setLoginUrl("/shiro-cas");
//        shiroFilter.setLoginUrl(shiroSettings.getCasServerUrlPrefix() + shiroSettings.getLoginSuffix() + "?service=" + shiroSettings.getServerUrlPrefix() + shiroSettings.getCasFilterUrlPattern());
//        /**
//         * 登陆成功后跳转的url
//         */
////        shiroFilter.setSuccessUrl("/");
//        shiroFilter.setSuccessUrl(shiroSettings.getFrontUrl());
//        /**
//         * 没有权限跳转的url
//         */
//        shiroFilter.setUnauthorizedUrl("/global/error");
//
//        LogoutFilter logoutFilter = new LogoutFilter();
//        StringBuilder logoutUrl = new StringBuilder(shiroSettings.getCasServerUrlPrefix());
//        logoutUrl.append(shiroSettings.getLogoutSuffix());
//        logoutUrl.append("?service=");
//        logoutUrl.append(shiroSettings.getServerUrlPrefix());
//        logoutUrl.append(shiroSettings.getCasFilterUrlPattern());
//        logoutFilter.setRedirectUrl(logoutUrl.toString());
//
//        SingleSignOutFilter singleSignOutFilter = new SingleSignOutFilter();
//
//        Map<String, Filter> filters = new HashMap();
//        filters.put("singleSignOutFilter", singleSignOutFilter);
//        filters.put("casFilter", casFilter);
//        filters.put("logoutFilter", logoutFilter);
//
//        shiroFilter.setFilters(filters);
//        /**
//         * 覆盖默认的user拦截器(默认拦截器解决不了ajax请求 session超时的问题,若有更好的办法请及时反馈作者)
//         */
////        HashMap<String, Filter> myFilters = new HashMap<>();
////        myFilters.put("user", new GunsUserFilter());
////        shiroFilter.setFilters(myFilters);
//
//        /**
//         * 配置shiro拦截器链
//         *
//         * anon  不需要认证
//         * authc 需要认证
//         * user  验证通过或RememberMe登录的都可以
//         *
//         * 当应用开启了rememberMe时,用户下次访问时可以是一个user,但不会是authc,因为authc是需要重新认证的
//         *
//         * 顺序从上到下,优先级依次降低
//         *
//         */
//        Map<String, String> hashMap = new LinkedHashMap<>();
////        hashMap.put("/static/**", "anon");
////        hashMap.put("/login", "anon");
////        hashMap.put("/global/sessionError", "anon");
////        hashMap.put("/kaptcha", "anon");
//
////        hashMap.put("/shiro-cas", "casFilter");
//        hashMap.put("/", "casFilter");
//        hashMap.put("/logout", "singleSignOutFilter,logoutFilter");
//        //monkey注释,打开则会过滤登陆页面
//        hashMap.put("/**", "anon");
//        shiroFilter.setFilterChainDefinitionMap(hashMap);
//        return shiroFilter;
//    }
//
//    /**
//     * 在方法中 注入 securityManager,进行代理控制
//     */
//    @Bean
//    public MethodInvokingFactoryBean methodInvokingFactoryBean(DefaultWebSecurityManager securityManager) {
//        MethodInvokingFactoryBean bean = new MethodInvokingFactoryBean();
//        bean.setStaticMethod("org.apache.shiro.SecurityUtils.setSecurityManager");
//        bean.setArguments(new Object[]{securityManager});
//        return bean;
//    }
//
//    /**
//     * 启用shrio授权注解拦截方式，AOP式方法级权限检查
//     */
////    @Bean
////    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(DefaultWebSecurityManager securityManager) {
////        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor =
////                new AuthorizationAttributeSourceAdvisor();
////        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
////        return authorizationAttributeSourceAdvisor;
////    }
//
//}
