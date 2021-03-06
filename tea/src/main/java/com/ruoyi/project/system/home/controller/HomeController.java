package com.ruoyi.project.system.home.controller;

import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.project.system.index.domain.ManageIndex;
import com.ruoyi.project.system.index.service.IManageIndexService;
import com.ruoyi.project.system.manage.product.domain.ManageProduct;
import com.ruoyi.project.system.manage.product.service.IManageProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController extends BaseController {

    @Autowired
    private IManageProductService manageProductService;
    @Autowired
    private IManageIndexService manageIndexService;

    @GetMapping("/home")
    public String home(ModelMap model) {
        ManageIndex index = new ManageIndex();
        index.setType("1");
        List<ManageIndex> list = manageIndexService.selectManageIndexList(index);
        model.put("indexDataList1", list);
        index.setType("2");
        list = manageIndexService.selectManageIndexList(index);
        model.put("indexDataList2", list);
        return "home/index";
    }

    @GetMapping("/home/cpzx")
    public String cpzx(ModelMap mmap) {
        List<Map<String,Object>> productTypeList = manageProductService.selectProductList();
        mmap.put("productTypeList", productTypeList);
        return "home/cpzx";
    }

    @GetMapping("/home/ppjs")
    public String ppjs(ModelMap model) {
        ManageIndex index = new ManageIndex();
        index.setType("3");
        List<ManageIndex> list = manageIndexService.selectManageIndexList(index);
        model.put("indexDataList1", list);
        index.setType("4");
        list = manageIndexService.selectManageIndexList(index);
        model.put("indexDataList2", list);
        return "home/ppjs";
    }

    @GetMapping("/home/productDetail/{id}")
    public String productDetail(@PathVariable("id") Long id, ModelMap mmap) {
        ManageProduct manageProduct = manageProductService.selectManageProductById(id);
        mmap.put("manageProduct", manageProduct);
        return "home/productDetail";
    }

    @GetMapping("/home/stores")
    public String stores(ModelMap mmap) {
        /*List<Map<String,Object>> productTypeList = manageProductService.selectProductList();
        mmap.put("productTypeList", productTypeList);*/
        return "home/stores";
    }

    @GetMapping("/home/fans")
    public String fans(ModelMap mmap) {
        /*List<Map<String,Object>> productTypeList = manageProductService.selectProductList();
        mmap.put("productTypeList", productTypeList);*/
        return "home/fans";
    }
}
