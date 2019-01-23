package com.youedata.nncloud.core.aop;

import com.youedata.nncloud.core.common.annotion.CkLog;
import com.youedata.nncloud.core.db.Db;
import com.youedata.nncloud.core.log.LogManager;
import com.youedata.nncloud.core.log.factory.LogTaskFactory;
import com.youedata.nncloud.core.support.HttpKit;
import com.youedata.nncloud.core.util.RecordLogUtil;
import com.youedata.nncloud.modular.nanning.dao.UpgradeMapper;
import com.youedata.nncloud.modular.nanning.dao.UserInfoMapper;
import com.youedata.nncloud.modular.system.dao.LoginLogMapper;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Map;

/**
 * 日志记录
 *
 * @author fengshuonan
 * @date 2016年12月6日 下午8:48:30
 */
@Aspect
@Component
public class CkLogAop {

//    @Autowired
//    private UserInfoMapper userInfoMapper;
//    private static UserInfoMapper userInfoMapper = Db.getMapper(UserInfoMapper.class);
//    private static UpgradeMapper upgradeMapper = Db.getMapper(UpgradeMapper.class);

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Pointcut(value = "@annotation(com.youedata.nncloud.core.common.annotion.CkLog)")
    public void cutService() {
    }

    @After("cutService()")
    public void recordSysLog(JoinPoint point) throws Throwable {

        try {
            handle(point);
        } catch (Exception e) {
            log.error("日志记录出错!", e);
        }

//        return result;
    }

    private void handle(JoinPoint point) throws Exception {

        try {
            //获取拦截的方法名
            Signature sig = point.getSignature();
            MethodSignature msig = null;
            if (!(sig instanceof MethodSignature)) {
                throw new IllegalArgumentException("该注解只能用于方法");
            }
            msig = (MethodSignature) sig;
            Object target = point.getTarget();
            Method currentMethod = target.getClass().getMethod(msig.getName(), msig.getParameterTypes());
            String methodName = currentMethod.getName();

//        //如果当前用户未登录，不做日志
//        ShiroUser user = ShiroKit.getUser();
//        if (null == user) {
//            return;
//        }
            //String userId = GlobalHashMap.getUserId();

            //获取拦截方法的参数
            String className = point.getTarget().getClass().getName();
            Object[] params = point.getArgs();

            //获取操作名称
            CkLog annotation = currentMethod.getAnnotation(CkLog.class);
            String bussinessName = annotation.operation();
            String userId = annotation.userId();
            String targetId = annotation.target();
            String desc = annotation.desc();
            String key = annotation.key();

//        StringBuilder sb = new StringBuilder();
//        for (Object param : params) {
//            sb.append(param);
//            sb.append(" & ");
//        }
            //如果涉及到修改,比对变化
            String msg;
            Map<String, String> parameters = HttpKit.getRequestParameters();
//        AbstractDictMap dictMap = (AbstractDictMap) dictClass.newInstance();
//        msg = Contrast.parseMutiKey(dictMap, key, parameters);
            String _userId = parameters.get(userId);
            String _targetId = parameters.get(targetId);

            msg = _userId + bussinessName + _targetId + desc;

            if (StringUtils.isNotBlank(key)) {
                msg += parameters.get(key);
            }

            msg = msg.replaceAll("null", "");
            int t_userId = 0;
            if (StringUtils.isNotBlank(_userId)) {
                t_userId = Integer.parseInt(_userId);
            }
            String ip = HttpKit.getRemoteHostReal(HttpKit.getRequest());

            LogManager.me().executeLog(LogTaskFactory.bussinessLog(t_userId, bussinessName, className, methodName, ip, msg));
        }   catch (Exception e) {
            RecordLogUtil.error("参数错误！！！！" + point.getSignature());
        }
    }
}