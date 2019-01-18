package com.youedata.nncloud.core.util;


import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
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
//            if (paramType instanceof ParameterizedType)/**//* 如果是泛型类型 */ {
//                Type[] types = ((ParameterizedType) paramType)
//                        .getActualTypeArguments();// 泛型类型列表
//                for (Type type : types) {
//                    System.out.println("   " + type);
//                }
//            }
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


//        WarningIndex warningIndex = new WarningIndex();
//        warningIndex = (WarningIndex) BeanUtil.copyProperties(map, warningIndex);
//
//        WarningCycle warningCycle = new WarningCycle();
//        warningCycle = (WarningCycle) BeanUtil.copyProperties(map, warningCycle);
//
//        WarningTitle warningTitle = new WarningTitle();
//        warningTitle = (WarningTitle) BeanUtil.copyProperties(map, warningTitle);
//
//        WarningKeyword warningKeyword = new WarningKeyword();
//        warningKeyword = (WarningKeyword) BeanUtil.copyProperties(map, warningKeyword);

//        System.out.println(warningIndex);
//        System.out.println(warningCycle);
//        System.out.println(warningTitle);
//        System.out.println(warningKeyword);
//
//        CarTravel car = new CarTravel();
//
//        try {
//            car = (CarTravel)BeanUtil.copyProperties(map, car, "信息不完整");
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        System.out.println(car);

    }

    /**
     * java实体类转换为map
     *
     * @author vic
     */
    public static Map<String, Object> convertBeanToMap(Object bean) throws IntrospectionException, IllegalAccessException, InvocationTargetException {
        Class type = bean.getClass();
        Map<String, Object> returnMap = new HashMap<String, Object>();
        BeanInfo beanInfo = Introspector.getBeanInfo(type);
        PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
        for (int i = 0; i < propertyDescriptors.length; i++) {
            PropertyDescriptor descriptor = propertyDescriptors[i];
            String propertyName = descriptor.getName();
            if (!propertyName.equals("class")) {
                Method readMethod = descriptor.getReadMethod();
                Object result = readMethod.invoke(bean, new Object[0]);
                if (result != null) {
                    returnMap.put(propertyName, result);
                } else {
                    returnMap.put(propertyName, "");
                }
            }
        }
        return returnMap;
    }


}
