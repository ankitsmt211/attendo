package com.springsecurity.attendance.service;

import com.springsecurity.attendance.model.Subject;
import com.springsecurity.attendance.model.UserEntity;
import com.springsecurity.attendance.repository.SubjectRepository;
import com.springsecurity.attendance.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final UserEntityRepository userEntityRepository;
    private final SubjectRepository subjectRepository;

    @Autowired
    public StudentService(UserEntityRepository userEntityRepository, SubjectRepository subjectRepository) {
        this.userEntityRepository = userEntityRepository;
        this.subjectRepository = subjectRepository;
    }

    public UserEntity getStudent(String email) {
        Optional<UserEntity> OptionalUserEntity = userEntityRepository.findByEmail(email);

        if (OptionalUserEntity.isPresent()) {
            return OptionalUserEntity.get();
        }
        throw new UsernameNotFoundException("user doesnt exists");
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


    public String removeSubject(Integer subid, Authentication authentication) throws Exception {
        List<Subject> subjects = getSubjects(authentication);
        for (Subject sub : subjects) {
            if (sub.getSubId() == subid) {
                subjectRepository.deleteById(subid);
                return "Subject with Id :" + subid + "removed successfully";
            }

        }
        throw new Exception("subject not found");
    }

    public ResponseEntity<Subject> increaseAttendance(Integer subjectId, Authentication authentication) throws Exception {
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

    public String decreaseAttendance(Integer subid, Authentication authentication) throws Exception {
        Optional<UserEntity> OptionalUser = userEntityRepository.findByEmail(authentication.getName());
        if (OptionalUser.isPresent()) {
            List<Subject> subjects = subjectRepository.findAllByUserEntity(OptionalUser.get());
            for (Subject sub : subjects) {
                if (sub.getSubId() == subid) {
                    sub.setTotalClasses(sub.getTotalClasses() + 1);
                    subjectRepository.save(sub);
                }
            }
            return "Attendance marked for subject with ID : " + subid + " successfully";
        }
        throw new UsernameNotFoundException("User not found");
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
}
