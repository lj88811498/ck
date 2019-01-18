package com.youedata.nncloud.modular.system.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.SqlRunner;
import com.baomidou.mybatisplus.plugins.Page;
import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.core.common.annotion.BussinessLog;
import com.youedata.nncloud.core.common.annotion.Permission;
import com.youedata.nncloud.core.common.constant.Const;
import com.youedata.nncloud.core.common.constant.factory.PageFactory;
import com.youedata.nncloud.core.common.constant.state.BizLogType;
import com.youedata.nncloud.core.constant.Constant;
import com.youedata.nncloud.core.support.BeanKit;
import com.youedata.nncloud.core.util.JsonUtil;
import com.youedata.nncloud.core.util.RecordLogUtil;
import com.youedata.nncloud.modular.system.model.OperationLog;
import com.youedata.nncloud.modular.system.service.IOperationLogService;
import com.youedata.nncloud.modular.system.warpper.LogWarpper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 日志管理的控制器
 *
 * @author fengshuonan
 * @Date 2017年4月5日 19:45:36
 */
@Controller
@RequestMapping("/log")
@Api(value = "operationLog-controller", description = "操作日志")
public class LogController extends BaseController {

    private static String PREFIX = "/system/log/";

    @Autowired
    private IOperationLogService operationLogService;

    /**
     * 跳转到日志管理的首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "log.html";
    }

    /**
     * 查询操作日志列表
     */
    @RequestMapping("/list")
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object list(@RequestParam(required = false) String beginTime, @RequestParam(required = false) String endTime, @RequestParam(required = false) String logName, @RequestParam(required = false) Integer logType) {
        Page<OperationLog> page = new PageFactory<OperationLog>().defaultPage();
        List<Map<String, Object>> result = operationLogService.getOperationLogs(page, beginTime, endTime, logName, BizLogType.valueOf(logType), page.getOrderByField(), page.isAsc());
        page.setRecords((List<OperationLog>) new LogWarpper(result).warp());
        return super.packForBT(page);
    }

    /**
     * 查询操作日志详情
     */
    @RequestMapping("/detail/{id}")
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object detail(@PathVariable Integer id) {
        OperationLog operationLog = operationLogService.selectById(id);
        Map<String, Object> stringObjectMap = BeanKit.beanToMap(operationLog);
        return super.warpObject(new LogWarpper(stringObjectMap));
    }

    /**
     * 清空日志
     */
    @BussinessLog(value = "清空业务日志")
    @RequestMapping("/delLog")
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object delLog() {
        SqlRunner.db().delete("delete from sys_operation_log");
        return SUCCESS_TIP;
    }

    /**
     * 获取操作日志列表
     * @param userInfoName
     * @param beginTime
     * @param endTime
     * @param size
     * @param curPage
     * @return
     */
    @PostMapping("/getLogList")
    @ResponseBody
    @ApiOperation("获取操作日志列表")
    public Object getLogList(@ApiParam("账号名称(非必填)") @RequestParam(value = "userInfoName", required = false) String userInfoName,
                             @ApiParam("开始时间(非必填)") @RequestParam(value = "beginTime", required = false) String beginTime,
                             @ApiParam("结束时间(非必填)") @RequestParam(value = "endTime", required = false) String endTime,
                             @ApiParam("当前页条数(非必填)") @RequestParam(value = "size", required = false, defaultValue = "20") int size,
                             @ApiParam("页数(非必填)") @RequestParam(value = "curPage", required = false, defaultValue = "0") int curPage){

        JSONObject jsonResult = JsonUtil.createOkJson();
        Page page = null;
        try {

            boolean tempIsAsc = Boolean.valueOf("asc");
            page = operationLogService.getLogList(userInfoName, beginTime, endTime,null, tempIsAsc, size, curPage);
            jsonResult.put("page", page);
        } catch (Exception e) {
            RecordLogUtil.error(Constant.ERROR_MGS, e);
            jsonResult = JsonUtil.createFailJson();
            return jsonResult;
        }

        return jsonResult;
    }
}
