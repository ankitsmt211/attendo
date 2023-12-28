package com.springsecurity.attendance.config;

import com.springsecurity.attendance.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private final UserEntityRepository userEntityRepository;

    public SecurityConfig( UserEntityRepository userEntityRepository) {
        this.userEntityRepository = userEntityRepository;
    }

    //oauth2Login adds oauth filter in the filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.oauth2Login();

// another way to add client registration object
//        http.oauth2Login(c -> {
//            c.clientRegistrationRepository(clientRepository());
//        });

        http
                .authorizeHttpRequests()
                .anyRequest()
                .authenticated();

        return http.build();
    }

    //keeps record of client registration object
//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository(){
//        ClientRegistration clientRegistration = clientRegistration();
//
//        return new InMemoryClientRegistrationRepository(clientRegistration);
//    }


    //exposes auth manager to rest of application
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
//    return authenticationConfiguration.getAuthenticationManager();
//    }

    // CommonOAuthProvider can be used for common auth providers with minimal configuration
//    public ClientRegistration clientRegistration(){
//        return CommonOAuth2Provider
//                .GITHUB
//                .getBuilder("github")
//                .clientId("CLIENT_ID")
//                .clientSecret("CLIENT_SECRET")
//                .build();
//    }

    //finally it can also be configured in properties file, so no need for registration object or repository bean
    //oauth filter is required
}
