package com.agroflow.backend.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum SystemRole {
    FARMER,
    TRANSPORTER,
    MARKETER,
    ADMIN;

    @JsonCreator
    public static SystemRole fromString(String value){
        if(value ==null || value.trim().isEmpty()){
            return null;
        }
        try{
            return SystemRole.valueOf(value.toUpperCase());
        } catch(IllegalArgumentException e){
            throw new IllegalArgumentException("Invalid System Role: " + value);
        }
    }
    @JsonValue
    public String toValue(){
        return name();
    }
}
