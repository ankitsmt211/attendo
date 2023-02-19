package com.springsecurity.attendance.exception;

import org.apache.catalina.User;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message){
        super(message);
    }
}
