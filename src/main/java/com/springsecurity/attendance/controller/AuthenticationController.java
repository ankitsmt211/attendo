package com.springsecurity.attendance.controller;

import com.springsecurity.attendance.dto.LoginDto;
import com.springsecurity.attendance.dto.RegisterDto;
import com.springsecurity.attendance.response.CustomResponse;
import com.springsecurity.attendance.service.AuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin
public class AuthenticationController {
   private AuthenticationService authenticationService;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService=authenticationService;
    }

    @PostMapping ("/login")
    public CustomResponse login(@RequestBody LoginDto loginDto) throws AuthenticationException{
        return authenticationService.login(loginDto);
    }
    @PostMapping("/register")
    public CustomResponse register(@RequestBody RegisterDto registerDto){
      return authenticationService.register(registerDto);
    }
}
