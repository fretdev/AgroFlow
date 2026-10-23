package com.agroflow.backend.user.dto;

import com.agroflow.backend.user.SystemRole;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Getter
public class UserResponse {
    private final UUID publicId;

    private final String fullName;

    private final String email;

    private final String phoneNumber;

    private final SystemRole systemRole;

    private final boolean isActive;

    private final LocalDateTime createdAt;

    private final LocalDateTime updatedAt;
}
