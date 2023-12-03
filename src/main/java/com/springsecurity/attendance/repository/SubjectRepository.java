package com.springsecurity.attendance.repository;

import com.springsecurity.attendance.model.UserEntity;
import com.springsecurity.attendance.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
    List<Subject> findAllByUserEntity(UserEntity user);
}
