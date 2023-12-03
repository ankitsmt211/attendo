package com.springsecurity.attendance.controller;

import com.springsecurity.attendance.config.JwtService;
import com.springsecurity.attendance.dto.LoginDto;
import com.springsecurity.attendance.dto.RegisterDto;
import com.springsecurity.attendance.model.UserEntity;
import com.springsecurity.attendance.repository.UserEntityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin
public class AuthenticationController {
    @Autowired
    private final JwtService jwtService;


    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final UserEntityRepository userEntityRepository;

    @Autowired
    private final AuthenticationManager authenticationManager;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    public AuthenticationController(JwtService jwtService,  PasswordEncoder passwordEncoder, UserEntityRepository userEntityRepository, AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.userEntityRepository = userEntityRepository;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping ("/login")
    public String Login(@RequestBody LoginDto loginDto){
       Authentication authentication = authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken(loginDto.email(),loginDto.password())
       );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtService.generateToken(authentication);
        logger.info(token);
        return token;
    }
    @PostMapping("/register")
    public String register(@RequestBody RegisterDto registerDto){
        UserEntity user = new UserEntity();
        user.setUsername(registerDto.username());
        user.setPassword(passwordEncoder.encode(registerDto.password()));
        user.setEmail(registerDto.email());
        user.setRole("ROLE_USER");

        userEntityRepository.save(user);

        return "user saved successfully";


    }


}
