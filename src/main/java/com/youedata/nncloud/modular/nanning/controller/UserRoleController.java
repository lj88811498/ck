package com.youedata.nncloud.modular.nanning.controller;

import com.youedata.nncloud.core.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.youedata.nncloud.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.youedata.nncloud.modular.nanning.model.UserRole;
import com.youedata.nncloud.modular.nanning.service.IUserRoleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMethod;
/**
 * 用户角色控制器
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Controller
@RequestMapping("/userRole")
//@Api(value = "UserRole-controller", description = "用户角色")
public class UserRoleController extends BaseController {

    private String PREFIX = "/nanning/userRole/";

    @Autowired
    private IUserRoleService userRoleService;

    /**
     * 跳转到用户角色首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "userRole.html";
    }

    /**
     * 跳转到添加用户角色
     */
    @RequestMapping("/userRole_add")
    public String userRoleAdd() {
        return PREFIX + "userRole_add.html";
    }

    /**
     * 跳转到修改用户角色
     */
    @RequestMapping(value = "/userRole_update/{userRoleId}", method = RequestMethod.GET)
    //@ApiOperation(value = "编辑用户角色", notes = "编辑用户角色")
    public String userRoleUpdate(@PathVariable Integer userRoleId, Model model) {
        UserRole userRole = userRoleService.selectById(userRoleId);
        model.addAttribute("item",userRole);
        LogObjectHolder.me().set(userRole);
        return PREFIX + "userRole_edit.html";
    }

    /**
     * 获取用户角色列表
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    //@ApiOperation(value = "获取用户角色列表", notes = "获取用户角色列表")
    public Object list(String condition) {
        return userRoleService.selectList(null);
    }

    /**
     * 新增用户角色
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "新增用户角色", notes = "新增用户角色")
    public Object add(UserRole userRole) {
        userRoleService.insert(userRole);
        return SUCCESS_TIP;
    }

    /**
     * 删除用户角色
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "删除用户角色", notes = "删除用户角色")
    public Object delete(@RequestParam Integer userRoleId) {
        userRoleService.deleteById(userRoleId);
        return SUCCESS_TIP;
    }

    /**
     * 修改用户角色
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "修改用户角色", notes = "修改用户角色")
    public Object update(UserRole userRole) {
        userRoleService.updateById(userRole);
        return SUCCESS_TIP;
    }

    /**
     * 用户角色详情
     */
    @RequestMapping(value = "/detail/{userRoleId}", method = RequestMethod.GET)
    @ResponseBody
    //@ApiOperation(value = "用户角色详情", notes = "用户角色详情")
    public Object detail(@PathVariable("userRoleId") Integer userRoleId) {
        return userRoleService.selectById(userRoleId);
    }
}
