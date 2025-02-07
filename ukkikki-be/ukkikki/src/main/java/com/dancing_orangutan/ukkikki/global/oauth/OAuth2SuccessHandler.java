package com.dancing_orangutan.ukkikki.global.oauth;

import com.dancing_orangutan.ukkikki.global.jwt.JwtTokenProvider;
import com.dancing_orangutan.ukkikki.global.util.CookieUtils;
import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import com.dancing_orangutan.ukkikki.member.infrastructure.member.MemberRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

@AllArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2UserDetails userDetails = (OAuth2UserDetails) authentication.getPrincipal();

        MemberEntity member = memberRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        String accessToken = jwtTokenProvider.createAccessToken(member.getMemberId(), member.getEmail());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getMemberId(), member.getEmail());

        CookieUtils.addRefreshTokenCookie(response, refreshToken);
        CookieUtils.addAccessTokenCookie(response, accessToken);

        response.sendRedirect("http://i12c204.p.ssafy.io/");
    }
}
