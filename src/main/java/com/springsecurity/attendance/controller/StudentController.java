package com.springsecurity.attendance.controller;

import com.springsecurity.attendance.model.UserEntity;
import com.springsecurity.attendance.model.Subject;
import com.springsecurity.attendance.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/students")
public class StudentController {

    @Autowired
    private final StudentService studentService;


    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public UserEntity getStudent(Authentication authentication){
        return studentService.getStudent(authentication.getName());
    }

    @DeleteMapping
    public String removeStudent(Authentication authentication){
        return studentService.removeStudent(authentication.getName());
    }

    @PostMapping("/subjects")
    public String addSubject(@RequestBody Subject subject, Authentication authentication) throws Exception {
        return studentService.addSubject(subject, authentication);
    }
    @DeleteMapping("/subjects/{subid}")
    public String removeSubject(@PathVariable Integer subid, Authentication authentication) throws Exception {
        return studentService.removeSubject(subid,authentication);
    }

    @PutMapping("/subjects/is-present/{subid}")
    public String increaseAttendance(@PathVariable Integer subid, Authentication authentication) throws Exception {
        return studentService.increaseAttendance(subid, authentication);
    }


    @PutMapping("/subjects/is-absent/{subid}")
    public String decreaseAttendance(@PathVariable Integer subid, Authentication authentication) throws Exception {
        return studentService.decreaseAttendance(subid, authentication);
    }

    @PutMapping("/subjects/reset/{subid}")
    public String resetAttendance(@PathVariable Integer subid, Authentication authentication) throws Exception {
        return studentService.resetAttendance(subid,authentication);
    }

    @GetMapping("/subjects")
    public List<Subject> getSubjects(Authentication authentication) throws Exception {
       return studentService.getSubjects(authentication);

    }
}
