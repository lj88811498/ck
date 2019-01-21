//package com.youedata.nncloud.modular.nanning.shiro;
//
//import com.youedata.nncloud.core.shiro.ShiroDbRealm;
//import com.youedata.nncloud.modular.nanning.listener.SingleSignOutFilter;
//import org.apache.shiro.cas.CasFilter;
//import org.apache.shiro.cas.CasSubjectFactory;
//import org.apache.shiro.spring.LifecycleBeanPostProcessor;
//import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
//import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
//import org.apache.shiro.web.filter.authc.LogoutFilter;
//import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.filter.DelegatingFilterProxy;
//
//import javax.servlet.Filter;
//
//import java.util.HashMap;
//import java.util.LinkedHashMap;
//import java.util.Map;
//
//
///**
// * Shiro集成Cas配置
// */
//@Configuration
//public class ShiroCasConfiguration {
//
//    private static final Logger logger = LoggerFactory.getLogger(ShiroCasConfiguration.class);
//
//
//
//    @Bean(name = "shiroSettings")
//    public ShiroSettings getShiroSettings() {
//        ShiroSettings em = new ShiroSettings();
//        return em;
//    }
//
//
//    @Bean(name = "myShiroCasRealm")
//    public UserRealm myShiroCasRealm() {
//        UserRealm realm = new UserRealm();
////        realm.setCacheManager(cacheManager);
//        return realm;
//    }
//
//    /**
//     * 项目自定义的Realm
//     */
//    @Bean(name = "myShiroCasRealm")
//    public ShiroDbRealm shiroDbRealm() {
//
//        return new ShiroDbRealm();
//    }
//
//    /**
//     * 注册DelegatingFilterProxy（Shiro）
//     *
//     * @return
//     */
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
//    @Bean(name = "lifecycleBeanPostProcessor")
//    public LifecycleBeanPostProcessor getLifecycleBeanPostProcessor() {
//        return new LifecycleBeanPostProcessor();
//    }
//
//    @Bean
//    public DefaultAdvisorAutoProxyCreator getDefaultAdvisorAutoProxyCreator() {
//        DefaultAdvisorAutoProxyCreator daap = new DefaultAdvisorAutoProxyCreator();
//        daap.setProxyTargetClass(true);
//        return daap;
//    }
//
//    @Bean(name = "securityManager")
//    public DefaultWebSecurityManager getDefaultWebSecurityManager(UserRealm myShiroCasRealm) {
//        DefaultWebSecurityManager dwsm = new DefaultWebSecurityManager();
//        dwsm.setRealm(myShiroCasRealm);
////      <!-- 用户授权/认证信息Cache, 采用EhCache 缓存 -->
////        dwsm.setCacheManager(getEhCacheManager());
//        // 指定 SubjectFactory
//        dwsm.setSubjectFactory(new CasSubjectFactory());
//        return dwsm;
//    }
//
//    @Bean
//    public AuthorizationAttributeSourceAdvisor getAuthorizationAttributeSourceAdvisor(DefaultWebSecurityManager securityManager) {
//        AuthorizationAttributeSourceAdvisor aasa = new AuthorizationAttributeSourceAdvisor();
//        aasa.setSecurityManager(securityManager);
//        return aasa;
//    }
//
//
//    /**
//     * 加载shiroFilter权限控制规则（从数据库读取然后配置）
//     */
//    private void loadShiroFilterChain(ShiroFilterFactoryBean shiroFilterFactoryBean) {
//        /////////////////////// 下面这些规则配置最好配置到配置文件中 ///////////////////////
//        Map<String, String> filterChainDefinitionMap = new LinkedHashMap<String, String>();
//        filterChainDefinitionMap.put("/**", "anon");//anon
////        filterChainDefinitionMap.put("/bower_components/**", "anon");//anon
////        filterChainDefinitionMap.put("/boot/uif/user/**", "anon");//anon
//        filterChainDefinitionMap.put("/shiro-cas", "casFilter");// shiro集成cas后，首先添加该规则
//        // authc：该过滤器下的页面必须验证后才能访问，它是Shiro内置的一个拦截器org.apache.shiro.web.filter.authc.FormAuthenticationFilter
//        //先注释login------monkey
//        //        filterChainDefinitionMap.put("/login", "singleSignOutFilter,anon");
//        filterChainDefinitionMap.put("/logout", "singleSignOutFilter,logoutFilter");
////        filterChainDefinitionMap.put("/403", "singleSignOutFilter,anon");
//        //放行前台页面
////        filterChainDefinitionMap.put("/**", "user");//authc
////        filterChainDefinitionMap.put("/**", "singleSignOutFilter,authc,roles[\"backAdmin\"]");//authc
//
//
////        filterChainDefinitionMap.put("/shiro-cas", "singleSignOutFilter,casFilter");// shiro集成cas后，首先添加该规则
//        // authc：该过滤器下的页面必须验证后才能访问，它是Shiro内置的一个拦截器org.apache.shiro.web.filter.authc.FormAuthenticationFilter
////        filterChainDefinitionMap.put("/login", "singleSignOutFilter,anon");
////        filterChainDefinitionMap.put("/logout", "singleSignOutFilter,logoutFilter");
////        filterChainDefinitionMap.put("/403", "singleSignOutFilter,anon");
//
////        filterChainDefinitionMap.put("/**", "singleSignOutFilter,authc");//authc
////        filterChainDefinitionMap.put("/**", "singleSignOutFilter,authc,roles[\"backAdmin\"]");//authc
//        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
//    }
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
//        casFilter.setFailureUrl(shiroSettings.getCasServerUrlPrefix() + shiroSettings.getLoginSuffix() + "?service=" + shiroSettings.getServerUrlPrefix() + shiroSettings.casFilterUrlPattern);
//        return casFilter;
//    }
//
//
//    /**
//     * ShiroFilter<br/>
//     */
//    @Bean(name = "shiroFilter")
//    public ShiroFilterFactoryBean getShiroFilterFactoryBean(DefaultWebSecurityManager securityManager, CasFilter casFilter, ShiroSettings shiroSettings) {
//        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
//        // 必须设置 SecurityManager
//        shiroFilterFactoryBean.setSecurityManager(securityManager);
//        // 如果不设置默认会自动寻找Web工程根目录下的"/login.jsp"页面
//        shiroFilterFactoryBean.setLoginUrl(shiroSettings.getCasServerUrlPrefix() + shiroSettings.getLoginSuffix() + "?service=" + shiroSettings.getServerUrlPrefix() + shiroSettings.getCasFilterUrlPattern());
//        // 登录成功后要跳转的连接
////        shiroFilterFactoryBean.setSuccessUrl(shiroSettings.getSuccessUrl() + "?service=" + shiroSettings.getServerUrlPrefix() + shiroSettings.getCasFilterUrlPattern());
//        shiroFilterFactoryBean.setSuccessUrl(shiroSettings.getFrontUrl());
//        shiroFilterFactoryBean.setUnauthorizedUrl("/403");
//        // 添加casFilter到shiroFilter中
//        Map<String, Filter> filters = new HashMap();
//
//        LogoutFilter logoutFilter = new LogoutFilter();
//
//
//        StringBuilder logoutUrl = new StringBuilder(shiroSettings.getCasServerUrlPrefix());
//        logoutUrl.append(shiroSettings.getLogoutSuffix());
//        logoutUrl.append("?service=");
//        logoutUrl.append(shiroSettings.getServerUrlPrefix());
//        logoutUrl.append(shiroSettings.getCasFilterUrlPattern());
//
//        SingleSignOutFilter singleSignOutFilter = new SingleSignOutFilter();
//
//        filters.put("singleSignOutFilter", singleSignOutFilter);
//        filters.put("casFilter", casFilter);
//        filters.put("logoutFilter", logoutFilter);
//
//        logoutFilter.setRedirectUrl(logoutUrl.toString());
//
//        shiroFilterFactoryBean.setFilters(filters);
//
//        loadShiroFilterChain(shiroFilterFactoryBean);
//        return shiroFilterFactoryBean;
//    }
//
//}