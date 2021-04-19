package com.ruoyi.project.system.home.controller;

import com.ruoyi.framework.web.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class HomeController extends BaseController {

    @GetMapping("/home")
    public String home(HttpServletRequest request, HttpServletResponse response) {
        return "home";
    }

    @GetMapping("/home/cpzx")
    public String cpzx(HttpServletRequest request, HttpServletResponse response) {
        return "cpzx11";
    }
}
