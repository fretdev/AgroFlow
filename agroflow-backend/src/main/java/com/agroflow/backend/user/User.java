package com.agroflow.backend.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "public_id",nullable = false,unique = true,updatable = false)
    private UUID publicId;

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

    @CreatedDate
    @Column(name = "created_at",nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at",nullable = false)
    private LocalDateTime updatedAt;

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of(new SimpleGrantedAuthority(systemRole.name()));
    }
    @Override
    public String getPassword(){
        return passwordHash;
    }
    @Override
    public String getUsername(){
        return email;
    }
    @Override
    public boolean isAccountNonExpired(){
        return true;
    }
    @Override
    public boolean isAccountNonLocked(){
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired(){
        return true;
    }
    @Override
    public boolean isEnabled(){
        return isActive;
    }
}
