package com.springsecurity.attendance.service;

import com.springsecurity.attendance.dto.UpdateUserDto;
import com.springsecurity.attendance.dto.UserDto;
import com.springsecurity.attendance.model.Subject;
import com.springsecurity.attendance.model.UserEntity;
import com.springsecurity.attendance.repository.SubjectRepository;
import com.springsecurity.attendance.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final UserEntityRepository userEntityRepository;
    private final SubjectRepository subjectRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public StudentService(UserEntityRepository userEntityRepository, SubjectRepository subjectRepository, PasswordEncoder passwordEncoder) {
        this.userEntityRepository = userEntityRepository;
        this.subjectRepository = subjectRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<UserDto> getStudent(String email) {
        Optional<UserEntity> OptionalUserEntity = userEntityRepository.findByEmail(email);

        if (OptionalUserEntity.isPresent()) {
            UserEntity userEntity = OptionalUserEntity.get();
            UserDto userDto = new UserDto(userEntity.getUsername(),userEntity.getEmail());
            return new ResponseEntity<>(userDto,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    public List<Subject> getSubjects(Authentication authentication) throws Exception {
        Optional<UserEntity> OptionalUserEntity = userEntityRepository.findByEmail(authentication.getName());
        if (OptionalUserEntity.isPresent()) {
            return subjectRepository.findAllByUserEntity(OptionalUserEntity.get());
        }
        throw new Exception("User not found");
    }

    public ResponseEntity<Subject> addSubject(Subject subject, Authentication authentication) throws Exception {
        String username = authentication.getName();

        Optional<UserEntity> OptionalUserEntity = userEntityRepository.findByEmail(username);

        if (OptionalUserEntity.isPresent()) {
            subject.setUserEntity(OptionalUserEntity.get());
            subjectRepository.save(subject);
            return new ResponseEntity<>(subject, HttpStatus.ACCEPTED);
        }

        throw new Exception("subject can't be added");
    }

    @Transactional
    public ResponseEntity<List<Subject>> removeSubject(Integer subjectId, Authentication authentication){
        try{
            subjectRepository.deleteById(subjectId);
            List<Subject> updatedSubjects = getSubjects(authentication);
            return new ResponseEntity<>(updatedSubjects,HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Subject> increaseAttendance(Integer subjectId, Authentication authentication){
        Optional<UserEntity> OptionalUser = userEntityRepository.findByEmail(authentication.getName());
        Subject updatedSubject = null;
        if (OptionalUser.isPresent()) {
            List<Subject> subjects = subjectRepository.findAllByUserEntity(OptionalUser.get());
            for (Subject sub : subjects) {
                if (sub.getSubId().equals(subjectId)) {
                    sub.setAttendedClasses(sub.getAttendedClasses() + 1);
                    sub.setTotalClasses(sub.getTotalClasses() + 1);
                    updatedSubject = subjectRepository.save(sub);
                }
            }
            return new ResponseEntity<>(updatedSubject,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Subject> decreaseAttendance(Integer subjectId, Authentication authentication){
        Optional<UserEntity> OptionalUser = userEntityRepository.findByEmail(authentication.getName());
        Subject updatedSubject = null;
        if (OptionalUser.isPresent()) {
            List<Subject> subjects = subjectRepository.findAllByUserEntity(OptionalUser.get());
            for (Subject sub : subjects) {
                if (sub.getSubId().equals(subjectId)) {
                    sub.setTotalClasses(sub.getTotalClasses() + 1);
                    updatedSubject = subjectRepository.save(sub);
                }
            }
           return new ResponseEntity<>(updatedSubject,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public String removeStudent(String email) {
        userEntityRepository.deleteByEmail(email);
        return "student removed from record";
    }

    public String resetAttendance(Integer subid, Authentication authentication) throws Exception {
        Optional<UserEntity> OptionalUser = userEntityRepository.findByEmail(authentication.getName());
        if (OptionalUser.isPresent()) {
            List<Subject> subjects = subjectRepository.findAllByUserEntity(OptionalUser.get());
            for (Subject sub : subjects) {
                if (sub.getSubId() == subid) {
                    sub.setTotalClasses(0);
                    sub.setAttendedClasses(0);
                    subjectRepository.save(sub);
                }
            }
            return "Attendance marked for subject with ID : " + subid + " successfully";
        }
        throw new UsernameNotFoundException("User not found");
    }

    public double getAttendancePercentage(Authentication authentication, Integer subid){
        //percent = attendedclass/total * 100
        //fetch subject
        int attendedClasses = 0;
        int totalClasses = 0;
        Optional<UserEntity> optionalUserEntity = userEntityRepository.findByEmail(authentication.getName());
        if(optionalUserEntity.isPresent()){
            List<Subject> subjects = subjectRepository.findAllByUserEntity(optionalUserEntity.get());
            for(Subject sub: subjects){
                if(sub.getSubId()==subid){
                     attendedClasses = sub.getAttendedClasses();
                     totalClasses = sub.getTotalClasses();
                }
            }
        }

        double attendancePercent = (attendedClasses*100)/totalClasses;

        return attendancePercent;
    }

    public ResponseEntity<UserDto> updateStudent(String email, UpdateUserDto updateUserDto){
        Optional<UserEntity> userEntityOptional = userEntityRepository.findByEmail(email);

        if(userEntityOptional.isPresent()){
            UserEntity retrievedUser = userEntityOptional.orElseThrow();
            retrievedUser.setEmail(updateUserDto.email());
            retrievedUser.setUsername(updateUserDto.username());
            retrievedUser.setPassword(passwordEncoder.encode(updateUserDto.password()));
            UserEntity updatedUserEntity = userEntityRepository.save(retrievedUser);
            UserDto updatedUser = new UserDto(updatedUserEntity.getUsername(),updatedUserEntity.getEmail());
            return new ResponseEntity<>(updatedUser,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
