package com.dancing_orangutan.ukkikki.controller.member;

import com.dancing_orangutan.ukkikki.dto.AuthTokens;
import com.dancing_orangutan.ukkikki.dto.MemberLoginRequest;
import com.dancing_orangutan.ukkikki.dto.MemberLoginResponse;
import com.dancing_orangutan.ukkikki.dto.MemberRegisterRequest;
import com.dancing_orangutan.ukkikki.global.response.ApiUtils;
import com.dancing_orangutan.ukkikki.global.util.CookieUtil;
import com.dancing_orangutan.ukkikki.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
        CookieUtil.addRefreshTokenCookie(response, tokens.refreshToken());

        return ResponseEntity.ok(
                ApiUtils.success(MemberLoginResponse.builder()
                        .accessToken(tokens.accessToken())
                        .build()
                )
        );
    }






}
