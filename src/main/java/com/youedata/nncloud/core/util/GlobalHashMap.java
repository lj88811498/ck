//package com.youedata.nncloud.core.util;
//
//import com.youedata.nncloud.modular.nanning.model.vo.CodeTempVo;
//import com.youedata.nncloud.modular.nanning.model.vo.DataosUser;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;
//
///**
// * 存储
// *
// * @Author: Monkey
// * @Date: Created in 14:10  2018/11/13.
// * @Description:
// */
//public class GlobalHashMap {
//
//    private static String KEY = "dataosUser";
//
//    private static String SESSION_KEY = "dataosUser";
//    //存储验证码的key
//    private static String SESSION_CODE_KEY ="code";
//
//    private static String accountName = "lijiang";
//
//    private static String accountPasswd = "111111";
//
//    /**
//     * dataosUser
//     */
//    private static Map<String, Object> map = new ConcurrentHashMap<>();
//    /**
//     * 验证码Map
//     */
//    private static Map<String, Object> mapCode= new ConcurrentHashMap<>();
//
//    /**
//     * 设置user
//     *
//     * @param user
//     */
//    public static void setUser(DataosUser user) {
//        if (user != null) {
//            map.put(KEY, user);
//        }
//    }
//
//
//    /**
//     * 获取user
//     *
//     * @param
//     */
//    public static DataosUser getUser() {
//        DataosUser user = null;
//        try {
//            Object o = map.get(KEY);
//            if (o != null) {
//                user = (DataosUser) o;
//            } else {
//                Map<String, Object> params = new HashMap<String, Object>();
//                params.put("accountName", accountName);
//                params.put("accountPasswd",  Sha1Util.getSha1(accountPasswd));
//                //获取httpClientUtil的实体
//                HttpClientUtil clientUtil = SpringContextHolder.getBean(HttpClientUtil.class);
//                return clientUtil.Login(params);
//            }
//        } catch (Exception e) {
//            RecordLogUtil.error("GlobalHashMap获取user失败！");
//        }
//        return user;
//    }
//
//
//    /**
//     * 清除user
//     *
//     */
//    public static void removeUser() {
//
//        if (map.get(KEY) != null) {
//            map.remove(KEY);
//        }
//
//    }
//
//    /**
//     * 获取getToken
//     *
//     * @param
//     */
//    public static String getToken() {
//        String token = null;
//        DataosUser user = getUser();
//        if (user != null) {
//            token = user.getAccessToken();
//        }
//        return token;
//    }
//
//
//
//    /**
//     * 获取userId
//     *
//     * @param
//     */
//    public static String getUserId() {
//        String userId = null;
//        DataosUser user = getUser();
//        if (user != null) {
//            userId = user.getAccountId();
//        }
//        return userId;
//    }
//
//    /**
//     *设置验证码的值
//     * @param code
//     */
//    public static void setMapCode(String key, String code){
//        CodeTempVo codeTempVo = new CodeTempVo(code);
//
//        mapCode.put(key, codeTempVo);
//    }
//
//    /**
//     *获取验证码的值
//     * @return
//     */
//    public static String getMapCode(String key){
//        try {
//            Object obj = mapCode.get(key);
//            if (obj != null && obj instanceof CodeTempVo) {
//                CodeTempVo codeTempVo = (CodeTempVo)obj;
//                clearOutTimeCode();
//                return codeTempVo.getCode();
//            }
//        } catch (Exception e) {
//            RecordLogUtil.error("获取验证码异常！");
//        }
//
//        return null;
//    }
//
//    /**
//     * 清除过期验证码
//     */
//    public static void clearOutTimeCode(){
//
//        for (Map.Entry<String, Object> entry : mapCode.entrySet()) {
//            if (ToolUtil.isNotEmpty(entry.getValue())) {
//                CodeTempVo codeTempVo = (CodeTempVo)entry.getValue();
//
//                Long expires = codeTempVo.getExpires();
//                if (System.currentTimeMillis() - expires > 1000 * 10 * 60) {
//                    mapCode.remove(entry.getKey());
//                }
//            }
//        }
//
//    }
//
//
//
//    /**
//     * 移除已使用过的验证码
//     * @param key
//     */
//    public static void removeMapCode(String key){
//        if(mapCode.get(key)!=null){
//
//            mapCode.remove(key);
//        }
//    }
//
//    public String getAccountName() {
//        return accountName;
//    }
//
//    public void setAccountName(String accountName) {
//        this.accountName = accountName;
//    }
//
//    public String getAccountPasswd() {
//        return accountPasswd;
//    }
//
//    public void setAccountPasswd(String accountPasswd) {
//        this.accountPasswd = accountPasswd;
//    }
//}
