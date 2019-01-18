package com.youedata.nncloud.modular.nanning.controller;

import com.alibaba.fastjson.JSONObject;
import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.core.constant.Constant;
import com.youedata.nncloud.core.util.JsonUtil;
import com.youedata.nncloud.core.util.RecordLogUtil;
import com.youedata.nncloud.modular.nanning.model.Question;
import com.youedata.nncloud.modular.nanning.service.IQuestionService;
import io.swagger.annotations.ApiParam;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.youedata.nncloud.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.youedata.nncloud.modular.nanning.model.Collet;
import com.youedata.nncloud.modular.nanning.service.IColletService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMethod;
/**
 * 收藏控制器
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Controller
@RequestMapping("/collet")
@Api(value = "Collet-controller", description = "企业端-营商环境-公开问题-收藏")
public class ColletController extends BaseController {

    private String PREFIX = "/nanning/collet/";

    @Autowired
    private IColletService colletService;

    @Autowired
    private IQuestionService questionService;

    /**
     * 跳转到收藏首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "collet.html";
    }

    /**
     * 跳转到添加收藏
     */
    @RequestMapping("/collet_add")
    public String colletAdd() {
        return PREFIX + "collet_add.html";
    }

    /**
     * 跳转到修改收藏
     */
    @RequestMapping(value = "/collet_update/{colletId}", method = RequestMethod.GET)
//    @ApiOperation(value = "编辑收藏", notes = "编辑收藏")
    public String colletUpdate(@PathVariable Integer colletId, Model model) {
        Collet collet = colletService.selectById(colletId);
        model.addAttribute("item",collet);
        LogObjectHolder.me().set(collet);
        return PREFIX + "collet_edit.html";
    }

    /**
     * 获取收藏列表
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
//    @ApiOperation(value = "获取收藏列表", notes = "获取收藏列表")
    public Object list(String condition) {
        return colletService.selectList(null);
    }

    /**
     * 新增收藏
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "新增/取消 收藏（完成）", notes = "新增/取消 收藏")
    public Object add(@ApiParam("用户Id") @RequestParam(value = "userId") int userId,
                      @ApiParam("问题Id") @RequestParam(value = "questionId") int questionId) {
        JSONObject jsonObject = JsonUtil.createOkJson();
        try{
            Collet collet = new Collet();
            collet.setColletUserId(userId);
            collet.setColletQuestionId(questionId);

            Question question = new Question();
            question.setQuestionId(questionId);
            //查询收藏是否存在
            Collet collet2 = colletService.getByQuestionId(questionId);
            if(collet2 == null){
                colletService.insert(collet);
//                //更新问题收藏状态
//                question.setQuestionCollet("1");
//                questionService.updateById(question);
            } else{
                colletService.deleteByQuestionId(questionId);
//                //更新问题收藏状态
//                question.setQuestionCollet("0");
//                questionService.updateById(question);
            }


        } catch (Exception e){
            RecordLogUtil.error(Constant.ERROR_MGS, e);
            jsonObject = JsonUtil.createFailJson();
            return  jsonObject;
        }

        return jsonObject;
    }

    /**
     * 删除收藏
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
//    @ApiOperation(value = "删除收藏", notes = "删除收藏")
    public Object delete(@RequestParam Integer colletId) {
        colletService.deleteById(colletId);
        return SUCCESS_TIP;
    }

    /**
     * 修改收藏
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
//    @ApiOperation(value = "修改收藏", notes = "修改收藏")
    public Object update(Collet collet) {
        colletService.updateById(collet);
        return SUCCESS_TIP;
    }

    /**
     * 收藏详情
     */
    @RequestMapping(value = "/detail/{colletId}", method = RequestMethod.GET)
    @ResponseBody
//    @ApiOperation(value = "收藏详情", notes = "收藏详情")
    public Object detail(@PathVariable("colletId") Integer colletId) {
        return colletService.selectById(colletId);
    }
}
