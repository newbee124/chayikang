package com.ruoyi.project.system.manage.product.controller;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.ruoyi.common.constant.FileTypeConstant;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.project.system.manage.product.domain.ManageProduct;
import com.ruoyi.project.system.manage.product.service.IManageProductService;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.web.page.TableDataInfo;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;

import javax.servlet.http.HttpServletRequest;

/**
 * 11Controller
 * 
 * @author caoyl
 * @date 2021-04-19
 */
@Controller
@RequestMapping("/manage/product")
public class ManageProductController extends BaseController
{
    private String prefix = "manage/product";

    @Autowired
    private IManageProductService manageProductService;

    @RequiresPermissions("manage:product:view")
    @GetMapping()
    public String product()
    {
        return prefix + "/product";
    }

    /**
     * 查询11列表
     */
    @RequiresPermissions("manage:product:list")
    @PostMapping("/list")
    @ResponseBody
    public TableDataInfo list(ManageProduct manageProduct)
    {
        startPage();
        List<ManageProduct> list = manageProductService.selectManageProductList(manageProduct);
        return getDataTable(list);
    }

    @PostMapping("/uploadImg")
    @ResponseBody
    public AjaxResult uploadImg(@RequestParam MultipartFile file)  throws IOException
    {
        if (file.isEmpty()) {
            return AjaxResult.error("图片文件不能为空");
        }
        String filename = file.getOriginalFilename();
        String suffix = filename.substring(filename.lastIndexOf(".")+1);
        if (!FileTypeConstant.fileTypeMap.containsKey(suffix)) {
            return AjaxResult.error("文件格式错误");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        filename = "/img/productImg/"+sdf.format(new Date())+"."+suffix;
        String path = this.getClass().getResource("/").getPath()+"static";
        //String picPath = request.getSession().getServletContext().getRealPath("/");
        String imgPath = path+filename;

        File saveFile = new File(imgPath);
        if(!saveFile.exists()) {
            saveFile.getParentFile().mkdir();
            saveFile.createNewFile();
        }
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream(saveFile);
            fileOutputStream.write(file.getBytes());
        } catch (Exception e) {
            logger.info("图片上传异常" , e);
        } finally {
            if (fileOutputStream != null) {
                try {
                    fileOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return AjaxResult.success("上传成功",filename);
    }

    /**
     * 导出11列表
     */
    @RequiresPermissions("manage:product:export")
    @Log(title = "11", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    @ResponseBody
    public AjaxResult export(ManageProduct manageProduct)
    {
        List<ManageProduct> list = manageProductService.selectManageProductList(manageProduct);
        ExcelUtil<ManageProduct> util = new ExcelUtil<ManageProduct>(ManageProduct.class);
        return util.exportExcel(list, "11数据");
    }

    /**
     * 新增11
     */
    @GetMapping("/add")
    public String add()
    {
        return prefix + "/add";
    }

    /**
     * 新增保存11
     */
    @RequiresPermissions("manage:product:add")
    @Log(title = "11", businessType = BusinessType.INSERT)
    @PostMapping("/add")
    @ResponseBody
    public AjaxResult addSave(ManageProduct manageProduct)
    {
        return toAjax(manageProductService.insertManageProduct(manageProduct));
    }

    /**
     * 修改11
     */
    @GetMapping("/edit/{id}")
    public String edit(@PathVariable("id") Long id, ModelMap mmap)
    {
        ManageProduct manageProduct = manageProductService.selectManageProductById(id);
        mmap.put("manageProduct", manageProduct);
        return prefix + "/edit";
    }

    /**
     * 修改保存11
     */
    @RequiresPermissions("manage:product:edit")
    @Log(title = "11", businessType = BusinessType.UPDATE)
    @PostMapping("/edit")
    @ResponseBody
    public AjaxResult editSave(ManageProduct manageProduct)
    {
        return toAjax(manageProductService.updateManageProduct(manageProduct));
    }

    /**
     * 删除11
     */
    @RequiresPermissions("manage:product:remove")
    @Log(title = "11", businessType = BusinessType.DELETE)
    @PostMapping( "/remove")
    @ResponseBody
    public AjaxResult remove(String ids)
    {
        return toAjax(manageProductService.deleteManageProductByIds(ids));
    }
}
