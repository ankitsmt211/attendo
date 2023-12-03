package com.springsecurity.attendance.response;

import org.springframework.http.HttpStatus;

public class CustomResponse {
  private HttpStatus status;
  private String message;
  private String payload;
  public CustomResponse(HttpStatus status,String message){
    this.status=status;
    this.message=message;
  }

  public CustomResponse(HttpStatus status,String message,String payload){
    this(status,message);
    this.payload=payload;
  }

  public HttpStatus getStatus() {
    return status;
  }

  public void setStatus(HttpStatus status) {
    this.status = status;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getPayload() {
    return payload;
  }

  public void setPayload(String payload) {
    this.payload = payload;
  }
}
