package com.agroflow.backend.exception;

public class CropAlreadyBookedException extends RuntimeException{
    public CropAlreadyBookedException(String message){
        super(message);
    }
}
