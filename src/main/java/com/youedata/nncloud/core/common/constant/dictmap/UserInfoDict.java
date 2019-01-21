package com.youedata.nncloud.core.common.constant.dictmap;

import com.youedata.nncloud.core.common.constant.dictmap.base.AbstractDictMap;

/**
 * Created by sky on 2018/11/26.
 * 注册的记录日志
 */
public class UserInfoDict  extends AbstractDictMap{
    @Override
    public void init() {
        put("userInfoId","");
        put("userInfoName","");
        put("userInfoCode","");
        put("userInfoNamePwd","");
        put("userInfoNamePwdNew","");
        put("userInfoIndex","");
        put("userInfoNamePwdReword","");
    }

    @Override
    protected void initBeWrapped() {
        putFieldWrapperMethodName("userInfoId","getUserInfoNameById");
        putFieldWrapperMethodName("userInfoName","getUserInfoNameByName");
        putFieldWrapperMethodName("userInfoCode","getUserInfoCode");
        putFieldWrapperMethodName("userInfoNamePwd","getUserInfoNamePwd");
        //putFieldWrapperMethodName("userInfoTel","getGovUser");
    }
}
