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
import com.youedata.nncloud.modular.nanning.model.Attachment;
import com.youedata.nncloud.modular.nanning.service.IAttachmentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMethod;
/**
 * 附件控制器
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Controller
@RequestMapping("/attachment")
//@Api(value = "Attachment-controller", description = "附件")
public class AttachmentController extends BaseController {

    private String PREFIX = "/nanning/attachment/";

    @Autowired
    private IAttachmentService attachmentService;

    /**
     * 跳转到附件首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "attachment.html";
    }

    /**
     * 跳转到添加附件
     */
    @RequestMapping("/attachment_add")
    public String attachmentAdd() {
        return PREFIX + "attachment_add.html";
    }

    /**
     * 跳转到修改附件
     */
    @RequestMapping(value = "/attachment_update/{attachmentId}", method = RequestMethod.GET)
    //@ApiOperation(value = "编辑附件", notes = "编辑附件")
    public String attachmentUpdate(@PathVariable Integer attachmentId, Model model) {
        Attachment attachment = attachmentService.selectById(attachmentId);
        model.addAttribute("item",attachment);
        LogObjectHolder.me().set(attachment);
        return PREFIX + "attachment_edit.html";
    }

    /**
     * 获取附件列表
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    //@ApiOperation(value = "获取附件列表", notes = "获取附件列表")
    public Object list(String condition) {
        return attachmentService.selectList(null);
    }

    /**
     * 新增附件
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "新增附件", notes = "新增附件")
    public Object add(Attachment attachment) {
        attachmentService.insert(attachment);
        return SUCCESS_TIP;
    }

    /**
     * 删除附件
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "删除附件", notes = "删除附件")
    public Object delete(@RequestParam Integer attachmentId) {
        attachmentService.deleteById(attachmentId);
        return SUCCESS_TIP;
    }

    /**
     * 修改附件
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    //@ApiOperation(value = "修改附件", notes = "修改附件")
    public Object update(Attachment attachment) {
        attachmentService.updateById(attachment);
        return SUCCESS_TIP;
    }

    /**
     * 附件详情
     */
    @RequestMapping(value = "/detail/{attachmentId}", method = RequestMethod.GET)
    @ResponseBody
    //@ApiOperation(value = "附件详情", notes = "附件详情")
    public Object detail(@PathVariable("attachmentId") Integer attachmentId) {
        return attachmentService.selectById(attachmentId);
    }
}
