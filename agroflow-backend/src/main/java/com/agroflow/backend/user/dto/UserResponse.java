 package com.agroflow.backend.user.dto;

import com.agroflow.backend.user.SystemRole;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record UserResponse (
        UUID publicId,

        String fullName,

        String email,

        String phoneNumber,

        SystemRole systemRole,

        boolean isActive,

        LocalDateTime createdAt,

        LocalDateTime updatedAt
){}