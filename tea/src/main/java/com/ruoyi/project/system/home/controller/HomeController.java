package com.ruoyi.project.system.home.controller;

import com.ruoyi.framework.web.controller.BaseController;
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

    @GetMapping("/home")
    public String home(HttpServletRequest request, HttpServletResponse response) {
        return "home/index";
    }

    @GetMapping("/home/cpzx")
    public String cpzx(ModelMap mmap) {
        List<Map<String,Object>> productTypeList = manageProductService.selectProductList();
        mmap.put("productTypeList", productTypeList);
        return "home/cpzx";
    }

    @GetMapping("/home/ppjs")
    public String ppjs(ModelMap mmap) {
        List<Map<String,Object>> productTypeList = manageProductService.selectProductList();
        mmap.put("productTypeList", productTypeList);
        return "home/ppjs";
    }

    @GetMapping("/home/productDetail/{id}")
    public String productDetail(@PathVariable("id") Long id, ModelMap mmap) {
        ManageProduct manageProduct = manageProductService.selectManageProductById(id);
        mmap.put("manageProduct", manageProduct);
        return "home/productDetail";
    }
}
