package com.springsecurity.attendance.config;

import com.springsecurity.attendance.model.UserEntity;
import com.springsecurity.attendance.repository.UserEntityRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    private  UserEntityRepository userEntityRepository;

    public CustomUserDetailsService(UserEntityRepository userEntityRepository) {
        this.userEntityRepository = userEntityRepository;
    }


    @Override
    public MyUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserEntity> OptionalUserEntity = userEntityRepository.findByEmail(email);

        if(OptionalUserEntity.isPresent()){
            return new MyUserDetails(OptionalUserEntity.get());
        }

        throw new UsernameNotFoundException("user not found");
    }
}
