package com.youedata.nncloud.modular.nanning.service;
import com.baomidou.mybatisplus.service.IService;
import com.youedata.nncloud.modular.nanning.model.Degree;
/**
 * 满意度Service
 *
 * @author monkey
 * @Date 2018-09-12 10:11:32
 */
public interface IDegreeService extends IService<Degree>{

    /**
     * 整体满意度
     * @return
     */
    int getMainAvg(String date);

    /**
     * 客服回复满意度
     * @return
     */
    int getAnswerAvg(String date);

    /**
     * 客服工作态度满意度
     * @return
     */
    int getWorkAvg(String date);
}
