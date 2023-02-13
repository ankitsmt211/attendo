package com.springsecurity.attendance.config;

import com.springsecurity.attendance.repository.UserEntityRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component

public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private final UserEntityRepository userEntityRepository;

    @Autowired
    private final JwtService jwtService;

    @Autowired
    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthFilter(UserEntityRepository userEntityRepository, JwtService jwtService, CustomUserDetailsService customUserDetailsService) {
        this.userEntityRepository = userEntityRepository;
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if(authHeader!=null && authHeader.startsWith("Bearer ")){
            String token = authHeader.substring(7);

            //extract name
            String username = jwtService.extractUsernameFromToken(token);
            //check validity

            if(jwtService.isTokenValid(token)){
                MyUserDetails user = customUserDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        null,
                        user.getAuthorities()
                );

                //verify this line

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

        }

        filterChain.doFilter(request,response);
    }
}
