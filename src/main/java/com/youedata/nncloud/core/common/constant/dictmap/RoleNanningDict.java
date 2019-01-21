package com.youedata.nncloud.core.common.constant.dictmap;

import com.youedata.nncloud.core.common.constant.dictmap.base.AbstractDictMap;

/**
 * Created by sky on 2018/11/26.
 * 修改用户状态（禁用/启用）的记录日志
 */
public class RoleNanningDict extends AbstractDictMap{
    @Override
    public void init() {
        put("roleName","");
        put("roleId","");
    }

    @Override
    protected void initBeWrapped() {
        putFieldWrapperMethodName("roleName","getRoleNameNanning");
        putFieldWrapperMethodName("roleId","getRoleNameNanningById");
    }
}
