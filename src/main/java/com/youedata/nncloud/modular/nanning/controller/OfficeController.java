package com.youedata.nncloud.modular.nanning.controller;

import com.alibaba.fastjson.JSONObject;
import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.core.constant.Constant;
import com.youedata.nncloud.core.log.LogObjectHolder;
import com.youedata.nncloud.core.util.JsonUtil;
import com.youedata.nncloud.core.util.RecordLogUtil;
import com.youedata.nncloud.modular.nanning.model.Office;
import com.youedata.nncloud.modular.nanning.service.IOfficeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 科室控制器
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Controller
@RequestMapping("/office")
@Api(value = "Office-controller", description = "科室")
public class OfficeController extends BaseController {

    private String PREFIX = "/nanning/office/";

    @Autowired
    private IOfficeService officeService;

    /**
     * 跳转到科室首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "office.html";
    }

    /**
     * 跳转到添加科室
     */
    @RequestMapping("/office_add")
    public String officeAdd() {
        return PREFIX + "office_add.html";
    }

    /**
     * 跳转到修改科室
     */
    @RequestMapping(value = "/office_update/{officeId}", method = RequestMethod.GET)
    //@ApiOperation(value = "编辑科室", notes = "编辑科室")
    public String officeUpdate(@PathVariable Integer officeId, Model model) {
        Office office = officeService.selectById(officeId);
        model.addAttribute("item", office);
        LogObjectHolder.me().set(office);
        return PREFIX + "office_edit.html";
    }

    /**
     * 获取科室列表
     */
    @RequestMapping(value = "/office_list", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "获取科室列表(完成)", notes = "获取科室列表")
    public Object list() {
        JSONObject js = JsonUtil.createOkJson();

        try {
            List list = officeService.selectList(null);
            js.put("page", list);
        } catch (Exception e) {
            RecordLogUtil.error(Constant.ERROR_MGS, e);
            js = JsonUtil.createFailJson();
            return js;
        }
        return js;
    }

    /**
     * 新增科室
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "新增科室", notes = "新增科室")
    public Object add(Office office) {
        officeService.insert(office);
        return SUCCESS_TIP;
    }

    /**
     * 删除科室
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "删除科室", notes = "删除科室")
    public Object delete(@RequestParam Integer officeId) {
        officeService.deleteById(officeId);
        return SUCCESS_TIP;
    }

    /**
     * 修改科室
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "修改科室", notes = "修改科室")
    public Object update(Office office) {
        officeService.updateById(office);
        return SUCCESS_TIP;
    }

    /**
     * 科室详情
     */
    @RequestMapping(value = "/detail/{officeId}", method = RequestMethod.GET)
    @ResponseBody
    //@ApiOperation(value = "科室详情", notes = "科室详情")
    public Object detail(@PathVariable("officeId") Integer officeId) {
        return officeService.selectById(officeId);
    }
}
