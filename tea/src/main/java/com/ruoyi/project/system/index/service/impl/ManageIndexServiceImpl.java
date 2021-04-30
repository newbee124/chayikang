package com.ruoyi.project.system.index.service.impl;

import java.util.List;
import com.ruoyi.common.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.project.system.index.mapper.ManageIndexMapper;
import com.ruoyi.project.system.index.domain.ManageIndex;
import com.ruoyi.project.system.index.service.IManageIndexService;
import com.ruoyi.common.utils.text.Convert;

/**
 * 角色信息Service业务层处理
 * 
 * @author ruoyi
 * @date 2021-04-26
 */
@Service
public class ManageIndexServiceImpl implements IManageIndexService 
{
    @Autowired
    private ManageIndexMapper manageIndexMapper;

    /**
     * 查询角色信息
     * 
     * @param id 角色信息ID
     * @return 角色信息
     */
    @Override
    public ManageIndex selectManageIndexById(Long id)
    {
        return manageIndexMapper.selectManageIndexById(id);
    }

    /**
     * 查询角色信息列表
     * 
     * @param manageIndex 角色信息
     * @return 角色信息
     */
    @Override
    public List<ManageIndex> selectManageIndexList(ManageIndex manageIndex)
    {
        return manageIndexMapper.selectManageIndexList(manageIndex);
    }

    /**
     * 新增角色信息
     * 
     * @param manageIndex 角色信息
     * @return 结果
     */
    @Override
    public int insertManageIndex(ManageIndex manageIndex)
    {
        manageIndex.setCreateTime(DateUtils.getNowDate());
        return manageIndexMapper.insertManageIndex(manageIndex);
    }

    /**
     * 修改角色信息
     * 
     * @param manageIndex 角色信息
     * @return 结果
     */
    @Override
    public int updateManageIndex(ManageIndex manageIndex)
    {
        manageIndex.setUpdateTime(DateUtils.getNowDate());
        return manageIndexMapper.updateManageIndex(manageIndex);
    }

    /**
     * 删除角色信息对象
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    @Override
    public int deleteManageIndexByIds(String ids)
    {
        return manageIndexMapper.deleteManageIndexByIds(Convert.toStrArray(ids));
    }

    /**
     * 删除角色信息信息
     * 
     * @param id 角色信息ID
     * @return 结果
     */
    @Override
    public int deleteManageIndexById(Long id)
    {
        return manageIndexMapper.deleteManageIndexById(id);
    }
}
