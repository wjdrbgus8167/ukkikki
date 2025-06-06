package com.dancing_orangutan.ukkikki.member.ui;

import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.global.util.CookieUtils;
import com.dancing_orangutan.ukkikki.member.application.AuthService;
import com.dancing_orangutan.ukkikki.member.application.command.*;
import com.dancing_orangutan.ukkikki.member.ui.request.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    /**
     * 일반 사용자 이메일 회원가입
     */
    @PostMapping("/members/register")

    public ApiUtils.ApiResponse<?> memberRegister(@RequestBody @Valid MemberRegisterRequest request){

        MemberRegisterCommand command = MemberRegisterCommand.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .profileImageUrl(request.getProfileImageUrl())
                .build();

        authService.memberRegister(command);

        return ApiUtils.success("회원가입이 완료되었습니다.");

    }

    /**
     *  일반 사용자 이메일 로그인
     */
    @PostMapping("/members/login")
    public ApiUtils.ApiResponse<?> memberLogin(
            @RequestBody @Valid MemberLoginRequest request,
            HttpServletResponse response
    ) {

        MemberLoginCommand command = MemberLoginCommand.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .build();

        AuthTokens tokens = authService.memberLogin(command);
        CookieUtils.addAccessTokenCookie(response, tokens.accessToken());
        CookieUtils.addRefreshTokenCookie(response, tokens.refreshToken());

        return ApiUtils.success("로그인이 완료되었습니다.");

    }

    /**
     * 여행사 회원가입
     */
    @PostMapping("/companies/register")
    public ApiUtils.ApiResponse<?> companyRegister(@RequestBody @Valid CompanyRegisterRequest request) {

        CompanyRegisterCommand command = CompanyRegisterCommand.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .ceoName(request.getCeoName())
                .companyName(request.getCompanyName())
                .businessRegistrationNumber(request.getBusinessRegistrationNumber())
                .phoneNumber(request.getPhoneNumber())
                .profileImageUrl(request.getProfileImageUrl())
                .build();

        authService.companyRegister(command);

        return ApiUtils.success("회원가입이 완료되었습니다.");
    }

    /**
     * 여행사 로그인
     */
    @PostMapping("/companies/login")
    public ApiUtils.ApiResponse<?> companyLogin(
            @RequestBody @Valid CompanyLoginRequest request,
            HttpServletResponse response
    ) {
        CompanyLoginCommand command = CompanyLoginCommand.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .build();

        AuthTokens tokens = authService.companyLogin(command);
        CookieUtils.addAccessTokenCookie(response, tokens.accessToken());
        CookieUtils.addRefreshTokenCookie(response, tokens.refreshToken());

        return ApiUtils.success("로그인이 완료되었습니다.");
    }

    @PostMapping("/token/refresh")
    public ApiUtils.ApiResponse<?> refreshAccessToken(
            HttpServletRequest request,
            HttpServletResponse response
    )
    {
        RefreshAccessTokenCommand command = RefreshAccessTokenCommand.builder()
                .refreshToken(CookieUtils.getRefreshToken(request))
                .build();

        CookieUtils.addAccessTokenCookie(response, authService.refreshAccessToken(command));
        return ApiUtils.success("토큰이 재발급 되었습니다.");
    }

}
