package com.springsecurity.attendance.response;

import org.springframework.http.HttpStatus;

public class CustomResponse {
  private boolean status;
  private String message;
  private String payload;
  public CustomResponse(boolean status,String message){
    this.status=status;
    this.message=message;
  }

  public CustomResponse(boolean status,String message,String payload){
    this(status,message);
    this.payload=payload;
  }

  public boolean getStatus() {
    return status;
  }

  public void setStatus(boolean status) {
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
