package com.youedata.nncloud.modular.nanning.controller;

import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.modular.nanning.model.Role;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.youedata.nncloud.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.youedata.nncloud.modular.nanning.service.IRoleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMethod;
/**
 * 角色信息控制器
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Controller
@RequestMapping("/role")
//@Api(value = "Role-controller", description = "角色信息")
public class RoleController extends BaseController {

    private String PREFIX = "/nanning/role/";

    @Autowired
    private IRoleService roleService;

    /**
     * 跳转到角色信息首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "role.html";
    }

    /**
     * 跳转到添加角色信息
     */
    @RequestMapping("/role_add")
    public String roleAdd() {
        return PREFIX + "role_add.html";
    }

    /**
     * 跳转到修改角色信息
     */
    @RequestMapping(value = "/role_update/{roleId}", method = RequestMethod.GET)
    //@ApiOperation(value = "编辑角色信息", notes = "编辑角色信息")
    public String roleUpdate(@PathVariable Integer roleId, Model model) {
        Role role = roleService.selectById(roleId);
        model.addAttribute("item",role);
        LogObjectHolder.me().set(role);
        return PREFIX + "role_edit.html";
    }

    /**
     * 获取角色信息列表
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    //@ApiOperation(value = "获取角色信息列表", notes = "获取角色信息列表")
    public Object list(String condition) {
        return roleService.selectList(null);
    }

    /**
     * 新增角色信息
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "新增角色信息", notes = "新增角色信息")
    public Object add(Role role) {
        roleService.insert(role);
        return SUCCESS_TIP;
    }

    /**
     * 删除角色信息
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "删除角色信息", notes = "删除角色信息")
    public Object delete(@RequestParam Integer roleId) {
        roleService.deleteById(roleId);
        return SUCCESS_TIP;
    }

    /**
     * 修改角色信息
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "修改角色信息", notes = "修改角色信息")
    public Object update(Role role) {
        roleService.updateById(role);
        return SUCCESS_TIP;
    }

    /**
     * 角色信息详情
     */
    @RequestMapping(value = "/detail/{roleId}", method = RequestMethod.GET)
    @ResponseBody
    //@ApiOperation(value = "角色信息详情", notes = "角色信息详情")
    public Object detail(@PathVariable("roleId") Integer roleId) {
        return roleService.selectById(roleId);
    }
}
