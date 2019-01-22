package com.youedata.nncloud.core.common.annotion;

import com.youedata.nncloud.core.common.constant.dictmap.base.AbstractDictMap;
import com.youedata.nncloud.core.common.constant.dictmap.base.SystemDict;

import java.lang.annotation.*;

/**
 * 标记需要做业务日志的方法
 *
 * @author Monkey
 * @date 2019-01-22
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface CkLog {

    /**
     * 操作人id
     * @return
     */
    String userId() default "";

    /**
     * 业务的名称,例如:"修改菜单"
     */
    String operation() default "";

    /**
     * 目标id
     * @return
     */
    String target() default "";

    /**
     * 备注
     * @return
     */
    String desc() default "";

    /**
     * 附加key
     * @return
     */
    String key() default "";

//    /**
//     * 被修改的实体的唯一标识,例如:菜单实体的唯一标识为"id"
//     */
//    String key() default "id";
//
//    /**
//     * 字典(用于查找key的中文名称和字段的中文名称)
//     */
//    Class<? extends AbstractDictMap> dict() default SystemDict.class;
}
