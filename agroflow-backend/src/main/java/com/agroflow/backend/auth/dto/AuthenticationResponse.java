package com.agroflow.backend.auth.dto;

import lombok.Builder;

@Builder
public record AuthenticationResponse (
     String token
){}
