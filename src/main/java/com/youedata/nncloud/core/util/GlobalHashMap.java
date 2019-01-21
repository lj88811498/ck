package com.youedata.nncloud.core.util;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * 存储
 *
 * @Author: Monkey
 * @Date: Created in 14:10  2018/11/13.
 * @Description:
 */
@Component
public class GlobalHashMap {

    /**
     * 开关配置文件
     */
    @Value("${token.swith}")
    private static String swith;

    /**
     * token的缓存
     */
    private static Map<String, Object> map = new HashMap<String, Object>();

    /**
     * 是否在线，不在线则直接添加，在线就先删除原来的，再添加
     *
     */
    public static synchronized boolean isUserOnline(String token) {
        //添加开关控制
        if ("off".equals(swith)) {
            return true;
        }

        if (StringUtils.isNotBlank(token)) {
            Object val =  map.get(token);
            if (val != null) {
                return addUserToken(token);
            }
        }

        return false;
    }


    /**
     * 添加用户的token信息
     * @param token
     * @return
     */
    public static synchronized boolean addUserToken(String token) {
        if (StringUtils.isNotBlank(token)) {
            //存时间戳，方便删除
            long time = System.currentTimeMillis();
            map.put(token, time);
            return true;
        }

        return false;
    }

    /**
     * 清楚过期token
     */
    public static void clear() {
        Set<Map.Entry<String, Object>> entries = map.entrySet();

        for (Map.Entry<String, Object> map1 : entries) {
            String key = map1.getKey();
            Object val = map1.getValue();
            long diss = System.currentTimeMillis() - (long)val ;
            if (diss > 1000 * 60 * 10) {
                map.remove(key);
            }
        }

    }

    public static void main(String[] args) throws InterruptedException {
        addUserToken("1212312333333123-12312-3-12-3123");
        Thread.sleep(1000);
        System.out.println(isUserOnline("1212312333333123-12312-3-12-3123"));
        Thread.sleep(1000);
        clear();
        System.out.println(isUserOnline("1212312333333123-12312-3-12-3123"));
    }
//    static class Model{
//        Long date;
//        protected Model(Long date){
//            this.date = date;
//        }
//    }

}
