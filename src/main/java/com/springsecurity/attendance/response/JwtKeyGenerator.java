package com.springsecurity.attendance.response;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
class JwtKeyGenerator {
    public static void main(String[] args) {
        // Generate a secure key for HS512
        SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

        // Now use this secretKey to sign your JWTs
        String jwt = Jwts.builder()
                .setSubject("user@example.com")
                .signWith(secretKey)
                .compact();

        System.out.println("Generated JWT: " + jwt);
    }
}

