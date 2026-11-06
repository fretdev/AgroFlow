package com.agroflow.backend.user.dto;

import com.agroflow.backend.user.SystemRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record UserRegistrationRequest (

    @Size(max = 150,message = "Full name must not exceed 150 characters")
    @NotBlank(message = "Full name is required")
     String fullName,

    @NotBlank(message = "Email is required")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    @Email(message = "Please provide a valid email address")
     String email,

    @Size(min = 8,message = "Password must be at least 8 characters")
    @NotBlank(message = "Password is required")
     String password,

    @NotBlank(message = "Phone number is required")
    @Size(max = 20,message = "Phone number must not exceed 20 characters")
     String phoneNumber,

    @NotNull(message = "System role is required")
     SystemRole systemRole
){}
