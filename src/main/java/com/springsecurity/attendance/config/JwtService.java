package com.springsecurity.attendance.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtService {


    public String generateToken(Authentication authentication){
        String username=authentication.getName();
        Date currentDate = new Date();
        Date expiration = new Date(currentDate.getTime()+SecurityConstants.JWT_EXPIRATION);


        String token =
                Jwts.builder()
                        .setSubject(username)
                        .setIssuedAt(currentDate)
                        .setExpiration(expiration)
                        .signWith(SignatureAlgorithm.HS512,SecurityConstants.JWT_SECRET)
                        .compact();

        return token;
    }

    public String extractUsernameFromToken(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(SecurityConstants.JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean isTokenValid(String token){
        try {
            Jwts.parser().setSigningKey(SecurityConstants.JWT_SECRET).parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        }
    }
}
