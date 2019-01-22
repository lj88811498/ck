package com.youedata.nncloud.modular.nanning.controller;

import com.alibaba.fastjson.JSONObject;
import com.youedata.nncloud.core.base.controller.BaseController;
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
import com.youedata.nncloud.modular.nanning.model.Upgrade;
import com.youedata.nncloud.modular.nanning.service.IUpgradeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMethod;
/**
 * 升级表控制器
 *
 * @author Monkey
 * @Date 2019-01-21 20:53:59
 */
@Controller
@RequestMapping("/upgrade")
@Api(value = "Upgrade-controller", description = "升级表")
public class UpgradeController extends BaseController {

    private String PREFIX = "/nanning/upgrade/";

    @Autowired
    private IUpgradeService upgradeService;

    /**
     * 跳转到升级表首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "upgrade.html";
    }

    /**
     * 跳转到添加升级表
     */
    @RequestMapping("/upgrade_add")
    public String upgradeAdd() {
        return PREFIX + "upgrade_add.html";
    }

    /**
     * 跳转到修改升级表
     */
    @RequestMapping(value = "/upgrade_update/{upgradeId}", method = RequestMethod.GET)
    @ApiOperation(value = "编辑升级表", notes = "编辑升级表")
    public String upgradeUpdate(@PathVariable Integer upgradeId, Model model) {
        Upgrade upgrade = upgradeService.selectById(upgradeId);
        model.addAttribute("item",upgrade);
        LogObjectHolder.me().set(upgrade);
        return PREFIX + "upgrade_edit.html";
    }

    /**
     * 获取升级表列表
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "获取升级表列表", notes = "获取升级表列表")
    public Object list(String condition) {
        return upgradeService.selectList(null);
    }

    /**
     * 新增升级表
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "新增升级表", notes = "新增升级表")
    public Object add(@ApiParam("当前用户id(必填)") @RequestParam(value = "userInfoId", required = true) int userInfoId) {
        JSONObject js = JsonUtil.createOkJson();
        try {
            upgradeService.add(userInfoId);

        } catch (Exception e) {
            RecordLogUtil.error(e.getMessage());
            js = JsonUtil.createFailJson(e.getMessage());
        }
        return js;
    }

    /**
     * 删除升级表
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "删除升级表", notes = "删除升级表")
    public Object delete(@RequestParam Integer upgradeId) {
        upgradeService.deleteById(upgradeId);
        return SUCCESS_TIP;
    }

    /**
     * 修改升级表
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "修改升级表", notes = "修改升级表")
    public Object update(Upgrade upgrade) {
        upgradeService.updateById(upgrade);
        return SUCCESS_TIP;
    }

    /**
     * 升级表详情
     */
    @RequestMapping(value = "/detail/{upgradeId}", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "升级表详情", notes = "升级表详情")
    public Object detail(@PathVariable("upgradeId") Integer upgradeId) {
        return upgradeService.selectById(upgradeId);
    }
}
