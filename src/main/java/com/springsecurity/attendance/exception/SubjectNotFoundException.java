package com.springsecurity.attendance.exception;

import com.springsecurity.attendance.model.Subject;

public class SubjectNotFoundException extends RuntimeException{
    public SubjectNotFoundException(String message){
        super(message);
    }
}
