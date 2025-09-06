package com.example.auth_backend.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String home() {
        return "index"; // renders index.html in templates
    }

    @GetMapping("/home")
    public String homePage() {
        return "index"; // renders index.html in templates
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // renders login.html in templates
    }

    @GetMapping("/signup")
    public String signup() {
        return "signup"; // renders signup.html in templates
    }

    @GetMapping("/ai-services")
    public String aiServices() {
        return "ai-services"; // renders ai-services.html
    }
}
