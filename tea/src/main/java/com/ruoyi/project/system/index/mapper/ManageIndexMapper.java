package com.ruoyi.project.system.index.mapper;

import java.util.List;
import com.ruoyi.project.system.index.domain.ManageIndex;

/**
 * 角色信息Mapper接口
 * 
 * @author ruoyi
 * @date 2021-04-26
 */
public interface ManageIndexMapper 
{
    /**
     * 查询角色信息
     * 
     * @param id 角色信息ID
     * @return 角色信息
     */
    public ManageIndex selectManageIndexById(Long id);

    /**
     * 查询角色信息列表
     * 
     * @param manageIndex 角色信息
     * @return 角色信息集合
     */
    public List<ManageIndex> selectManageIndexList(ManageIndex manageIndex);

    /**
     * 新增角色信息
     * 
     * @param manageIndex 角色信息
     * @return 结果
     */
    public int insertManageIndex(ManageIndex manageIndex);

    /**
     * 修改角色信息
     * 
     * @param manageIndex 角色信息
     * @return 结果
     */
    public int updateManageIndex(ManageIndex manageIndex);

    /**
     * 删除角色信息
     * 
     * @param id 角色信息ID
     * @return 结果
     */
    public int deleteManageIndexById(Long id);

    /**
     * 批量删除角色信息
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    public int deleteManageIndexByIds(String[] ids);
}
