package com.example.shoppingcartserver.password.controller;


import com.example.shoppingcartserver.password.ForgotPasswordService;
import com.example.shoppingcartserver.password.request.ForgotPasswordRequest;
import com.example.shoppingcartserver.password.request.ForgotResetRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * @author vivek
 */

@RestController
@CrossOrigin
@RequestMapping(path = "/forgot-password")
@AllArgsConstructor
public class ForgotPasswordController {

    private ForgotPasswordService forgotPasswordService;

    /**
     * @param request email
     * @return
     */

    @PostMapping
    public String forgotPassword(@RequestBody ForgotPasswordRequest request)
    {
        return forgotPasswordService.forgotPassword(request);
    }

    @PutMapping
    public String forgetReset(@RequestBody ForgotResetRequest request)
    {
        return forgotPasswordService.forgotReset(request);
    }
}
