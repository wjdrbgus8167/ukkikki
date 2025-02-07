package com.dancing_orangutan.ukkikki.member.ui;

import com.dancing_orangutan.ukkikki.global.security.MemberUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.member.application.MemberService;
import com.dancing_orangutan.ukkikki.member.ui.response.GetMemberProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/profile")
    public ResponseEntity<ApiUtils.ApiResponse<?>> getMemberProfile(
            @AuthenticationPrincipal MemberUserDetails memberUserDetails
    ){
        return ResponseEntity.ok(
                ApiUtils.success(
                        GetMemberProfileResponse.builder()
                                .email(memberUserDetails.getEmail())
                                .name(memberUserDetails.getName())
                                .profileImageUrl(memberUserDetails.getProfileImageUrl())
                                .build()
                )
        );
    }

    // 프로필 이미지 수정



}
