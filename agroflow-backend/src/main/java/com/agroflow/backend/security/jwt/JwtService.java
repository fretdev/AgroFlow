package com.agroflow.backend.security.jwt;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {
    private String  ROLES_CLAIM = "roles";
    private final SecretKey jwtSecretKey;
    private final JwtProperties jwtProperties;
    private final JwtParser jwtParser;

    public String generateToken(UserDetails user){
        Instant now = Instant.now();
        Instant expiry = now.plus(jwtProperties.jwtExpiration());

        List<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .toList();

        return Jwts.builder()
                .id(UUID.randomUUID().toString())
                .subject(user.getUsername())
                .issuer(jwtProperties.issuer())
                .claim(ROLES_CLAIM,roles)
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(jwtSecretKey)
                .compact();
    }

    private Optional<Claims> parseClaims(String token){
        try{
            return Optional.of(jwtParser.parseSignedClaims(token).getPayload());
        }catch(ExpiredJwtException e){
            log.debug("JWT Expired");
        }catch(JwtException | IllegalArgumentException e){
            log.warn("Invalid JWT Token: {}",e.getMessage());
        }
        return  Optional.empty();
    }

    public Optional<String> getUsername(String token){
        return parseClaims(token).map(Claims::getSubject);
    }

    public List<String> getRoles(String token){
        return parseClaims(token).map(claims -> claims.get(ROLES_CLAIM))
                .filter(List.class::isInstance)
                .map(raw -> ((List<?>) raw) .stream().map(String::valueOf).toList())
                .orElse(List.of());
    }
    public boolean isTokenValid(String token,UserDetails user){
        final String username = getUsername(token).orElse(null);
        return username != null && username.equals(user.getUsername()) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token){
        return parseClaims(token).map(claims -> claims.getExpiration().before(new Date()))
                .orElse(true);
    }
}
