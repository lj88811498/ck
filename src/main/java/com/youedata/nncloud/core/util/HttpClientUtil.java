//package com.youedata.nncloud.core.util;
//
//import com.alibaba.fastjson.JSONObject;
//import com.youedata.nncloud.core.support.HttpKit;
//import com.youedata.nncloud.modular.nanning.model.vo.DataosUser;
//import org.apache.http.HttpEntity;
//import org.apache.http.HttpResponse;
//import org.apache.http.client.HttpClient;
//import org.apache.http.client.methods.HttpDelete;
//import org.apache.http.client.methods.HttpGet;
//import org.apache.http.client.methods.HttpPost;
//import org.apache.http.client.methods.HttpPut;
//import org.apache.http.entity.StringEntity;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.util.EntityUtils;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import javax.servlet.http.HttpSession;
//import java.util.HashMap;
//import java.util.Map;
//
///**
// * httpclient工具类
// *
// * @author Monkey
// * @date 2018-11-08
// */
//@Component
//public class HttpClientUtil {
//
//    public static final String RESULT = "result";
//    public static final String DATAS = "datas";
//    public static final String ACCESS_TOKEN = "accessToken";
//    public static final String SESSION_KEY = "dataosUser";
//    private static final String charset = "utf-8";
//
//
//    @Value("${dataos.serverPath}")
//    public String serverPath;
//
//    @Value("${dataos.loginPath}")
//    public String loginPath;
//
//    @Value("${dataos.checkAccessToken}")
//    public String checkAccessToken;
//
//    @Value("${dataos.accounts}")
//    public String accounts;
//
//    @Value("${dataos.register}")
//    public String register;
//
//    public String getServerPath() {
//        return serverPath;
//    }
//
//    public String getLoginPath() {
//        return loginPath;
//    }
//
//    private static HttpClient httpClient = HttpClients.createDefault();
//
//
//    /**
//     * 获取dataosUser
//     *
//     * @return
//     */
//    public DataosUser getUser() {
//
//        return GlobalHashMap.getUser();
//    }
//
//    /**
//     * 获取token
//     *
//     * @return
//     */
//    public String getToken() {
//        return GlobalHashMap.getToken();
//    }
//
//
//    /**
//     * 登陆
//     * post方式
//     *
//     * @param params
//     * @return
//     */
//    @SuppressWarnings({"unchecked", "rawtypes"})
//    public DataosUser Login(Map<String, Object> params) throws Exception{
//        String url = serverPath + loginPath;
//        HttpPost httpPost;
//        DataosUser user = null;
//        httpPost = new HttpPost(url);
//        JSONObject js = new JSONObject();
//        for (Map.Entry<String, Object> entry : params.entrySet()) {
//            if (ToolUtil.isNotEmpty(entry.getValue())) {
//                js.put(entry.getKey(), entry.getValue());
//            }
//
//        }
//        // 设置参数
//        httpPost.setHeader("Content-Type", "application/json;charset=UTF-8");
//        StringEntity entity = new StringEntity(js.toString());
//        httpPost.setEntity(entity);
//        HttpResponse response = httpClient.execute(httpPost);
//        if (response != null) {
//            HttpEntity resEntity = response.getEntity();
//            if (resEntity != null) {
//                String result = EntityUtils.toString(resEntity, charset);
//                net.sf.json.JSONObject json = net.sf.json.JSONObject.fromObject(result);
//                user = DataosUser.getDataosUser(json);
//                if(user == null){
//                    throw new Exception(json.get("msg")+"");
//                }
//                String accountPasswd = params.get("accountPasswd").toString();
//                user.setAccountPasswd(accountPasswd);
//                GlobalHashMap.setUser(user);
//                HttpSession session = HttpKit.getRequest().getSession(false);
//                if (session != null) {
//                    session.setAttribute(SESSION_KEY, user);
//                }
//            }
//        }
//        return user;
//    }
//
//    /**
//     * 注册
//     * post方式
//     *
//     * @param params
//     * @return
//     */
//    public String register(Map<String, String> params, String token) throws Exception{
//        String url = serverPath + register;
//        HttpPost httpPost;
//        String result = null;
//        httpPost = new HttpPost(url);
//        JSONObject js = new JSONObject();
//        for (Map.Entry<String, String> entry : params.entrySet()) {
//            if (ToolUtil.isNotEmpty(entry.getValue())) {
//                js.put(entry.getKey(), entry.getValue());
//            }
//
//        }
//        // 设置参数
//        httpPost.setHeader("Content-Type", "application/json;charset=UTF-8");
//        httpPost.setHeader("accessToken", token);
//        StringEntity entity = new StringEntity(js.toString());
//        httpPost.setEntity(entity);
//        HttpResponse response = httpClient.execute(httpPost);
//        if (response != null) {
//            HttpEntity resEntity = response.getEntity();
//            if (resEntity != null) {
//                result = EntityUtils.toString(resEntity, charset);
//            }
//        }
//        return result;
//    }
//
//    /**
//     * get方式 账户列表信息查询
//     *
//     * @param
//     * @param
//     * @return
//     */
//    public String accounts(Map<String, String> params, String token) throws Exception{
//        HttpGet httpGet;
//        String result = null;
//        String url = serverPath + accounts;
//        if (params.size() != 0) {
//            url = url + "?";
//            for (Map.Entry entry : params.entrySet()) {
//                if(ToolUtil.isNotEmpty(entry.getValue())){
//                    url = url + entry.getKey() + "=" + entry.getValue() + "&";
//                }
//            }
//        }
//
//        httpGet = new HttpGet(url);
//        JSONObject js = new JSONObject();
//        // 设置参数
//        httpGet.setHeader("Content-Type", "application/json;charset=UTF-8");
//        httpGet.setHeader("accessToken", token);
////            StringEntity entity = new StringEntity(js.toString());
////            httpGet.setEntity(entity);
//        HttpResponse response = httpClient.execute(httpGet);
//        if (response != null) {
//            HttpEntity resEntity = response.getEntity();
//            if (resEntity != null) {
//                result = EntityUtils.toString(resEntity, charset);
//            }
//        }
//        return result;
//    }
//
//    /**
//     * get方式 账户详细信息查询
//     * @param
//     * @param
//     * @return
//     */
//    public String accountDetail(Map<String,String> params,String token) {
//        HttpGet httpGet;
//        String result = null;
//        String url = serverPath + accounts;
//        try {
//            if(params.size() != 0){
//                url += "/";
//                for (Map.Entry entry : params.entrySet()) {
//                    url= url+entry.getValue();
//                }
//            }
//
//            httpGet = new HttpGet(url);
//            JSONObject js = new JSONObject();
//            // 设置参数
//            httpGet.setHeader("Content-Type","application/json;charset=UTF-8");
//            httpGet.setHeader("accessToken",token);
//            HttpResponse response = httpClient.execute(httpGet);
//            if (response != null) {
//                HttpEntity resEntity = response.getEntity();
//                if (resEntity != null) {
//                    result = EntityUtils.toString(resEntity, charset);
//                }
//            }
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return result;
//    }
//
//    /**
//     * put方式 账户信息修改
//     * @param
//     * @param
//     * @return
//     */
//    public String accountUpdate(Map<String,String> params,String token) {
//        HttpPut httpPut;
//        String result = null;
//        String url = serverPath + accounts + "/";
//        try {
//
//            JSONObject js = new JSONObject();
//            for (Map.Entry<String, String> entry : params.entrySet()) {
//                if (ToolUtil.isNotEmpty(entry.getValue())) {
//                    js.put(entry.getKey(), entry.getValue());
//                }
//
//            }
//            url += js.getString("accountId");
//            httpPut = new HttpPut(url);
//            // 设置参数
//            httpPut.setHeader("Content-Type", "application/json;charset=UTF-8");
//            httpPut.setHeader("accountId", js.getString("accountId"));
//            httpPut.setHeader("accessToken", token);
//            StringEntity entity = new StringEntity(js.toString());
//            httpPut.setEntity(entity);
//            HttpResponse response = httpClient.execute(httpPut);
//            if (response != null) {
//                HttpEntity resEntity = response.getEntity();
//                if (resEntity != null) {
//                    result = EntityUtils.toString(resEntity, charset);
//                }
//            }
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return result;
//    }
//
//    /**
//     * delete方式 删除账户
//     * @param
//     * @param
//     * @return
//     */
//    public String accountDelete(Map<String,String> params,String token) {
//        HttpDelete httpDelete;
//        String result = null;
//        String url = serverPath + accounts + "/";
//        try {
//
//            JSONObject js = new JSONObject();
//            for (Map.Entry<String, String> entry : params.entrySet()) {
//                if (ToolUtil.isNotEmpty(entry.getValue())) {
//                    js.put(entry.getKey(), entry.getValue());
//                }
//
//            }
//            url += js.getString("accountId");
//            httpDelete = new HttpDelete(url);
//            // 设置参数
//            httpDelete.setHeader("Content-Type", "application/json;charset=UTF-8");
//            httpDelete.setHeader("accessToken", token);
//            HttpResponse response = httpClient.execute(httpDelete);
//            if (response != null) {
//                HttpEntity resEntity = response.getEntity();
//                if (resEntity != null) {
//                    result = EntityUtils.toString(resEntity, charset);
//                }
//            }
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return result;
//    }
//
//    /**
//     * delete方式 账户退出
//     * @param
//     * @param
//     * @return
//     */
//    public String logout(Map<String,String> params,String token) {
//        HttpDelete httpDelete;
//        String result = null;
//        String url = serverPath + loginPath;
//        try {
//            httpDelete = new HttpDelete(url);
//            JSONObject js = new JSONObject();
//            for (Map.Entry<String, String> entry : params.entrySet()) {
//                js.put(entry.getKey(), entry.getValue());
//            }
//
//            // 设置参数
//            httpDelete.setHeader("Content-Type","application/json;charset=UTF-8");
//            httpDelete.setHeader("accountId",js.get("accountId").toString());
//            httpDelete.setHeader("accessToken",token);
//            HttpResponse response = httpClient.execute(httpDelete);
//            if (response != null) {
//                HttpEntity resEntity = response.getEntity();
//                if (resEntity != null) {
//                    result = EntityUtils.toString(resEntity, charset);
//                }
//            }
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return result;
//    }
//
//    /**
//     * get方式 token校验
//     *
//     * @param token
//     * @param
//     * @return
//     */
//    public String checkAccessToken(String token) throws Exception{
//        HttpGet httpGet;
//        String result = null;
//        String str = serverPath + checkAccessToken;
//
//        httpGet = new HttpGet(str);
//        JSONObject js = new JSONObject();
//        // 设置参数
//        httpGet.setHeader("Content-Type", "application/json;charset=UTF-8");
//        httpGet.setHeader("accessToken", token);
////            StringEntity entity = new StringEntity(js.toString());
////            httpGet.setEntity(entity);
//        HttpResponse response = httpClient.execute(httpGet);
//        if (response != null) {
//            HttpEntity resEntity = response.getEntity();
//            if (resEntity != null) {
//                result = EntityUtils.toString(resEntity, charset);
//            }
//        }
//        return result;
//    }
//
//
//    public static void main(String[] args) throws Exception {
//        String path = "http://210.13.50.105:32404/";
////		String url = "yyzhzx/api/v1/accounts";
//        String url = "yyzhzx/api/v1/session";
//        Map<String, String> params = new HashMap<String, String>();
//
//        params.put("accountName", "lijiang");
//        params.put("accountPasswd", "6a417cb8743923208438de6eb3bce1e504064ab1");
////        String body = Login(params);
////        System.out.println("body=" + body);
////        net.sf.json.JSONObject json = net.sf.json.JSONObject.fromObject(body);
////        System.out.println(json);
////        DataosUser user = new HttpClientUtil().Login(params);
////        user = DataosUser.getDataosUser(json);
////        System.out.println(user.getAccessToken());
////        net.sf.json.JSONObject j1 = null;
////        net.sf.json.JSONObject j2 = null;
////        if (json.get(RESULT) instanceof net.sf.json.JSONObject) {
////            j1 = (net.sf.json.JSONObject) json.get(RESULT);
////        }
////        if (j1.get(DATAS)  instanceof net.sf.json.JSONObject) {
////            j2 = (net.sf.json.JSONObject) j1.get(DATAS);
////        }
////
////        DataosUser user = new DataosUser();
////        user = (DataosUser) BeanUtil.copyProperties(j2, user);
////        System.out.println("user=" + user);
////        String token = j2.get(ACCESS_TOKEN).toString();
////        System.out.println(token);
////		String body1 = HttpClientUtil.doPost(path + url, params);
////		System.out.println("body1=" + body1);
//    }
//
//
//}