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
import com.youedata.nncloud.modular.nanning.model.Dept;
import com.youedata.nncloud.modular.nanning.service.IDeptService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMethod;
/**
 * 部门信息控制器
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Controller
@RequestMapping("/userDept")
//@Api(value = "Dept-controller", description = "部门信息")
public class DeptController extends BaseController {

    private String PREFIX = "/nanning/dept/";

    @Autowired
    private IDeptService deptService;

    /**
     * 跳转到部门信息首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "dept.html";
    }

    /**
     * 跳转到添加部门信息
     */
    @RequestMapping("/dept_add")
    public String deptAdd() {
        return PREFIX + "dept_add.html";
    }

    /**
     * 跳转到修改部门信息
     */
    @RequestMapping(value = "/dept_update/{deptId}", method = RequestMethod.GET)
    //@ApiOperation(value = "编辑部门信息", notes = "编辑部门信息")
    public String deptUpdate(@PathVariable Integer deptId, Model model) {
        Dept dept = deptService.selectById(deptId);
        model.addAttribute("item",dept);
        LogObjectHolder.me().set(dept);
        return PREFIX + "dept_edit.html";
    }

    /**
     * 获取部门信息列表
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    //@ApiOperation(value = "获取部门信息列表", notes = "获取部门信息列表")
    public Object list(String condition) {
        return deptService.selectList(null);
    }

    /**
     * 新增部门信息
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "新增部门信息", notes = "新增部门信息")
    public Object add(Dept dept) {
        deptService.insert(dept);
        return SUCCESS_TIP;
    }

    /**
     * 删除部门信息
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "删除部门信息", notes = "删除部门信息")
    public Object delete(@RequestParam Integer deptId) {
        deptService.deleteById(deptId);
        return SUCCESS_TIP;
    }

    /**
     * 修改部门信息
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "修改部门信息", notes = "修改部门信息")
    public Object update(Dept dept) {
        deptService.updateById(dept);
        return SUCCESS_TIP;
    }

    /**
     * 部门信息详情
     */
    @RequestMapping(value = "/detail/{deptId}", method = RequestMethod.GET)
    @ResponseBody
    //@ApiOperation(value = "部门信息详情", notes = "部门信息详情")
    public Object detail(@PathVariable("deptId") Integer deptId) {
        return deptService.selectById(deptId);
    }
}
