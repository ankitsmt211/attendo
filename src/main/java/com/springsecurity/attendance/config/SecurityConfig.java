package com.springsecurity.attendance.config;

import com.springsecurity.attendance.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private final JwtAuthFilter jwtAuthFilter;

    @Autowired
    private final UserEntityRepository userEntityRepository;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserEntityRepository userEntityRepository) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userEntityRepository = userEntityRepository;
    }


    //oauth2Login adds oauth filter in the filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.oauth2Login();

        http.
                csrf()
                .disable()
                .authorizeHttpRequests()
                .anyRequest()
                .authenticated();

        return http.build();
    }

    //keeps record of client registration object
    @Bean
    public ClientRegistrationRepository clientRegistrationRepository(){
        ClientRegistration clientRegistration = clientRegistration();

        return new InMemoryClientRegistrationRepository(clientRegistration);
    }


    //exposes auth manager to rest of application
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
    return authenticationConfiguration.getAuthenticationManager();
    }

    // CommonOAuthProvider can be used for common auth providers with minimal configuration
    public ClientRegistration clientRegistration(){
        return CommonOAuth2Provider
                .GITHUB
                .getBuilder("github")
                .clientId("CLIENT_ID")
                .clientSecret("CLIENT_SECRET")
                .build();
    }
}
