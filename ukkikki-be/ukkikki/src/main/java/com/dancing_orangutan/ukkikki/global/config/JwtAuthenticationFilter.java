package com.dancing_orangutan.ukkikki.global.config;

import com.dancing_orangutan.ukkikki.global.security.CustomUserDetailsService;
import com.dancing_orangutan.ukkikki.global.jwt.JwtTokenProvider;
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

        // 헤더에서 access token 추출
        String accessToken = getAccessToken(request);

        // access token이 유효한 경우 인증
        if (accessToken != null && jwtTokenProvider.isValidToken(accessToken)) {
            String email = jwtTokenProvider.getEmail(accessToken);
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // access token이 만료된 경우 401 Unauthorized 반환
        else if (accessToken != null && jwtTokenProvider.isTokenExpired(accessToken)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Access token expired. Please refresh your token.");
            return;
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


