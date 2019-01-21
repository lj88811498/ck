//package com.youedata.nncloud.modular.nanning.shiro;
//
//
//import com.youedata.nncloud.core.shiro.ShiroUser;
//import com.youedata.nncloud.core.shiro.factory.IShiro;
//import com.youedata.nncloud.core.shiro.factory.ShiroFactroy;
//import com.youedata.nncloud.core.support.HttpKit;
//import com.youedata.nncloud.core.util.RecordLogUtil;
//import com.youedata.nncloud.modular.nanning.dao.UserInfoMapper;
//import com.youedata.nncloud.modular.nanning.model.UserInfo;
//import org.apache.shiro.SecurityUtils;
//import org.apache.shiro.authc.AuthenticationInfo;
//import org.apache.shiro.authc.AuthenticationToken;
//import org.apache.shiro.authz.AuthorizationInfo;
//import org.apache.shiro.authz.SimpleAuthorizationInfo;
//import org.apache.shiro.cas.CasRealm;
//import org.apache.shiro.subject.PrincipalCollection;
//import org.apache.shiro.web.subject.WebSubject;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import javax.annotation.PostConstruct;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletResponse;
//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;
//
///**
// * 用户授权信息域
// *
// * @author monkey
// *
// */
//public class UserRealm extends CasRealm {
//
//	@Autowired
//	private ShiroSettings shiroSettings;
//
//	@Autowired
//	private UserInfoMapper userInfoMapper;
//
//	private HttpServletResponse response = null;
//
//	protected final Map<String, SimpleAuthorizationInfo> roles = new ConcurrentHashMap<String, SimpleAuthorizationInfo>();
//
//	/**
//	 * 设置角色和权限信息
//	 */
//	@Override
//	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
//		//String account = (String) principals.getPrimaryPrincipal();
//		SimpleAuthorizationInfo authorizationInfo = null;
//		if (authorizationInfo == null) {
//			authorizationInfo = new SimpleAuthorizationInfo();
//			//具体等待实现
//			//authorizationInfo.addStringPermissions(roleService.getPermissions(account));
//			//authorizationInfo.addRoles(roleService.getRoles(account));
//			//roles.put(account, authorizationInfo);
//		}
//
//		return authorizationInfo;
//	}
//
//	@PostConstruct
//	public void initProperty() {
//		setDefaultRoles("ROLE_USER");
//		setCasServerUrlPrefix(shiroSettings.getCasServerUrlPrefix());
//		// 客户端回调地址
//		setCasService(shiroSettings.getServerUrlPrefix() + shiroSettings.getCasFilterUrlPattern());
//	}
//	/**
//	 * 1、CAS认证 ,验证用户身份
//	 * 2、将用户基本信息设置到会话中
//	 *
//	 */
//	//单点登陆回调方法
//	@Override
//	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) {
//		AuthenticationInfo authc = super.doGetAuthenticationInfo(token);
//		try {
//			if (authc != null) {
//				//此处回调登陆
//				String userInfo = (String) authc.getPrincipals().getPrimaryPrincipal();
//				String account[] = userInfo.split("#~#");
//				String name = account[0];
//				UserInfo user = new UserInfo();
//				user.setUserInfoName(name);
//				UserInfo temp = userInfoMapper.selectone(name);
//				IShiro shiroFactory = ShiroFactroy.me();
//				ShiroUser shiroUser = shiroFactory.shiroUser(temp);
//
////        		ShiroUser shiroUser = ShiroKit.getUser();
//				HttpKit.getRequest().getSession().setAttribute("shiroUser", shiroUser);
//				HttpKit.getRequest().getSession().setAttribute("username", shiroUser.getAccount());
////				String account = userInfo.split(",")[0];
//				//String casToken = userInfo.split(",")[1];
//				//Random r = new Random();
//				//int nextInt = r.nextInt();
//				//盐城登陆验证随机码
//				//String ycdlyzsjm = String.valueOf(nextInt);
//
////				setCookie(StaticUtils.STATIC_LOCAL_ACCOUNT_TOKEN, casToken);
////				setCookie("localAccount", Base64.encode(account.getBytes()));
////				setCookie("ycdlyzsjm", Base64.encode(ycdlyzsjm.getBytes()));
//			}
//		} catch (Exception e) {
//			response = null;
//			RecordLogUtil.error("登陆异常！", e);
//		}
//		return authc;
//	}
//
//
//	private void setCookie(String key, String value) {
//		getResponse();
//		Cookie casTokenCookie = new Cookie(key, value);
//		casTokenCookie.setPath("/");
//	    casTokenCookie.setMaxAge(60 * 30);
//		response.addCookie(casTokenCookie);
//	}
//
//	private HttpServletResponse getResponse() {
//		ServletResponse servletResponse = ((WebSubject)SecurityUtils.getSubject()).getServletResponse();
//		response = (HttpServletResponse) servletResponse;
//		return response;
//	}
//}
