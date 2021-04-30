package com.ruoyi.project.system.index.controller;

import java.util.List;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.project.system.index.domain.ManageIndex;
import com.ruoyi.project.system.index.service.IManageIndexService;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.web.page.TableDataInfo;

/**
 * 角色信息Controller
 * 
 * @author ruoyi
 * @date 2021-04-26
 */
@Controller
@RequestMapping("/system/index")
public class ManageIndexController extends BaseController
{
    private String prefix = "system/index";

    @Autowired
    private IManageIndexService manageIndexService;

    @RequiresPermissions("system:index:view")
    @GetMapping()
    public String index()
    {
        return prefix + "/index";
    }

    /**
     * 查询角色信息列表
     */
    @RequiresPermissions("system:index:list")
    @PostMapping("/list")
    @ResponseBody
    public TableDataInfo list(ManageIndex manageIndex)
    {
        startPage();
        List<ManageIndex> list = manageIndexService.selectManageIndexList(manageIndex);
        return getDataTable(list);
    }

    /**
     * 导出角色信息列表
     */
    @RequiresPermissions("system:index:export")
    @Log(title = "角色信息", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    @ResponseBody
    public AjaxResult export(ManageIndex manageIndex)
    {
        List<ManageIndex> list = manageIndexService.selectManageIndexList(manageIndex);
        ExcelUtil<ManageIndex> util = new ExcelUtil<ManageIndex>(ManageIndex.class);
        return util.exportExcel(list, "角色信息数据");
    }

    /**
     * 新增角色信息
     */
    @GetMapping("/add")
    public String add()
    {
        return prefix + "/add";
    }

    /**
     * 新增保存角色信息
     */
    @RequiresPermissions("system:index:add")
    @Log(title = "角色信息", businessType = BusinessType.INSERT)
    @PostMapping("/add")
    @ResponseBody
    public AjaxResult addSave(ManageIndex manageIndex)
    {
        return toAjax(manageIndexService.insertManageIndex(manageIndex));
    }

    /**
     * 修改角色信息
     */
    @GetMapping("/edit/{id}")
    public String edit(@PathVariable("id") Long id, ModelMap mmap)
    {
        ManageIndex manageIndex = manageIndexService.selectManageIndexById(id);
        mmap.put("manageIndex", manageIndex);
        return prefix + "/edit";
    }

    /**
     * 修改保存角色信息
     */
    @RequiresPermissions("system:index:edit")
    @Log(title = "角色信息", businessType = BusinessType.UPDATE)
    @PostMapping("/edit")
    @ResponseBody
    public AjaxResult editSave(ManageIndex manageIndex)
    {
        return toAjax(manageIndexService.updateManageIndex(manageIndex));
    }

    /**
     * 删除角色信息
     */
    @RequiresPermissions("system:index:remove")
    @Log(title = "角色信息", businessType = BusinessType.DELETE)
    @PostMapping( "/remove")
    @ResponseBody
    public AjaxResult remove(String ids)
    {
        return toAjax(manageIndexService.deleteManageIndexByIds(ids));
    }
}
