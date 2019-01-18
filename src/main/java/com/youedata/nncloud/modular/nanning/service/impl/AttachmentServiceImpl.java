package com.youedata.nncloud.modular.nanning.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.Attachment;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IAttachmentService;


/**
 * 附件Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class AttachmentServiceImpl extends ServiceImpl<BaseMapper<Attachment>,Attachment> implements IAttachmentService {
}
