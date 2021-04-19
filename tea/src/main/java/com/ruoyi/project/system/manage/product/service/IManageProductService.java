package com.ruoyi.project.system.manage.product.service;

import java.util.List;
import com.ruoyi.project.system.manage.product.domain.ManageProduct;

/**
 * 11Service接口
 * 
 * @author caoyl
 * @date 2021-04-19
 */
public interface IManageProductService 
{
    /**
     * 查询11
     * 
     * @param id 11ID
     * @return 11
     */
    public ManageProduct selectManageProductById(Long id);

    /**
     * 查询11列表
     * 
     * @param manageProduct 11
     * @return 11集合
     */
    public List<ManageProduct> selectManageProductList(ManageProduct manageProduct);

    /**
     * 新增11
     * 
     * @param manageProduct 11
     * @return 结果
     */
    public int insertManageProduct(ManageProduct manageProduct);

    /**
     * 修改11
     * 
     * @param manageProduct 11
     * @return 结果
     */
    public int updateManageProduct(ManageProduct manageProduct);

    /**
     * 批量删除11
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    public int deleteManageProductByIds(String ids);

    /**
     * 删除11信息
     * 
     * @param id 11ID
     * @return 结果
     */
    public int deleteManageProductById(Long id);
}
