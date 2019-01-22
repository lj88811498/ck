package com.youedata.nncloud.modular.nanning.controller;

import com.alibaba.fastjson.JSONObject;
import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.core.common.annotion.CkLog;
import com.youedata.nncloud.core.util.GlobalHashMap;
import com.youedata.nncloud.core.util.JsonUtil;
import com.youedata.nncloud.core.util.RecordLogUtil;
import com.youedata.nncloud.core.util.ToolUtil;
import com.youedata.nncloud.modular.nanning.dao.UserInfoMapper;
import com.youedata.nncloud.modular.nanning.service.IUserInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @CkLog(userId = "userInfoId", operation = "注册了", target = "", desc = "注册了新用户", key = "")
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "test", notes = "test")
    public Object test(@ApiParam("用户id") @RequestParam(value = "userInfoId", required = true) int userInfoId,
                       @ApiParam("目标id") @RequestParam(value = "targetId", required = true)int targetId){

        return JsonUtil.createOkJson(userInfoId + "~~~~" + targetId);
    }

}
