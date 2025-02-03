package com.dancing_orangutan.ukkikki.member.ui;

import com.dancing_orangutan.ukkikki.global.oauth.KakaoProperties;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.global.util.CookieUtils;
import com.dancing_orangutan.ukkikki.member.application.AuthService;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final KakaoProperties kakaoProperties;
    private KakaoProperties.Provider.Kakao kakaoProvider;
    private KakaoProperties.Registration.Kakao kakaoRegistration;

    @Value("${base-url.kakao}")
    private String kakaoBaseUrl;

    @PostConstruct
    private void init() {
        this.kakaoProvider = kakaoProperties.getProvider().getKakao();
        this.kakaoRegistration = kakaoProperties.getRegistration().getKakao();
    }

    /**
     * 일반 사용자 이메일 회원가입
     */
    @PostMapping("/members/register")

    public ResponseEntity<ApiUtils.ApiResponse> memberRegister(@RequestBody MemberRegisterRequest request){
        authService.memberRegister(request);

        return ResponseEntity.ok(
                ApiUtils.success("회원가입이 완료되었습니다.")
        );
    }

    /**
     *  일반 사용자 이메일 로그인
     */
    @PostMapping("/members/login")
    public ResponseEntity<ApiUtils.ApiResponse> memberLogin(
            @RequestBody MemberLoginRequest request,
            HttpServletResponse response
    ) {
        AuthTokens tokens = authService.memberLogin(request);
        CookieUtils.addRefreshTokenCookie(response, tokens.refreshToken());

        return ResponseEntity.ok(
                ApiUtils.success(MemberLoginResponse.builder()
                        .accessToken(tokens.accessToken())
                        .build()
                )
        );
    }

    /**
     * 여행사 회원가입
     */
    @PostMapping("/companies/register")
    public ResponseEntity<ApiUtils.ApiResponse<?>> companyRegister(@RequestBody CompanyRegisterRequest request) {
        authService.companyRegister(request);

        return ResponseEntity.ok(
                ApiUtils.success("회원가입이 완료되었습니다.")
        );
    }

    /**
     * 여행사 로그인
     */
    @PostMapping("/companies/login")
    public ResponseEntity<ApiUtils.ApiResponse<?>> companyLogin(
            @RequestBody CompanyLoginRequest request,
            HttpServletResponse response
    ) {
        AuthTokens tokens = authService.companyLogin(request);
        CookieUtils.addRefreshTokenCookie(response, tokens.refreshToken());

        return ResponseEntity.ok(
                ApiUtils.success(CompanyLoginResponse.builder()
                        .accessToken(tokens.accessToken())
                        .build()
                )
        );
    }

    /**
     *  카카오 인증 페이지로 리다이렉트
     */
    @GetMapping("/members/kakao/login")
    public void redirectToKakaoAuth(HttpServletResponse response) throws IOException {
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        String authorizationUrl = String.format(
                "%s%s?response_type=code&client_id=%s&redirect_uri=%s%s",
                kakaoBaseUrl, kakaoProvider.getAuthorizationUri(), kakaoRegistration.getClientId(), baseUrl, kakaoRegistration.getRedirectUri()
        );
        response.sendRedirect(authorizationUrl);
    }

//    @GetMapping("/members/kakao/callback")
//    public void handleKakaoCallback(@RequestParam String code, HttpServletResponse response) throws IOException {
//        WebClient webClient = WebClient.builder().baseUrl(kakaoBaseUrl).build();
//        Map tokenResponse = webClient.post()
//                .uri(kakaoProvider.getTokenUri())
//                .header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
//                .bodyValue(Map.of(
//                        "grant_type", kakaoRegistration.getAuthorizationGrantType(),
//                        "client_id", kakaoRegistration.getClientId(),
//                        "redirect_uri", kakaoRegistration.getRedirectUri(),
//                        "code", code
//                ))
//                .retrieve()
//                .bodyToMono(Map.class)
//                .block();
//        System.out.println("tokenResponse: " + tokenResponse);
//
//        String accessToken = (String) tokenResponse.get("access_token");
//        Map userInfoResponse = webClient.post()
//                .uri(kakaoProvider.getUserInfoUri())
//                .header("Authorization", "Bearer " + accessToken)
//                .retrieve()
//                .bodyToMono(Map.class)
//                .block();
//        System.out.println("userInfoResponse : " + userInfoResponse);
//    }

}
