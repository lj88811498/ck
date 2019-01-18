package com.youedata.nncloud.modular.nanning.controller;

import com.alibaba.fastjson.JSONObject;
import com.youedata.nncloud.config.properties.GunsProperties;
import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.core.util.JsonUtil;
import com.youedata.nncloud.core.util.RecordLogUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 获取图片服务器的地址
 * @Author: Monkey
 * @Date: Created in 16:01  2018/3/29.
 * @Description:
 */
@Controller
@RequestMapping("")
@Api(value = "httpd-server-controller", description = "获取图片服务器的地址")
public class HttpdServerController extends BaseController {

    @Autowired
    private GunsProperties gunsProperties;

    @ApiOperation(value = "获取图片服务器的地址", notes = "获取图片服务器的地址")
    @RequestMapping(value = "/serverPath", method = RequestMethod.GET)
    @ResponseBody
    public Object getHttpdServerPath() {
        JSONObject js = JsonUtil.createOkJson();
        try {
            String serverPath = gunsProperties.getFileServerPath();
            if (StringUtils.isNotBlank(serverPath)) {
                js.put("serverPath", serverPath);
            } else {
                js = JsonUtil.createFailJson();
                RecordLogUtil.error("获取图片服务器地址失败！", new Exception("获取图片服务器地址失败！"));
            }
        } catch (Exception e) {
            js = JsonUtil.createFailJson();
        }
        return js;
    }

    @ApiOperation(value = "获取地图地址", notes = "获取地图地址")
    @RequestMapping(value = "/mapServerPath", method = RequestMethod.GET)
    @ResponseBody
    public Object getMapServerPath() {
        JSONObject js = JsonUtil.createOkJson();
        try {
            String mapServerPath = gunsProperties.getMapServerPath();
            if (StringUtils.isNotBlank(mapServerPath)) {
                js.put("mapServerPath", mapServerPath);
            } else {
                js = JsonUtil.createFailJson();
                RecordLogUtil.error("获取地图地址失败！", new Exception("获取地图地址失败！"));
            }
        } catch (Exception e) {
            js = JsonUtil.createFailJson();
        }
        return js;
    }
}
