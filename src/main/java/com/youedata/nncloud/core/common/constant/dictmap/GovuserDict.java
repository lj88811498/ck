package com.youedata.nncloud.core.common.constant.dictmap;

import com.youedata.nncloud.core.common.constant.dictmap.base.AbstractDictMap;

/**
 * Created by sky on 2018/11/26.
 * 修改政府用户的记录日志
 */
public class GovuserDict extends AbstractDictMap{
    @Override
    public void init() {
        put("userInfoId","操作");
    }

    @Override
    protected void initBeWrapped() {
        putFieldWrapperMethodName("userInfoId","getGovUser");
    }
}
