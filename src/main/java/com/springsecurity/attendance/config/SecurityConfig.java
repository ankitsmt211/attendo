package com.springsecurity.attendance.config;

import com.springsecurity.attendance.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthFilter jwtAuthFilter;
    private final UserEntityRepository userEntityRepository;


    @Autowired
    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserEntityRepository userEntityRepository) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userEntityRepository = userEntityRepository;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        //cors need to enabled, followed by @CrossOrigin annotation on controller for
        //request with auth token
        http.cors().and()
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests()
                .requestMatchers("/api/v1/auth/**").permitAll()
          .requestMatchers("/v3/**", "/swagger-ui/**").permitAll()
                .anyRequest()
                .authenticated()
                        .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
       return new BCryptPasswordEncoder();
    }


    //exposes auth manager to rest of application
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
    return authenticationConfiguration.getAuthenticationManager();
    }

    @Component
    public static class WebConfig implements WebMvcConfigurer {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("*")
                    .allowedMethods("GET","POST", "PUT", "DELETE", "OPTIONS", "HEAD");
        }

    }
}
