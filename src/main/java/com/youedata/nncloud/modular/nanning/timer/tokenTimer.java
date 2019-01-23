package com.youedata.nncloud.modular.nanning.timer;

import com.youedata.nncloud.core.log.LogManager;
import com.youedata.nncloud.core.log.factory.LogTaskFactory;
import com.youedata.nncloud.core.util.RecordLogUtil;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @Author: Monkey
 * @Date: Created in 18:20  2019/1/21.
 * @Description:
 */
@Component
public class tokenTimer {

    /**
     * 每1分钟执行一次
     * @Author: Monkey
     * @Param: []
     * @Date: Created in  2018/8/31 15:39.
     * @Returns void
     */
    @Scheduled(cron = "0 0/1 * * * ?")
    public void tokenScheduled(){
        try {
            //RecordLogUtil.info("-------开始清理过期token。。。------------");
            LogManager.me().clearOutTimeToken(LogTaskFactory.clearOutTimeToken());
            //RecordLogUtil.info("--------token清理完毕。。。---------------");
        } catch (Exception e) {
            RecordLogUtil.error("-------token清理失败！--------------------", e);
        }
    }
}
