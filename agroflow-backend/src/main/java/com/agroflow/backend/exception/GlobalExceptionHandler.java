package com.agroflow.backend.exception;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
   @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExists(UserAlreadyExistsException ex, HttpServletRequest request){
       ErrorResponse error = ErrorResponse.builder()
               .timestamp(LocalDateTime.now())
               .status(HttpStatus.CONFLICT.value())
               .error("Registration Conflict")
               .message(ex.getMessage())
               .path(request.getRequestURI())
               .build();
       return new ResponseEntity<>(error,HttpStatus.CONFLICT);
   }
   @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handeValidationException(MethodArgumentNotValidException ex,HttpServletRequest request){
       Map<String,String> errors = new HashMap<>();
       ex.getBindingResult().getFieldErrors().forEach(error ->errors.put(error.getField(),error.getDefaultMessage()));

       ErrorResponse errorResponse = ErrorResponse.builder()
               .timestamp(LocalDateTime.now())
               .status(HttpStatus.BAD_REQUEST.value())
               .error("Validation Failed")
               .message("One or more fields are invalid")
               .errors(errors)
               .path(request.getRequestURI())
               .build();
       return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
   }
   @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex,HttpServletRequest request){
      ex.printStackTrace();

      ErrorResponse error = ErrorResponse.builder()
               .timestamp(LocalDateTime.now())
               .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
               .error("Internal Server Error")
               .message("An unexpected error occurred. Please contact support.")
               .path(request.getRequestURI())
               .build();
       return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
   }
   @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
   public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(org.springframework.dao.DataIntegrityViolationException ex,HttpServletRequest request){
      String message = "The information provided conflicts with existing records.";
      if(ex.getMessage() != null && ex.getMessage().contains("uk_users_phone")){
         message = "A user with this phone number is already registered.";
      }
      ErrorResponse error = ErrorResponse.builder()
              .timestamp(LocalDateTime.now())
              .status(HttpStatus.CONFLICT.value())
              .error("Data Conflict")
              .message(message)
              .path(request.getRequestURI())
              .build();
      return new ResponseEntity<>(error,HttpStatus.CONFLICT);
   }
   @ExceptionHandler(HttpMessageNotReadableException.class)
   public ResponseEntity<ErrorResponse> handleMessageNotReadable(HttpMessageNotReadableException ex, HttpServletRequest request) {
      String message = "Invalid system role. Allowed values: FARMER, TRANSPORTER, MARKETER, ADMIN";

      ErrorResponse error = ErrorResponse.builder()
              .timestamp(LocalDateTime.now())
              .status(HttpStatus.BAD_REQUEST.value())
              .error("Validation Failed")
              .message(message)
              .path(request.getRequestURI())
              .build();
      return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
   }
   @ExceptionHandler(IllegalArgumentException.class)
   public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex, HttpServletRequest request) {
      ErrorResponse error = ErrorResponse.builder()
              .timestamp(LocalDateTime.now())
              .status(HttpStatus.BAD_REQUEST.value())
              .error("Invalid Input")
              .message(ex.getMessage()) // This will say "Invalid System Role: Transporter"
              .path(request.getRequestURI())
              .build();
      return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
   }
   @ExceptionHandler(ResourceNotFoundException.class)
   public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex, HttpServletRequest request){
      ErrorResponse error = ErrorResponse.builder()
              .timestamp(LocalDateTime.now())
              .status(HttpStatus.NOT_FOUND.value())
              .error("Resource Not Found")
              .message(ex.getMessage())
              .path(request.getRequestURI())
              .build();
      return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
   }
   @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handleIllegalState(IllegalStateException ex, HttpServletRequest request){
       ErrorResponse error = ErrorResponse.builder()
               .timestamp(LocalDateTime.now())
               .status(HttpStatus.CONFLICT.value())
               .error("Duplicate Resource Conflict")
               .message(ex.getMessage())
               .path(request.getRequestURI())
               .build();
       return new ResponseEntity<>(error,HttpStatus.CONFLICT);
   }
   @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex,HttpServletRequest request){
       ErrorResponse error = ErrorResponse.builder()
               .timestamp(LocalDateTime.now())
               .status(HttpStatus.FORBIDDEN.value())
               .error("Forbidden access")
               .message(ex.getMessage())
               .path(request.getRequestURI())
               .build();
       return new ResponseEntity<>(error,HttpStatus.FORBIDDEN);
   }
}
