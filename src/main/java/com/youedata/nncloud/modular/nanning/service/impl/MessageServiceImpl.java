package com.youedata.nncloud.modular.nanning.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.youedata.nncloud.core.common.constant.factory.PageFactory;
import com.youedata.nncloud.modular.nanning.dao.MessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.youedata.nncloud.modular.nanning.model.Message;
import org.springframework.stereotype.Service;
import com.youedata.nncloud.modular.nanning.service.IMessageService;

import java.util.List;


/**
 * 消息通知Service
 *
 * @author monkey
 * @Date 2018-09-13 14:06:25
 */
@Service
@Transactional(rollbackFor = java.lang.Exception.class)
public class MessageServiceImpl extends ServiceImpl<BaseMapper<Message>,Message> implements IMessageService {

    @Autowired
    private MessageMapper messageMapper;

    /**
     * 查询用户所有消息通知
     *
     * @param messageUserId
     * @return
     */
    @Override
    public Page<List<Message>> selectMessages(int messageUserId, int size, int curPage) {
        Page page = new PageFactory<>().defaultPage2(size, curPage);
        List<Message> results = messageMapper.selectMessages(page, messageUserId);
        page.setRecords(results);
        return page;
    }
}
