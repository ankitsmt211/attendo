package com.springsecurity.attendance.response;

import org.springframework.http.HttpStatus;

public record Response(HttpStatus status,String message) { }
