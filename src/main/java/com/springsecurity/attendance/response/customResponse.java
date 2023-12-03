package com.springsecurity.attendance.response;

import org.springframework.http.HttpStatus;

public record customResponse(HttpStatus status, String message) { }
