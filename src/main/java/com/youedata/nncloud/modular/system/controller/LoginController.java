package com.youedata.nncloud.modular.system.controller;

import com.google.code.kaptcha.Constants;
import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.core.common.exception.InvalidKaptchaException;
import com.youedata.nncloud.core.log.LogManager;
import com.youedata.nncloud.core.log.factory.LogTaskFactory;
import com.youedata.nncloud.core.node.MenuNode;
import com.youedata.nncloud.core.shiro.ShiroKit;
import com.youedata.nncloud.core.shiro.ShiroUser;
import com.youedata.nncloud.core.util.ApiMenuFilter;
import com.youedata.nncloud.core.util.KaptchaUtil;
import com.youedata.nncloud.core.util.ToolUtil;
import com.youedata.nncloud.modular.system.dao.SysRoleMapper;
import com.youedata.nncloud.modular.system.model.User;
import com.youedata.nncloud.modular.system.service.IMenuService;
import com.youedata.nncloud.modular.system.service.IRoleService;
import com.youedata.nncloud.modular.system.service.IUserService;
import com.youedata.nncloud.modular.system.warpper.RoleWarpper;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Map;

import static com.youedata.nncloud.core.support.HttpKit.getIp;

/**
 * 登录控制器
 *
 * @author fengshuonan
 * @Date 2017年1月10日 下午8:25:24
 */
@Controller
public class LoginController extends BaseController {

    @Autowired
    private IMenuService menuService;

    @Autowired
    private IUserService userService;

    @Autowired
    private SysRoleMapper roleWarpper;

//    @Autowired
//    private UserInfoMapper userInfoMapper;
    /**
     * 跳转到主页
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model) {
        try {
            autoLogin();
            List<Integer> roleList = roleWarpper.selectAllRoleIds();
            //获取菜单列表
//            List<Integer> roleList = ShiroKit.getUser().getRoleList();
            if (roleList == null || roleList.size() == 0) {
                ShiroKit.getSubject().logout();
                model.addAttribute("tips", "该用户没有角色，无法登陆");
                return "/login.html";
            }
            List<MenuNode> menus = menuService.selectAll();
//            List<MenuNode> menus = menuService.getMenusByRoleIds(roleList);
            List<MenuNode> titles = MenuNode.buildTitle(menus);
            titles = ApiMenuFilter.build(titles);

            model.addAttribute("titles", titles);

            //获取用户头像
            Integer id = 1;
            User user = userService.selectById(id);
            String avatar = user.getAvatar();
            model.addAttribute("avatar", avatar);
//        userInfoMapper.updateAgeByCurrentTime();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "/index.html";
    }

    /**
     * 跳转到登录页面
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        autoLogin();
        if (ShiroKit.isAuthenticated() || ShiroKit.getUser() != null) {
            return REDIRECT + "/";
        } else {
            return "/login.html";
        }
    }
    /**
     * 自动登陆
     * @Author: Monkey
     * @Param: []
     * @Date: Created in  2018/3/27 10:19.
     * @Returns void
     */

    private void autoLogin () {
        String username = "admin";
        String password = "111111";
        String remember = "on";
        Subject currentUser = ShiroKit.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password.toCharArray());

        if ("on".equals(remember)) {
            token.setRememberMe(true);
        } else {
            token.setRememberMe(false);
        }

        currentUser.login(token);

        ShiroUser shiroUser = ShiroKit.getUser();
        super.getSession().setAttribute("shiroUser", shiroUser);
        super.getSession().setAttribute("username", shiroUser.getAccount());

        LogManager.me().executeLog(LogTaskFactory.loginLog(shiroUser.getId(), getIp()));

        ShiroKit.getSession().setAttribute("sessionFlag", true);

    }



    /**
     * 点击登录执行的动作
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String loginVali() {

        String username = super.getPara("username").trim();
        String password = super.getPara("password").trim();
        String remember = super.getPara("remember");

        //验证验证码是否正确
        if (KaptchaUtil.getKaptchaOnOff()) {
            String kaptcha = super.getPara("kaptcha").trim();
            String code = (String) super.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
            if (ToolUtil.isEmpty(kaptcha) || !kaptcha.equalsIgnoreCase(code)) {
                throw new InvalidKaptchaException();
            }
        }

        Subject currentUser = ShiroKit.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password.toCharArray());

        if ("on".equals(remember)) {
            token.setRememberMe(true);
        } else {
            token.setRememberMe(false);
        }

        try {
            currentUser.login(token);
        } catch (Exception e) {
            return REDIRECT + "/login.html";
        }


        ShiroUser shiroUser = ShiroKit.getUser();
        super.getSession().setAttribute("shiroUser", shiroUser);
        super.getSession().setAttribute("username", shiroUser.getAccount());

        LogManager.me().executeLog(LogTaskFactory.loginLog(shiroUser.getId(), getIp()));

        ShiroKit.getSession().setAttribute("sessionFlag", true);

        return REDIRECT + "/";
    }

    /**
     * 退出登录
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logOut() {
        LogManager.me().executeLog(LogTaskFactory.exitLog(ShiroKit.getUser().getId(), getIp()));
        ShiroKit.getSubject().logout();
        return REDIRECT + "/login";
    }
}
