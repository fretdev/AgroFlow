package com.agroflow.backend.security.jwt;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)throws ServletException, IOException{
        try{
            Optional<String> token = extractToken(request);
            if(token.isPresent() && SecurityContextHolder.getContext().getAuthentication() == null){
                String tokenValue = token.get();
                authenticate(tokenValue,request);
            }
        }catch(JwtException | IllegalArgumentException e){
            log.warn("Authentication request failed token validation: {}", e.getMessage());
        }
        filterChain.doFilter(request,response);
    }
    private void authenticate(String token,HttpServletRequest request){
        Optional<String> username = jwtService.getUsername(token);
        if(username.isEmpty()){
            return;
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(username.get());
        if (jwtService.isTokenValid(token, userDetails)) {
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }
    private Optional<String> extractToken(HttpServletRequest request){
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String Bearer_prefix = "Bearer ";
        if(authHeader == null || !authHeader.startsWith(Bearer_prefix)){
            return Optional.empty();
        }
        String token = authHeader.substring(Bearer_prefix.length());
        return token.isEmpty() ? Optional.empty() : Optional.of(token);
    }
}
