package com.springsecurity.attendance.config;

import com.springsecurity.attendance.exception.UserNotFoundException;
import com.springsecurity.attendance.model.UserEntity;
import com.springsecurity.attendance.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    private  UserEntityRepository userEntityRepository;
    @Autowired
    public CustomUserDetailsService(UserEntityRepository userEntityRepository) {
        this.userEntityRepository = userEntityRepository;
    }


    @Override
    public MyUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserEntity> userEntityOptional = userEntityRepository.findByEmail(email);

        return new MyUserDetails(userEntityOptional.orElseThrow(() ->
          new UserNotFoundException("User not found")));
    }
}
