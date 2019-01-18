package com.youedata.nncloud.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.embedded.EmbeddedServletContainerInitializedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * Created by Lenovo on 2018/1/18.
 */
@Configuration
public class ServiceInfoConfig implements ApplicationListener<EmbeddedServletContainerInitializedEvent> {
    private static EmbeddedServletContainerInitializedEvent event;
    protected final static Logger logger = LoggerFactory.getLogger(ServiceInfoConfig.class);

    @Override
    public void onApplicationEvent(EmbeddedServletContainerInitializedEvent event) {
        ServiceInfoConfig.event = event;
        try {
            logger.info("Application At http://"+ InetAddress.getLocalHost().getHostAddress()+":"+event.getEmbeddedServletContainer().getPort());
            logger.info("Swagger At http://"+ InetAddress.getLocalHost().getHostAddress()+":"+event.getEmbeddedServletContainer().getPort()+"/swagger-ui.html");
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }
}
