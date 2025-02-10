package com.dancing_orangutan.ukkikki.member.ui;

import com.dancing_orangutan.ukkikki.global.security.MemberUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.member.application.MemberService;
import com.dancing_orangutan.ukkikki.member.application.command.UpdateMemberProfileImageCommand;
import com.dancing_orangutan.ukkikki.member.ui.response.GetMemberProfileImageResponse;
import com.dancing_orangutan.ukkikki.member.ui.response.GetMemberProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    /**
     * 일반 사용자 프로필 조회
     */
    @GetMapping("/profile")
    public ApiUtils.ApiResponse<?> getMemberProfile(
            @AuthenticationPrincipal MemberUserDetails memberUserDetails
    ){
        return ApiUtils.success(
                        GetMemberProfileResponse.builder()
                                .email(memberUserDetails.getEmail())
                                .name(memberUserDetails.getName())
                                .profileImageUrl(memberUserDetails.getProfileImageUrl())
                                .build()
                );

    }


    /**
     * 일반 사용자 프로필 이미지 수정
     */
    @PutMapping("/profile/image")
    public ApiUtils.ApiResponse<?> updateMemberProfileImage(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal MemberUserDetails memberUserDetails
    ) {
        UpdateMemberProfileImageCommand command = UpdateMemberProfileImageCommand.builder()
                .memberId(memberUserDetails.getMemberId())
                .file(file)
                .build();

        return ApiUtils.success( memberService.updateMemberProfileImage(command));
    }

    /**
     * 일반 사용자 프로필 이미지 조회
     */
    @GetMapping("/profile/image")
    public ApiUtils.ApiResponse<?> getMemberProfileImage(
            @AuthenticationPrincipal MemberUserDetails memberUserDetails
    ){
        return ApiUtils.success(GetMemberProfileImageResponse.builder()
                .profileImageUrl(memberUserDetails.getProfileImageUrl())
                .build()
        );
    }

}
