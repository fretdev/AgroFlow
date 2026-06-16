package com.agroflow.backend.user;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "public_id",nullable = false,unique = true,updatable = false)
    private UUID publicId = UUID.randomUUID();

    @Column(name = "full_name", nullable = false,length = 150)
    private String fullName;

    @Column(name = "email",nullable = false,unique = true,length = 150)
    private String email;

    @Column(name = "password_hash",nullable = false)
    private String passwordHash;

    @Column(name = "phone_number",nullable = false,unique = true,length = 20)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "system_role",nullable = false,length = 20)
    private SystemRole systemRole;

    @Builder.Default
    @Column(name = "is_active",nullable = false)
    private boolean isActive = true;

    @Column(name = "created_at",nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at",nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = LocalDateTime.now();
    }

    public void updateProfile(String fullName, String phoneNumber){
        if(fullName == null || fullName.isBlank()){
            throw new IllegalArgumentException("Full name cannot be blank");
        }
        if(phoneNumber == null || phoneNumber.isBlank()){
            throw new IllegalArgumentException("Phone number cannot be blank");
        }
        this.fullName = fullName;
        this.phoneNumber=phoneNumber;
    }
    public void updatePassword(String newEncryptedHash){
        if(newEncryptedHash == null || newEncryptedHash.isBlank()){
            throw new IllegalArgumentException("Password hash cannot be blank");
        }
        this.passwordHash = newEncryptedHash;
    }

    public void deactivateAccount(){
        this.isActive = false;
    }
    public void activateAccount(){
        this.isActive  = true;
    }

    @Override
    public boolean equals(Object o){
        if(this == o) return true;
        if(!(o instanceof  User user)) return false;
        return id != null && id.equals(user.getId());
    }

    @Override
    public  int hashCode(){
        return getClass().hashCode();
    }
}
