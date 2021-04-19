package com.ruoyi.project.system.manage.controller;

import com.ruoyi.framework.web.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/manage")
public class ProductController extends BaseController {

    @GetMapping("/productManage")
    public String home(HttpServletRequest request, HttpServletResponse response) {
        return "manage/productManage";
    }

    /*@GetMapping("/home/cpzx")
    public String cpzx(HttpServletRequest request, HttpServletResponse response) {
        return "manage/productManage";
    }*/
}
