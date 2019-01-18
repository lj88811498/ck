package com.youedata.nncloud.modular.nanning.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.plugins.Page;
import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.core.constant.Constant;
import com.youedata.nncloud.core.log.LogObjectHolder;
import com.youedata.nncloud.core.util.JsonUtil;
import com.youedata.nncloud.core.util.RecordLogUtil;
import com.youedata.nncloud.modular.nanning.model.Question;
import com.youedata.nncloud.modular.nanning.service.IOfficeService;
import com.youedata.nncloud.modular.nanning.service.IQuestionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


/**
 * 问题反馈控制器
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Controller
@RequestMapping("/question")
@Api(value = "Question-controller", description = "问题反馈")
public class QuestionController extends BaseController {

    private String PREFIX = "/nanning/question/";

    @Autowired
    private IQuestionService questionService;
    @Autowired
    private IOfficeService officeService;
    /**
     * 跳转到问题反馈首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "question.html";
    }

    /**
     * 跳转到添加问题反馈
     */
    @RequestMapping("/question_add")
    public String questionAdd() {
        return PREFIX + "question_add.html";
    }

    /**
     * 跳转到修改问题反馈
     */
    @RequestMapping(value = "/question_update/{questionId}", method = RequestMethod.GET)
//    @ApiOperation(value = "编辑问题反馈", notes = "编辑问题反馈")
    public String questionUpdate(@PathVariable Integer questionId, Model model) {
        Question question = questionService.selectById(questionId);
        model.addAttribute("item",question);
        LogObjectHolder.me().set(question);
        return PREFIX + "question_edit.html";
    }

    /**
     * 获取问题反馈列表
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "企业端-获取问题反馈列表（完成）", notes = "企业端-获取问题反馈列表")
    public Object list(@ApiParam("用户id")@RequestParam(name = "userId", required = true) int userId,
                       @ApiParam("排序字段")@RequestParam(name = "orderByField", required = false) String orderByField,
                       @ApiParam("顺序")@RequestParam(value = "isAsc", required = false, defaultValue = "false") boolean isAsc,
                       @ApiParam("当前页条数")@RequestParam(value = "size", required = false, defaultValue = "20") int size,
                       @ApiParam("页数")@RequestParam(value = "curPage", required = false, defaultValue = "0") int curPage) {
        JSONObject jsonResult = JsonUtil.createOkJson();
        Page page = null;
        try{
            boolean tempIsAsc = Boolean.valueOf(isAsc);
            page = questionService.getListByUserId(userId,orderByField, tempIsAsc, size, curPage);
            jsonResult.put("page", page);
        } catch (Exception e){
            RecordLogUtil.error(Constant.ERROR_MGS, e);
            jsonResult = JsonUtil.createFailJson();
            return  jsonResult;
        }

        return jsonResult;
    }
    /**
     * 获取问题反馈列表
     */
    @RequestMapping(value = "/listOrg", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "政府端-获取问题反馈列表（完成）", notes = "政府端-获取问题反馈列表")
    public Object list(@ApiParam("问题状态(0.待处理,1.处理中,2.已处理)")@RequestParam(name = "progress", required = true) String progress,
                       @ApiParam("排序字段")@RequestParam(name = "orderByField", defaultValue = "",required = false) String orderByField,
                       @ApiParam("顺序")@RequestParam(value = "isAsc", required = false, defaultValue = "false") boolean isAsc,
                       @ApiParam("当前页条数")@RequestParam(value = "size", required = false, defaultValue = "10") int size,
                       @ApiParam("页数")@RequestParam(value = "curPage", required = false, defaultValue = "0") int curPage) {
        JSONObject jsonResult = JsonUtil.createOkJson();
        Page page = null;
        try{
            boolean tempIsAsc = Boolean.valueOf(isAsc);
            page = questionService.getListByProgress(progress, orderByField, tempIsAsc, size, curPage);
            jsonResult.put("page", page);
        } catch (Exception e){
            RecordLogUtil.error(Constant.ERROR_MGS, e);
            jsonResult = JsonUtil.createFailJson();
            return  jsonResult;
        }

        return jsonResult;
    }

    /**
     * 新增问题反馈
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "新增问题反馈(完成)", notes = "新增问题反馈")
    public Object add(@ApiParam("用户Id") @RequestParam(value = "userId") int userId,@ApiParam("用户名") @RequestParam(value = "userName") String userName,
                      @ApiParam("标题") @RequestParam(value = "questionTitle") String questionTitle, @ApiParam("内容") @RequestParam(value = "questionContent") String questionContent,
                      @ApiParam("问题类型:1咨询,2投诉,3建议") @RequestParam(value = "questionType") String questionType,@ApiParam("隐私设置:1公开该问题,2仅自己可见") @RequestParam(value = "questionPrivilege") String questionPrivilege,
                      @ApiParam("所属科室") @RequestParam(value = "officeName") String officeName,@ApiParam("反馈编号") @RequestParam(value = "questionCode") String questionCode) {
        JSONObject js = JsonUtil.createOkJson();
        try {
            Question question = new Question();
            question.setQuestionUserId(userId);
            question.setQuestionUserName(userName);
            question.setQuestionTitle(questionTitle);
            question.setQuestionContent(questionContent);
            question.setQuestionType(questionType);
            question.setQuestionPrivilege(questionPrivilege);
            question.setQuestionOfficeName(officeName);
            question.setQuestionCode(questionCode);
            question.setQuestionCreateBy(userId);
            question.setQuestionPid(0);
            question.setQuestionProgress("0");

            Integer officeId = officeService.selectOfficeByName(question.getQuestionOfficeName());
            question.setQuestionOfficeId(officeId);
            questionService.insert(question);
        } catch (Exception e) {
            RecordLogUtil.error(Constant.ERROR_MGS, e);
            js = JsonUtil.createFailJson();
            return  js;
        }
        return js;
    }

    /**
     * 删除问题反馈
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
//    @ApiOperation(value = "删除问题反馈", notes = "删除问题反馈")
    public Object delete(@RequestParam Integer questionId) {
        questionService.deleteById(questionId);
        return SUCCESS_TIP;
    }

    /**
     * 审核、受理、转交、自行答复等通用接口
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "审核、受理、转交、自行答复等通用接口(完成)", notes = "审核、受理、转交、自行答复等通用接口")
    public Object update(@ApiParam("问题编号") @RequestParam(value = "questionId", required = true) int questionId,
                         @ApiParam("回复用户编号") @RequestParam(value = "answerQuestionUserId", required = true) int answerQuestionUserId,
                         @ApiParam("部门编号（非必须）") @RequestParam(value = "questionOfficeId", required = false) int questionOfficeId,
                         @ApiParam("问题进度：0待审核,1等待受理，2已受理，3已转交相关部门，4自行解答，5等待用户确认,6等待用户评价,7已评价,8已关闭,9审核未通过,10删除")
                         @RequestParam(value = "questionProgress", required = true) String questionProgress,
                         @ApiParam("审核失败原因（审核失败时必填）") @RequestParam(value = "questionErrorMsg", defaultValue = "", required = false) String questionErrorMsg) {
        JSONObject js = JsonUtil.createOkJson();
        try {
            questionService.update(questionId, answerQuestionUserId, questionOfficeId, questionProgress, questionErrorMsg);
        } catch (Exception e) {
            String msg = e.getMessage();
            if (StringUtils.isBlank(msg)) {
                msg = Constant.ERROR_MGS;
            }
            RecordLogUtil.error(msg + "入参：questionId=" + questionId + ",questionProgress=" + questionProgress);
            js = JsonUtil.createFailJson(msg);
            return  js;
        }
        return js;
    }

    /**
     * 问题反馈详情
     */
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "问题反馈详情(完成)", notes = "问题反馈详情")
    public Object detail(@ApiParam("问题id") @RequestParam(value = "questionId") Integer questionId) {
        JSONObject jsonObject = JsonUtil.createOkJson();
        try{
            Page page = questionService.getById(questionId);
            jsonObject.put("page", page);
        } catch(Exception e){
            RecordLogUtil.error(Constant.ERROR_MGS, e);
            jsonObject = JsonUtil.createFailJson();
            return  jsonObject;
        }

        return jsonObject;
    }

    /**
     * 问题留言
     */
    @RequestMapping(value = "/board", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "问题留言(完成)", notes = "问题留言")
    public Object board(@ApiParam("上传图片（可以多个，以相同key即可）") @RequestParam(value = "file", defaultValue = ValueConstants.DEFAULT_NONE, required = false) MultipartFile[] file,
                        @ApiParam("问题编号") @RequestParam(value = "questionId", defaultValue = "0", required = true) int questionId,
                        @ApiParam("用户编号") @RequestParam(value = "questionUserId", defaultValue = "0", required = true) int questionUserId,
                        @ApiParam("用户名称") @RequestParam(value = "questionUserName", defaultValue = "", required = true) String questionUserName,
                        @ApiParam("留言内容") @RequestParam(value = "questionContent", defaultValue = "", required = true) String questionContent) {
        JSONObject js = JsonUtil.createOkJson();
        try {
            questionService.addQuestionBoard(file, questionId, questionUserId, questionUserName, questionContent);
        } catch (Exception e) {
            RecordLogUtil.error(Constant.ERROR_MGS, e);
            js = JsonUtil.createFailJson();
            return js;
        }
        return js;
    }


}
