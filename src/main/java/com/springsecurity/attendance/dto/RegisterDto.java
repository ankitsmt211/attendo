package com.springsecurity.attendance.dto;

import jakarta.validation.constraints.NotNull;

public record RegisterDto(@NotNull(message = "username is required") String username,
                          @NotNull(message = "password is required") String password,
                          @NotNull(message = "email is required") String email) {

}
