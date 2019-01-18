package com.youedata.nncloud.core.intercept;

import com.youedata.nncloud.core.base.controller.BaseController;
import com.youedata.nncloud.core.util.HttpSessionHolder;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 静态调用session的拦截器
 *
 * @author fengshuonan
 * @date 2016年11月13日 下午10:15:42
 */
@Aspect
@Component
public class SessionHolderInterceptor extends BaseController {

    private static List<String> filterMethodList = new ArrayList<String>();

    static {
        filterMethodList.add("spiderScheduled");
    }
    @Pointcut("execution(* com.youedata.nncloud.*..controller.*.*(..))")
    public void cutService() {
    }

    @Around("cutService()")
    public Object sessionKit(ProceedingJoinPoint point) throws Throwable {
        String realMethod = point.getSignature().getName();
        if (filterMethodList.contains(realMethod)) {
            return point.proceed();
        }
        HttpSessionHolder.put(super.getHttpServletRequest().getSession());
        try {
            return point.proceed();
        } finally {
            HttpSessionHolder.remove();
        }
    }
}
