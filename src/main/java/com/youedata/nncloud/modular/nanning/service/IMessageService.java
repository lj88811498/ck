package com.youedata.nncloud.modular.nanning.service;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.IService;
import com.youedata.nncloud.modular.nanning.model.Message;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 消息通知Service
 *
 * @author monkey
 * @Date 2018-09-13 14:06:25
 */
public interface IMessageService extends IService<Message>{

    /**
     * 查询用户所有消息通知
     * @param messageUserId
     * @return
     */
    Page<List<Message>> selectMessages(@Param("messageUserId") int messageUserId, int size, int curPage);
}
