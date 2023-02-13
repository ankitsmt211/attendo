package com.springsecurity.attendance.service;

import com.springsecurity.attendance.model.Subject;
import com.springsecurity.attendance.model.UserEntity;
import com.springsecurity.attendance.repository.SubjectRepository;
import com.springsecurity.attendance.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private final UserEntityRepository userEntityRepository;

    @Autowired
    private final SubjectRepository subjectRepository;

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

    public String addSubject(Subject subject, Authentication authentication) throws Exception {
        String username = authentication.getName();

        Optional<UserEntity> OptionalUserEntity = userEntityRepository.findByEmail(username);

        if (OptionalUserEntity.isPresent()) {
            subject.setUserEntity(OptionalUserEntity.get());
            subjectRepository.save(subject);
            return "subject saved successfully";
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

    public String increaseAttendance(Integer subid, Authentication authentication) throws Exception {
//        Optional<Subject> OptionalSubject = subjectRepository.findById(subid);
//
//        if(OptionalSubject.isPresent()){
//            Subject subject = OptionalSubject.get();
//            subject.setAttendedClasses(subject.getAttendedClasses()+1);
//            subject.setTotalClasses(subject.getTotalClasses()+1);
//            subjectRepository.save(subject);
//            return "attendance marked successfully";
//        }
//
//        throw new Exception("attendance can't be marked");
        Optional<UserEntity> OptionalUser = userEntityRepository.findByEmail(authentication.getName());
        if (OptionalUser.isPresent()) {
            List<Subject> subjects = subjectRepository.findAllByUserEntity(OptionalUser.get());
            for (Subject sub : subjects) {
                if (sub.getSubId() == subid) {
                    sub.setAttendedClasses(sub.getAttendedClasses() + 1);
                    sub.setTotalClasses(sub.getTotalClasses() + 1);
                    subjectRepository.save(sub);
                }
            }
            return "Attendance marked for subject with ID : " + subid + " successfully";
        }
        throw new UsernameNotFoundException("User not found");

    }

    public String decreaseAttendance(Integer subid, Authentication authentication) throws Exception {
//        Optional<Subject> OptionalSubject = subjectRepository.findById(subid);
//
//        if(OptionalSubject.isPresent()){
//            Subject subject = OptionalSubject.get();
//            subject.setAttendedClasses(subject.getAttendedClasses()-1);
//            subject.setTotalClasses(subject.getTotalClasses()+1);
//            subjectRepository.save(subject);
//
//            return "attendance marked successfully";
//        }
//
//        throw new Exception("attendance can't be marked");

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
//        Optional<Subject> OptionalSubject = subjectRepository.findById(subid);
//
//        if(OptionalSubject.isPresent()){
//            Subject subject= OptionalSubject.get();
//            subject.setTotalClasses(0);
//            subject.setAttendedClasses(0);
//            subjectRepository.save(subject);
//            return "reset done";
//        }
//
//        throw new Exception("attendance can't be updated");
//    }

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
}
