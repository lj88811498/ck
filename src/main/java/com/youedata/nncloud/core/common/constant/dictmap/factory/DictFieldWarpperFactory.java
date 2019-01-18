package com.youedata.nncloud.core.common.constant.dictmap.factory;

import com.youedata.nncloud.core.common.constant.factory.ConstantFactory;
import com.youedata.nncloud.core.common.constant.factory.IConstantFactory;
import com.youedata.nncloud.core.common.exception.BizExceptionEnum;
import com.youedata.nncloud.core.exception.GunsException;

import java.lang.reflect.Method;

/**
 * 字典字段的包装器(从ConstantFactory中获取包装值)
 *
 * @author fengshuonan
 * @date 2017-05-06 15:12
 */
public class DictFieldWarpperFactory {
    /**
     * 单个参数封装
     *
     * @param parameter
     * @param methodName
     * @return
     */
    public static Object createFieldWarpper(Object parameter, String methodName) {
        IConstantFactory constantFactory = ConstantFactory.me();
        try {
            Method method = IConstantFactory.class.getMethod(methodName, parameter.getClass());
            return method.invoke(constantFactory, parameter);
        } catch (Exception e) {
            try {
                Method method = IConstantFactory.class.getMethod(methodName, Integer.class);
                return method.invoke(constantFactory, Integer.parseInt(parameter.toString()));
            } catch (Exception e1) {
                throw new GunsException(BizExceptionEnum.ERROR_WRAPPER_FIELD);
            }
        }
    }

    /**
     * 多个参数密码验证
     *
     * @param parameter
     * @param parameter1
     * @param methodName
     * @return
     */
    public static Object createFieldWarpper1(Object parameter, Object parameter1, String methodName) {
        IConstantFactory constantFactory = ConstantFactory.me();
        try {
            Method method = IConstantFactory.class.getMethod(methodName, parameter.getClass(), parameter1.getClass());
            return method.invoke(constantFactory, parameter, parameter1);
        } catch (Exception e) {
            try {
                Method method = IConstantFactory.class.getMethod(methodName, Integer.class, Integer.class);
                return method.invoke(constantFactory, Integer.parseInt(parameter.toString()), Integer.parseInt(parameter1.toString()));
            } catch (Exception e1) {
                throw new GunsException(BizExceptionEnum.ERROR_WRAPPER_FIELD);
            }
        }
    }

    /**
     * 多个参数，验证码验证
     *
     * @param parameter
     * @param parameter1
     * @param methodName
     * @return
     */
    public static Object createFieldWarpper2(Object parameter, Object parameter1, String methodName) {
        IConstantFactory constantFactory = ConstantFactory.me();
        try {
            Method method = IConstantFactory.class.getMethod(methodName, parameter.getClass(), parameter1.getClass());
            return method.invoke(constantFactory, parameter, parameter1);
        } catch (Exception e) {
            try {
                Method method = IConstantFactory.class.getMethod(methodName, String.class, String.class);
                return method.invoke(constantFactory, parameter.toString(), parameter1.toString());
            } catch (Exception e1) {
                throw new GunsException(BizExceptionEnum.ERROR_WRAPPER_FIELD);
            }
        }
    }
}
