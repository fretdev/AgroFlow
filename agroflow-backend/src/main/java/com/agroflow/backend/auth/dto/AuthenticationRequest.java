package com.agroflow.backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record AuthenticationRequest (
    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    String email,

    @NotBlank(message = "Password is required")
    String password
){}
