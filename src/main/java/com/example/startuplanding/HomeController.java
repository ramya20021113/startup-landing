package com.example.startuplanding;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index.html";
    }
    
    @GetMapping("/home")
    public String homePage() {
        return "index.html";
    }
    
    @GetMapping("/about")
    public String about() {
        return "about.html";
    }
}
