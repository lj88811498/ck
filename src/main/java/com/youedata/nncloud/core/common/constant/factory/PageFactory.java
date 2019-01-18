package com.youedata.nncloud.core.common.constant.factory;

import com.baomidou.mybatisplus.plugins.Page;
import com.youedata.nncloud.core.common.constant.state.Order;
import com.youedata.nncloud.core.support.HttpKit;
import com.youedata.nncloud.core.util.ToolUtil;

import javax.servlet.http.HttpServletRequest;

/**
 * BootStrap Table默认的分页参数创建
 *
 * @author fengshuonan
 * @date 2017-04-05 22:25
 */
public class PageFactory<T> {
    public Page<T> defaultPage() {
        HttpServletRequest request = HttpKit.getRequest();
        int limit;
        int offset;
        try {
            limit = Integer.valueOf(request.getParameter("limit"));     //每页多少条数据
            offset = Integer.valueOf(request.getParameter("offset"));   //每页的偏移量(本页当前有多少条)
        } catch (Exception e) {
            limit = 20;
            offset = 0;
        }
        return getPage(limit, offset);
    }

    public boolean getParameter() {
        HttpServletRequest request = HttpKit.getRequest();

        try {
            int  limit = Integer.valueOf(request.getParameter("limit"));     //每页多少条数据
            int  offset = Integer.valueOf(request.getParameter("offset"));   //每页的偏移量(本页当前有多少条)
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    /**
     * size, curPage
     * @Author: Monkey
     * @Param: [pageSize, offsetSize]
     * @Date: Created in  2018/4/23 16:17.
     * @Returns com.baomidou.mybatisplus.plugins.Page<T>
     */
    public Page<T> defaultPage2(int pageSize, int offsetSize) {
        if (getParameter()) {
            return defaultPage();
        }
        //每页多少条数据
        //每页的偏移量(本页当前有多少条,从第几条开始查询)
        return getPage2(pageSize, offsetSize);
    }

    private Page<T> getPage2(int limit, int offset) {
        HttpServletRequest request = HttpKit.getRequest();

        String sort = request.getParameter("sort");         //排序字段名称
        String order = request.getParameter("order");       //asc或desc(升序或降序)
        if (ToolUtil.isEmpty(sort)) {
            Page<T> page = new Page<>(offset, limit);
            page.setOpenSort(false);
            return page;
        } else {
            Page<T> page = new Page<>(offset, limit, sort);
            if (Order.ASC.getDes().equals(order)) {
                page.setAsc(true);
            } else {
                page.setAsc(false);
            }
            return page;
        }
    }

    private Page<T> getPage(int limit, int offset) {
        HttpServletRequest request = HttpKit.getRequest();
        String sort = request.getParameter("sort");         //排序字段名称
        String order = request.getParameter("order");       //asc或desc(升序或降序)
        if (ToolUtil.isEmpty(sort)) {
            Page<T> page = new Page<>((offset / limit + 1), limit);
            page.setOpenSort(false);
            return page;
        } else {
            Page<T> page = new Page<>((offset / limit + 1), limit, sort);
            if (Order.ASC.getDes().equals(order)) {
                page.setAsc(true);
            } else {
                page.setAsc(false);
            }
            return page;
        }
    }
}
