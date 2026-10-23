package com.agroflow.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler{

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json");

        Map<String,Object> data = new HashMap<>();
        data.put("timestamp", LocalDateTime.now());
        data.put("status",HttpStatus.FORBIDDEN.value());
        data.put("error","Forbidden Access");
        data.put("message",accessDeniedException.getMessage());
        data.put("path",request.getRequestURI());

        response.getOutputStream().println(objectMapper.writeValueAsString(data));
    }
}
