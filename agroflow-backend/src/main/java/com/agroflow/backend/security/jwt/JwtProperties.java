package com.agroflow.backend.security.jwt;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.time.Duration;

@Validated
@ConfigurationProperties(prefix = "application.security.jwt")
public record JwtProperties(
        @NotBlank String secretKey,
        @NotNull Duration jwtExpiration,
        @NotBlank String issuer,
        @Min(0) int clockSkewSeconds
) {}
