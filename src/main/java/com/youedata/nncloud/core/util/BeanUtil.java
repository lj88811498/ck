package com.youedata.nncloud.core.util;


import net.sf.json.JSONObject;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author: Monkey
 * @Date: Created in 16:31  2018/4/10.
 * @Description:
 */
public class BeanUtil {

    /**
     * 拷贝相同字段的值
     *
     * @Author: Monkey
     * @Param: [map, target]
     * @Date: Created in  2018/4/10 17:02.
     * @Returns void
     */
    public static Object copyProperties(Map map, Object target) {
        Class<?> targetClass = target.getClass();
        Object o1 = null;
        try {
            o1 = targetClass.newInstance();
            Field[] fields = targetClass.getDeclaredFields();
            for (Field field : fields) {
                Object o = map.get(field.getName());
                if (o != null) {
                    invokeMethod(targetClass, "set" + changeToUpper(field.getName()), o, o1);
                }
            }
        } catch (Exception e) {
            RecordLogUtil.error("映射异常！BeanUtil.copyProperties", e);
        }
        return o1;
    }
    /**
     * 拷贝相同字段的值
     *
     * @Author: Monkey
     * @Param: [map, target]
     * @Date: Created in  2018/4/10 17:02.
     * @Returns void
     */
    public static Object copyProperties2(Object map1, Object target) {
        JSONObject map = null;
        if (map1 instanceof JSONObject) {
            map = (JSONObject)map1;
        }
        Class<?> targetClass = target.getClass();
        Object o1 = null;
        try {
            o1 = targetClass.newInstance();
            Field[] fields = targetClass.getDeclaredFields();
            for (Field field : fields) {
                Object o = map.get(field.getName());
                if (o != null) {
                    invokeMethod(targetClass, "set" + changeToUpper(field.getName()), o, o1);
                }
            }
        } catch (Exception e) {
            RecordLogUtil.error("映射异常！BeanUtil.copyProperties", e);
        }
        return o1;
    }
    /**
     * 拷贝相同字段的值
     *
     * @Author: Monkey
     * @Param: [map, target]
     * @Date: Created in  2018/4/10 17:02.
     * @Returns void
     */
    public static Object copyProperties(Map map, Object target, String errorMsg) throws Exception{
        //出行需求专用
        String filterFields = ",userInfoName,userInfoCard,carTravelStartStation,carTravelEndStation,carTravelTime,carTravelCarNo,carTravelSeat,";
        Class<?> targetClass = target.getClass();
        Object o1 = null;
        try {
            o1 = targetClass.newInstance();
            Field[] fields = targetClass.getDeclaredFields();
            for (Field field : fields) {
                Object o = map.get(field.getName());
                if (o != null && o != "") {
                    invokeMethod(targetClass, "set" + changeToUpper(field.getName()), o, o1);
                } else if (org.apache.commons.lang3.StringUtils.isNotBlank(errorMsg)) {
                    //存在的字段
                    if (filterFields.contains("," + field.getName() + ",")) {
                        throw new Exception(errorMsg);
                    }
                }
            }
        } catch (Exception e) {
            RecordLogUtil.info(errorMsg);
            throw new Exception(errorMsg);
        }
        return o1;
    }
    /**
     * 设置字段值
     *
     * @param targetClass
     * @param targetMethod
     * @param o
     */
    private static void invokeMethod(Class<?> targetClass, String targetMethod, Object o, Object o1) {
        Method[] methods = targetClass.getDeclaredMethods();
        try {
            for (Method method : methods) {
                if (method.getName().equals(targetMethod)) {
                    setParam(method, o, o1);
                    break;
                }
            }
        } catch (Exception e) {
            RecordLogUtil.error("反射生成对象信息异常 BeanUtil.invokeMethod", e);
        }
    }


    private static void setParam(Method method, Object o, Object o1) throws InvocationTargetException, IllegalAccessException {
        // 方法的参数列表
        Type[] parameterTypes = method.getGenericParameterTypes();
        boolean flag = false;
        for (Type paramType : parameterTypes) {
            if (paramType.getTypeName().equals("java.lang.Integer")) {
                method.invoke(o1, Integer.parseInt(o.toString()));
                flag = true;
            } else if (paramType.getTypeName().equals("java.lang.String")) {
                method.invoke(o1, (java.lang.String) o);
                flag = true;
            } else if (paramType.getTypeName().equals("java.lang.Boolean")) {
                method.invoke(o1, Boolean.parseBoolean(o.toString()));
                flag = true;
            }
            if (flag) {
                break;
            }
        }
    }

    /**
     * 改变首字母为大写
     *
     * @param methodName
     * @return
     */
    public static String changeToUpper(String methodName) {

        return methodName.substring(0, 1).toUpperCase() + methodName.substring(1);
    }

    public static void main(String[] args) {
        Map<Object, Object> map = new HashMap();
        map.put("warningIndexId", "1");
        map.put("warningIndexHit", "12");
        map.put("warningIndexChange", "333");
        map.put("warningIndexTotal", "wwwww");
        map.put("warningCycleSwith", "1");
        map.put("warningTitleIds", "1,2,3,4,5");
        map.put("warningTitleSwith", "0");
        map.put("warningKeywordName", "聪明;活泼;善良;帅气;");
        map.put("carTravelTime", "123");
        map.put("carTravelStartStation", "234");
        map.put("carTravelEndStation", "");

        map.put("accountId", "asd123123123");
        map.put("accountName", "考大神");
        map.put("telephone", "133333332331");
//        DataosUser user = new DataosUser();

        JSONObject map1 = new JSONObject();
        map1.put("accountId", "asd123123123");
        map1.put("accountName", "考大神");
        map1.put("telephone", "133333332331");
        map1.put("telephone2", "555555333112");
        map1.put("telephone3", "6666666");
//        user = (DataosUser)BeanUtil.copyProperties(map, user);
//        DataosUser dataosUser = BeanKit.mapToBean(map, user.getClass());
//        user = (DataosUser)BeanUtil.copyProperties(map1, user);
//        System.out.println(user);
//        System.out.println(dataosUser);
    }

}
