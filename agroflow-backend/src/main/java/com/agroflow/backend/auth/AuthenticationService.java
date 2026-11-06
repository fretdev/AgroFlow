package com.agroflow.backend.auth;

import com.agroflow.backend.auth.dto.AuthenticationRequest;
import com.agroflow.backend.auth.dto.AuthenticationResponse;
import com.agroflow.backend.security.jwt.JwtService;
import com.agroflow.backend.user.User;
import com.agroflow.backend.user.UserRepository;
import com.agroflow.backend.user.dto.UserRegistrationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticationResponse register(UserRegistrationRequest request){
        var user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .phoneNumber(request.phoneNumber())
                .systemRole(request.systemRole())
                .publicId(UUID.randomUUID())
                .isActive(true)
                .build();
       User savedUser =  repository.save(user);
        var jwtToken = jwtService.generateToken(savedUser);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(),
                request.password()));
        var user = repository.findByEmail(request.email())
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
