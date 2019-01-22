package com.youedata.nncloud.modular.nanning.controller;

import com.alibaba.fastjson.JSONObject;
import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.core.constant.Constant;
import com.youedata.nncloud.core.log.LogManager;
import com.youedata.nncloud.core.log.factory.LogTaskFactory;
import com.youedata.nncloud.core.support.BeanKit;
import com.youedata.nncloud.core.util.*;
import com.youedata.nncloud.modular.nanning.dao.UserInfoMapper;
import com.youedata.nncloud.modular.system.dao.UserMapper;
import io.swagger.annotations.ApiParam;
import org.apache.commons.lang3.StringUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import com.youedata.nncloud.core.log.LogObjectHolder;
import com.youedata.nncloud.modular.nanning.model.UserInfo;
import com.youedata.nncloud.modular.nanning.service.IUserInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.servlet.http.HttpServletRequest;

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


    @Autowired
    private IUserInfoService userInfoService;
    @Autowired
    private UserInfoMapper userInfoMapper;

    /**
     * 用户登录
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "用户登录", notes = "用户登录")
    public Object add(@ApiParam("用户名(必填)") @RequestParam(value = "userInfoName", required = true) String userInfoName,
                      @ApiParam("密码(必填)") @RequestParam(value = "userinfoPwd", required = true) String userinfoPwd) {
        JSONObject result = JsonUtil.createOkJson();
        try {
            result.put("page", userInfoService.login(userInfoName, userinfoPwd));
            String token = ToolUtil.getRandomString(18);
            GlobalHashMap.addUserToken(token);
            result.put("token", token);
        } catch (Exception e) {
            result = JsonUtil.createFailJson(e.getMessage());
        }
        return result;
    }

    /**
     * 帮助注册
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "帮助注册", notes = "帮助注册")
    public Object add(@ApiParam("当前用户id") @RequestParam(value = "userInfoId", required = true) String userInfoId,
                      @ApiParam("手机号(必填)") @RequestParam(value = "userinfoTel", required = true) String userinfoTel,
                      @ApiParam("微信号(必填)") @RequestParam(value = "userinfoWx", required = true) String userinfoWx,
                      @ApiParam("商家姓名(必填)") @RequestParam(value = "userinfoNickname", required = true) String userinfoNickname,
                      @ApiParam("密码(必填)") @RequestParam(value = "userinfoPwd", required = false) String userinfoPwd) {
        JSONObject result = JsonUtil.createOkJson();
        try {
            userInfoService.addUser(userInfoId, userinfoTel, userinfoWx, userinfoNickname, userinfoPwd);
        } catch (Exception e) {
            result = JsonUtil.createFailJson(e.getMessage());
        }
        return result;
    }

    /**
     * 用户信息详情
     */
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "用户信息详情", notes = "用户信息详情")
    public Object detail(@ApiParam("手机号(必填)") @RequestParam(value = "userinfoTel", required = true) String userinfoTel) {
        JSONObject result = JsonUtil.createOkJson();
        try {
            result.put("page", userInfoMapper.selectByTel(userinfoTel));
        } catch (Exception e) {
            result = JsonUtil.createFailJson(e.getMessage());
        }
        return result;
    }

    /**
     * 修改密码
     */
    @RequestMapping(value = "/changePwd", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "修改密码", notes = "修改密码")
    public Object changePwd(@ApiParam("当前用户id(必填)") @RequestParam(value = "userInfoId", required = true) String userInfoId,
                            @ApiParam("旧密码") @RequestParam(value = "oldPassord", required = true) String oldPassord,
                            @ApiParam("新密码") @RequestParam(value = "newPassord", required = true) String newPassord) {
        JSONObject result = JsonUtil.createOkJson();
        try {
            userInfoService.changePwd(userInfoId, oldPassord, newPassord);
        } catch (Exception e) {
            result = JsonUtil.createFailJson(e.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/clearToken", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "清理token", notes = "清理token")
    public Object clearToken() {

        JSONObject js = JsonUtil.createOkJson();
        try {
            GlobalHashMap.clear();
        } catch (Exception e) {
            RecordLogUtil.error(e.getMessage());
            js = JsonUtil.createFailJson();
        }

        return js;
    }

}
