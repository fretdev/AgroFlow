package com.agroflow.backend.user;

import com.agroflow.backend.exception.UserAlreadyExistsException;
import com.agroflow.backend.user.dto.UserRegistrationRequest;
import com.agroflow.backend.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse registerUser(UserRegistrationRequest request){
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new UserAlreadyExistsException("An account with this email already exists" + request.getEmail());
        }
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        User newUser;
        try {
            newUser = User.builder()
                    .fullName(request.getFullName())
                    .email(request.getEmail())
                    .passwordHash(hashedPassword)
                    .phoneNumber(request.getPhoneNumber())
                    .systemRole(request.getSystemRole())
                    .publicId(UUID.randomUUID())
                    .build();
        } catch (IllegalArgumentException e){
            throw new IllegalStateException("Invalid role provided: "+ request.getSystemRole());
        }
        User savedUser = userRepository.save(newUser);
        return mapToResponse(savedUser);
    }
    private UserResponse mapToResponse(User user){
        return UserResponse.builder()
                .publicId(user.getPublicId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .systemRole(user.getSystemRole())
                .isActive(user.isActive())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
