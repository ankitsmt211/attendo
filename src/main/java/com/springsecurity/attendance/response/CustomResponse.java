package com.springsecurity.attendance.response;

import org.springframework.http.HttpStatus;

public record CustomResponse(HttpStatus status, String message) {
  public CustomResponse(HttpStatus status,String message,String payload){
    this(status,message);
  }
}
