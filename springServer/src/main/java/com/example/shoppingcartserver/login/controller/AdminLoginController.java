package com.example.shoppingcartserver.login.controller;

import com.example.shoppingcartserver.login.LoginService;
import com.example.shoppingcartserver.login.request.LoginRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.CredentialException;

/**
 * @author aiden
 */
@RestController
@CrossOrigin
@RequestMapping(path = "/admin/login")
@AllArgsConstructor
public class AdminLoginController {
    private LoginService loginService;

    @PostMapping
    public String login(@RequestBody LoginRequest loginRequest) throws CredentialException {
        return loginService.login(loginRequest);
    }
}
