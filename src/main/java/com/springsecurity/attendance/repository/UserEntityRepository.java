package com.springsecurity.attendance.repository;

import com.springsecurity.attendance.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserEntityRepository extends JpaRepository<UserEntity,Integer> {
    Optional<UserEntity> findByEmail(String email);


    Optional<UserEntity> findByUsername(String username);

    void deleteByEmail(String email);
}
