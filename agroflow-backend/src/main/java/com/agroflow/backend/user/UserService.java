package com.agroflow.backend.user;

import com.agroflow.backend.user.dto.UserRegistrationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User registerUser(UserRegistrationRequest request){
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new IllegalArgumentException("An account with this email already exists");
        }
        String encryptedPasswordPlaceholder = request.getPassword() + "_SECURE_HASH";
        User newUser = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .passwordHash(encryptedPasswordPlaceholder)
                .phoneNumber(request.getPhoneNumber())
                .systemRole(request.getSystemRole())
                .build();
        return userRepository.save(newUser);
    }
}
