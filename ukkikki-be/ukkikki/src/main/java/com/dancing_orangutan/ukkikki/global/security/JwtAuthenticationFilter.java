package com.dancing_orangutan.ukkikki.global.security;

import com.dancing_orangutan.ukkikki.global.jwt.JwtTokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;
    private final static String HEADER_AUTHORIZATION = "Authorization";
    private final static String TOKEN_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            // 헤더에서 access token 추출
            String accessToken = getAccessToken(request);

            if (accessToken != null) {

                // access token이 유효한 경우 인증
                String email = jwtTokenProvider.getEmail(accessToken);
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);

            }

        } catch (ExpiredJwtException e) {
            request.setAttribute("expiredTokenException", e);
        } catch (Exception e) {
            request.setAttribute("invalidTokenException", e);
        }

        filterChain.doFilter(request, response);

    }

    /**
     * 헤더에서 액세스 토큰 추출
     */
    public String getAccessToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(HEADER_AUTHORIZATION);

        return (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX))
                ? authorizationHeader.substring(TOKEN_PREFIX.length())
                : null;
    }

    /***
     * 쿠키에서 리프레시 토큰 추출
     */
    private Optional<String> getRefreshToken(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return Optional.empty();
        }
        return Arrays.stream(request.getCookies())
                .filter(cookie -> "refresh_token".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }

}


