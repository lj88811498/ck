package com.youedata.nncloud.modular.system.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.youedata.nncloud.core.node.ZTreeNode;
import com.youedata.nncloud.modular.system.dao.SysDeptMapper;
import com.youedata.nncloud.modular.system.model.Dept;
import com.youedata.nncloud.modular.system.service.ISysDeptService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SysDeptServiceImpl extends ServiceImpl<SysDeptMapper, Dept> implements ISysDeptService {

    @Resource
    private SysDeptMapper sysDeptMapper;

    @Override
    public void deleteDept(Integer deptId) {
        Dept dept = sysDeptMapper.selectById(deptId);

        Wrapper<Dept> wrapper = new EntityWrapper<>();
        wrapper = wrapper.like("pids", "%[" + dept.getId() + "]%");
        List<Dept> subDepts = sysDeptMapper.selectList(wrapper);
        for (Dept temp : subDepts) {
            temp.deleteById();
        }

        dept.deleteById();
    }

    @Override
    public List<ZTreeNode> tree() {
        return this.baseMapper.tree();
    }

    @Override
    public List<Map<String, Object>> list(String condition) {
        return this.baseMapper.list(condition);
    }
}
