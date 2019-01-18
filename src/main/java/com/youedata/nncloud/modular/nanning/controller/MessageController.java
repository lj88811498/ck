package com.youedata.nncloud.modular.nanning.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.plugins.Page;
import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.core.constant.Constant;
import com.youedata.nncloud.core.util.JsonUtil;
import com.youedata.nncloud.core.util.RecordLogUtil;
import io.swagger.annotations.ApiParam;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.youedata.nncloud.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.youedata.nncloud.modular.nanning.model.Message;
import com.youedata.nncloud.modular.nanning.service.IMessageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * 消息通知控制器
 *
 * @author monkey
 * @Date 2018-09-13 14:06:25
 */
@Controller
@RequestMapping("/massage")
@Api(value = "Message-controller", description = "消息通知")
public class MessageController extends BaseController {

    private String PREFIX = "/nanning/massage/";

    @Autowired
    private IMessageService massageService;

    /**
     * 跳转到消息通知首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "massage.html";
    }

    /**
     * 跳转到添加消息通知
     */
    @RequestMapping("/massage_add")
    public String massageAdd() {
        return PREFIX + "massage_add.html";
    }

    /**
     * 跳转到修改消息通知
     */
    @RequestMapping(value = "/massage_update/{massageId}", method = RequestMethod.GET)
    //@ApiOperation(value = "编辑消息通知", notes = "编辑消息通知")
    public String massageUpdate(@PathVariable Integer massageId, Model model) {
        Message massage = massageService.selectById(massageId);
        model.addAttribute("item",massage);
        LogObjectHolder.me().set(massage);
        return PREFIX + "massage_edit.html";
    }

    /**
     * 获取消息通知列表
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "获取消息通知列表", notes = "获取消息通知列表")
    public Object list(@ApiParam("用户编号") @RequestParam(value = "messageUserId", defaultValue = "0", required = false) int messageUserId,
                       @ApiParam("当前页条数") @RequestParam(value = "size", defaultValue = "10", required = false) int size,
                       @ApiParam("页数") @RequestParam(value = "curPage", defaultValue = "1", required = false) int curPage) {

        JSONObject js = JsonUtil.createOkJson();

        try {
            Page page = massageService.selectMessages(messageUserId, size, curPage);
            js.put("page", page);
        } catch (Exception e) {
            RecordLogUtil.error(Constant.ERROR_MGS, e);
            js = JsonUtil.createFailJson();
            return js;
        }
        return js;
    }

    /**
     * 新增消息通知
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "新增消息通知", notes = "新增消息通知")
    public Object add(Message massage) {
        massageService.insert(massage);
        return SUCCESS_TIP;
    }

    /**
     * 删除消息通知
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "删除消息通知", notes = "删除消息通知")
    public Object delete(@RequestParam Integer massageId) {
        massageService.deleteById(massageId);
        return SUCCESS_TIP;
    }

    /**
     * 修改消息通知
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "修改消息通知", notes = "修改消息通知")
    public Object update(Message massage) {
        massageService.updateById(massage);
        return SUCCESS_TIP;
    }

    /**
     * 消息通知详情
     */
    @RequestMapping(value = "/detail/{massageId}", method = RequestMethod.GET)
    @ResponseBody
    //@ApiOperation(value = "消息通知详情", notes = "消息通知详情")
    public Object detail(@PathVariable("massageId") Integer massageId) {
        return massageService.selectById(massageId);
    }
}
