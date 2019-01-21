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
import com.youedata.nncloud.modular.nanning.model.UserInfo;
import com.youedata.nncloud.modular.nanning.service.IUserInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMethod;
/**
 * 用户信息控制器
 *
 * @author Monkey
 * @Date 2019-01-21 09:55:01
 */
@Controller
@RequestMapping("/userInfo")
@Api(value = "UserInfo-controller", description = "用户信息")
public class UserInfoController extends BaseController {

    private String PREFIX = "/nanning/userInfo/";

    @Autowired
    private IUserInfoService userInfoService;

    /**
     * 跳转到用户信息首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "userInfo.html";
    }

    /**
     * 跳转到添加用户信息
     */
    @RequestMapping("/userInfo_add")
    public String userInfoAdd() {
        return PREFIX + "userInfo_add.html";
    }

    /**
     * 跳转到修改用户信息
     */
    @RequestMapping(value = "/userInfo_update/{userInfoId}", method = RequestMethod.GET)
    @ApiOperation(value = "编辑用户信息", notes = "编辑用户信息")
    public String userInfoUpdate(@PathVariable Integer userInfoId, Model model) {
        UserInfo userInfo = userInfoService.selectById(userInfoId);
        model.addAttribute("item",userInfo);
        LogObjectHolder.me().set(userInfo);
        return PREFIX + "userInfo_edit.html";
    }

    /**
     * 获取用户信息列表
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "获取用户信息列表", notes = "获取用户信息列表")
    public Object list(String condition) {
        return userInfoService.selectList(null);
    }

    /**
     * 新增用户信息
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "新增用户信息", notes = "新增用户信息")
    public Object add(UserInfo userInfo) {
        userInfoService.insert(userInfo);
        return SUCCESS_TIP;
    }

    /**
     * 删除用户信息
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "删除用户信息", notes = "删除用户信息")
    public Object delete(@RequestParam Integer userInfoId) {
        userInfoService.deleteById(userInfoId);
        return SUCCESS_TIP;
    }

    /**
     * 修改用户信息
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "修改用户信息", notes = "修改用户信息")
    public Object update(UserInfo userInfo) {
        userInfoService.updateById(userInfo);
        return SUCCESS_TIP;
    }

    /**
     * 用户信息详情
     */
    @RequestMapping(value = "/detail/{userInfoId}", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "用户信息详情", notes = "用户信息详情")
    public Object detail(@PathVariable("userInfoId") Integer userInfoId) {
        return userInfoService.selectById(userInfoId);
    }
}
