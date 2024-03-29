package com.springsecurity.attendance.controller;

import com.springsecurity.attendance.dto.UpdateUserDto;
import com.springsecurity.attendance.dto.UserDto;
import com.springsecurity.attendance.model.Subject;
import com.springsecurity.attendance.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/students")
@CrossOrigin
public class StudentController {
    private final StudentService studentService;
    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<UserDto> getStudent(Authentication authentication){
        return studentService.getStudent(authentication.getName());
    }

    @DeleteMapping
    public String removeStudent(Authentication authentication){
        return studentService.removeStudent(authentication.getName());
    }

    @PostMapping("/subjects")
    public ResponseEntity<Subject> addSubject(@RequestBody Subject subject, Authentication authentication) throws Exception {
        return studentService.addSubject(subject, authentication);
    }
    @DeleteMapping("/subjects/{subjectId}")
    public ResponseEntity<List<Subject>> removeSubject(@PathVariable Integer subjectId, Authentication authentication) {
        return studentService.removeSubject(subjectId,authentication);
    }

    @PutMapping("/subjects/is-present")
    public ResponseEntity<Subject> increaseAttendance(@RequestBody Integer subjectId,Authentication authentication) throws Exception {
        return studentService.increaseAttendance(subjectId,authentication);
    }


    @PutMapping("/subjects/is-absent")
    public ResponseEntity<Subject> decreaseAttendance(@RequestBody Integer subjectId, Authentication authentication) throws Exception {
        return studentService.decreaseAttendance(subjectId, authentication);
    }

    @PutMapping("/subjects/reset/{subid}")
    public String resetAttendance(@PathVariable Integer subid, Authentication authentication) throws Exception {
        return studentService.resetAttendance(subid,authentication);
    }

    @GetMapping("/subjects")
    public List<Subject> getSubjects(Authentication authentication) throws Exception {
       return studentService.getSubjects(authentication);

    }

    @GetMapping("/subjects/{subid}/attendance")
    public double getAttendance(Authentication authentication, @PathVariable Integer subid){
        return studentService.getAttendancePercentage(authentication,subid);
    }

    @PutMapping
    public ResponseEntity<UserDto> updateStudent(Authentication authentication, @RequestBody UpdateUserDto updateUserDto){
        return studentService.updateStudent(authentication.getName(),updateUserDto);
    }
}
