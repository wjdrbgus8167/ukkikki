package com.dancing_orangutan.ukkikki.global.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider implements InitializingBean {

    private final JwtProperties jwtProperties;
    private Key signingKey;

    @Override
    public void afterPropertiesSet(){
        byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecretKey());
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * 액세스 토큰 생성
     */
    public String createAccessToken(Integer userId, String email) {
        return createToken(userId, email, jwtProperties.getAccessExpiration());
    }

    /**
     * 리프레시 토큰 생성
     */
    public String createRefreshToken(Integer userId, String email){
        return createToken(userId, email, jwtProperties.getRefreshExpiration());
    }

    /**
     * JWT 토큰 생성
     */
    private String createToken(Integer userId, String email,long expiration) {
        return Jwts.builder()
                .subject(email)
                .claim("userId", userId)
                .signWith(signingKey)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .compact();
    }


    /**
     * 토큰 유효성 검사
     */
    public boolean isValidToken(String token) {
        try {
            Jwts.parser().setSigningKey(signingKey).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            System.out.println("Invalid JWT signature.");
        } catch (ExpiredJwtException e) {
            System.out.println("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            System.out.println("JWT token is empty.");
        }
        return false;
    }

    /**
     * 토큰에서 사용자 ID 추출
     */
    public Integer getUserId(String token) {
        return getClaims(token).get("userId", Integer.class);
    }

    /**
     * 토큰에서 이메일 추출
     */
    public String getEmail(String token) {
        return getClaims(token).getSubject();
    }

    /**
     * 토큰이 만료되었는지 확인
     */
    public boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    /**
     * 토큰의 Claims 파싱
     */
    private Claims getClaims(String token) {

        return Jwts.parser()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
