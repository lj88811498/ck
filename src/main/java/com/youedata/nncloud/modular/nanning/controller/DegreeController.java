package com.youedata.nncloud.modular.nanning.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.plugins.Page;
import com.mysql.fabric.xmlrpc.base.Data;
import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.core.constant.Constant;
import com.youedata.nncloud.core.util.JsonUtil;
import com.youedata.nncloud.core.util.RecordLogUtil;
import com.youedata.nncloud.modular.nanning.model.vo.DegreeVo;
import com.youedata.nncloud.modular.nanning.model.vo.QuestionVo;
import com.youedata.nncloud.modular.nanning.service.IQuestionService;
import io.swagger.annotations.ApiParam;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import com.youedata.nncloud.core.log.LogObjectHolder;
import com.youedata.nncloud.modular.nanning.model.Degree;
import com.youedata.nncloud.modular.nanning.service.IDegreeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * 满意度控制器
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Controller
@RequestMapping("/degree")
@Api(value = "Degree-controller", description = "政府端-主页-营商服务分析")
public class DegreeController extends BaseController {

    private String PREFIX = "/nanning/degree/";

    @Autowired
    private IDegreeService degreeService;
    @Autowired
    private IQuestionService questionService;

    /**
     * 跳转到满意度首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "degree.html";
    }

    /**
     * 跳转到添加满意度
     */
    @RequestMapping("/degree_add")
    public String degreeAdd() {
        return PREFIX + "degree_add.html";
    }

    /**
     * 跳转到修改满意度
     */
    @RequestMapping(value = "/degree_update/{degreeId}", method = RequestMethod.GET)
//    @ApiOperation(value = "编辑满意度", notes = "编辑满意度")
    public String degreeUpdate(@PathVariable Integer degreeId, Model model) {
        Degree degree = degreeService.selectById(degreeId);
        model.addAttribute("item",degree);
        LogObjectHolder.me().set(degree);
        return PREFIX + "degree_edit.html";
    }

    /**
     * 获取满意度列表
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "营商服务分析（完成）", notes = "营商服务分析")
    public Object list(@ApiParam("查询时间，例如：09") @RequestParam("date")String date) {
        JSONObject jsonObject = JsonUtil.createOkJson();
        try{
            Page page = new Page();
            //日期拼装
            Calendar nowday = Calendar.getInstance();
            String year = String.valueOf(nowday.get(Calendar.YEAR));
            date = year + "-" + date;

            int monthCount = questionService.getMonthCount(date);//当月问题数
            int monthSolveCount = questionService.getMonthSolveCount(date);//当月问题解决数
            int mainAvg = degreeService.getMainAvg(date);//整体满意度
            int answerAvg = degreeService.getAnswerAvg(date);//客服回复满意度
            int workAvg = degreeService.getWorkAvg(date);//客服工作态度满意度
            double solveDayAvg = questionService.getSolveDayAvg(date);//问题解决平均天数
            List<QuestionVo> sortList = questionService.getOfficeSort(date);//委办局解决问题排序
            //结果集封装
            DegreeVo degreeVo = new DegreeVo();
            degreeVo.setMonthCount(monthCount);
            degreeVo.setMonthSolveCount(monthSolveCount);
            degreeVo.setMainAvg(mainAvg);
            degreeVo.setAnswerAvg(answerAvg);
            degreeVo.setWorkAvg(workAvg);
            degreeVo.setSolveDayAvg(solveDayAvg);
            degreeVo.setSortList(sortList);
            List<DegreeVo> degreeVoList = new ArrayList<>();
            degreeVoList.add(degreeVo);
            page.setRecords(degreeVoList);

            jsonObject.put("page", page);
        } catch(Exception e){
            RecordLogUtil.error(Constant.ERROR_MGS, e);
            jsonObject = JsonUtil.createFailJson();
            return  jsonObject;
        }
        return jsonObject;
    }

    /**
     * 新增满意度
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "新增满意度(完成)", notes = "新增满意度")
    public Object add(@ApiParam("问题编号id") @RequestParam("degreeQuestionId") int degreeQuestionId,
                      @ApiParam("用户编号") @RequestParam("degreeUserId") int degreeUserId,
                      @ApiParam("整体满意度1-5") @RequestParam("degreeMain") String degreeMain,
                      @ApiParam("客服回复满意度1-5") @RequestParam("degreeAnswer") String degreeAnswer,
                      @ApiParam("客服工作态度满意度1-5") @RequestParam("degreeWork") String degreeWork,
                      @ApiParam("委办局满意度1-5") @RequestParam("degreeOffice") String degreeOffice
                      ) {

        JSONObject js = JsonUtil.createOkJson();

        try {

            Degree degree = new Degree(degreeQuestionId, degreeUserId, degreeMain, degreeAnswer, degreeWork, degreeOffice);
            degreeService.insert(degree);

        } catch (Exception e) {
            RecordLogUtil.error(Constant.ERROR_MGS, e);
            js = JsonUtil.createFailJson();
            return  js;
        }
        return js;
    }

    /**
     * 删除满意度
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
//    @ApiOperation(value = "删除满意度", notes = "删除满意度")
    public Object delete(@RequestParam Integer degreeId) {
        degreeService.deleteById(degreeId);
        return SUCCESS_TIP;
    }

    /**
     * 修改满意度
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
//    @ApiOperation(value = "修改满意度", notes = "修改满意度")
    public Object update(Degree degree) {
        degreeService.updateById(degree);
        return SUCCESS_TIP;
    }

    /**
     * 满意度详情
     */
    @RequestMapping(value = "/detail/{degreeId}", method = RequestMethod.GET)
    @ResponseBody
//    @ApiOperation(value = "满意度详情", notes = "满意度详情")
    public Object detail(@PathVariable("degreeId") Integer degreeId) {
        return degreeService.selectById(degreeId);
    }
}
