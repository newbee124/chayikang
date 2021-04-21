package com.ruoyi.project.system.manage.product.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.project.system.dict.domain.DictData;
import com.ruoyi.project.system.dict.service.IDictDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.project.system.manage.product.mapper.ManageProductMapper;
import com.ruoyi.project.system.manage.product.domain.ManageProduct;
import com.ruoyi.project.system.manage.product.service.IManageProductService;
import com.ruoyi.common.utils.text.Convert;

/**
 * 11Service业务层处理
 * 
 * @author caoyl
 * @date 2021-04-19
 */
@Service
public class ManageProductServiceImpl implements IManageProductService 
{
    @Autowired
    private ManageProductMapper manageProductMapper;
    @Autowired
    private IDictDataService dictDataService;

    /**
     * 查询11
     * 
     * @param id 11ID
     * @return 11
     */
    @Override
    public ManageProduct selectManageProductById(Long id)
    {
        return manageProductMapper.selectManageProductById(id);
    }

    /**
     * 查询11列表
     * 
     * @param manageProduct 11
     * @return 11
     */
    @Override
    public List<ManageProduct> selectManageProductList(ManageProduct manageProduct)
    {
        return manageProductMapper.selectManageProductList(manageProduct);
    }


    @Override
    public List<Map<String,Object>> selectProductList()
    {
        List<Map<String,Object>> mapList = new ArrayList<>();
        DictData dictData = new DictData();
        dictData.setDictType("product_category");
        dictData.setStatus("0");
        List<DictData> dictDataList = dictDataService.selectDictDataList(dictData);
        for (DictData dict : dictDataList) {
            Map<String,Object> dictMap = new HashMap<>();
            dictMap.put("categoryValue",dict.getDictValue());
            dictMap.put("categoryName",dict.getDictLabel());
            ManageProduct manageProduct = new ManageProduct();
            manageProduct.setCategory(dict.getDictValue());
            manageProduct.setStatus(0);
            List<ManageProduct> productList = manageProductMapper.selectManageProductList(manageProduct);
            dictMap.put("productList",productList);
            mapList.add(dictMap);
        }
        return mapList;
    }

    /**
     * 新增11
     * 
     * @param manageProduct 11
     * @return 结果
     */
    @Override
    public int insertManageProduct(ManageProduct manageProduct)
    {
        manageProduct.setCreateTime(DateUtils.getNowDate());
        return manageProductMapper.insertManageProduct(manageProduct);
    }

    /**
     * 修改11
     * 
     * @param manageProduct 11
     * @return 结果
     */
    @Override
    public int updateManageProduct(ManageProduct manageProduct)
    {
        manageProduct.setUpdateTime(DateUtils.getNowDate());
        return manageProductMapper.updateManageProduct(manageProduct);
    }

    /**
     * 删除11对象
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    @Override
    public int deleteManageProductByIds(String ids)
    {
        return manageProductMapper.deleteManageProductByIds(Convert.toStrArray(ids));
    }

    /**
     * 删除11信息
     * 
     * @param id 11ID
     * @return 结果
     */
    @Override
    public int deleteManageProductById(Long id)
    {
        return manageProductMapper.deleteManageProductById(id);
    }
}
