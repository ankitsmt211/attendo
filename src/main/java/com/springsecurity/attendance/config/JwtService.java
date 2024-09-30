package com.springsecurity.attendance.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private long expiration;


    public String generateToken(Authentication authentication){
        String username=authentication.getName();
        Date currentDate = new Date();
        Date expiration = new Date(currentDate.getTime()+this.expiration * 60 * 1000);


        String token =
                Jwts.builder()
                        .setSubject(username)
                        .setIssuedAt(currentDate)
                        .setExpiration(expiration)
                        .signWith(SignatureAlgorithm.HS512,this.secretKey.getBytes())
                        .compact();

        return token;
    }

    public String extractUsernameFromToken(String token){
        try{
            Claims claims = Jwts.parser()
                    .setSigningKey(this.secretKey.getBytes())
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        }

        catch (Exception e){
            throw new AuthenticationCredentialsNotFoundException(e.getMessage());
        }

    }

    public boolean isTokenValid(String token){
        try {
            Jwts.parser().setSigningKey(this.secretKey.getBytes()).parseClaimsJws(token);
            return true;
        }
        catch (Exception ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        }
    }
}
