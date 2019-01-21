package com.youedata.nncloud.config.properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * guns项目配置
 *
 * @author stylefeng
 * @Date 2017/5/23 22:31
 */
@Component
public class DataOsProperties {


    @Value("${dataos.isOpen}")
    private boolean isOpen;

    public boolean getIsOpen() {
        return isOpen;
    }

}
