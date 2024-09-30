package com.springsecurity.attendance.dto;

import jakarta.validation.constraints.NotNull;

public record LoginDto(@NotNull(message = "email is required") String email, @NotNull(message = "password is required") String password) {
}
