package com.dancing_orangutan.ukkikki.member.ui;

import com.dancing_orangutan.ukkikki.global.security.CompanyUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.member.application.CompanyService;
import com.dancing_orangutan.ukkikki.member.application.command.UpdateCompanyProfileImageCommand;
import com.dancing_orangutan.ukkikki.member.ui.response.GetCompanyProfileImageResponse;
import com.dancing_orangutan.ukkikki.member.ui.response.GetCompanyProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/companies")
public class CompanyController {
    private final CompanyService companyService;
    /**
     * 여행사 프로필 조회
     */
    @GetMapping("/profile")
    public ApiUtils.ApiResponse<?> getCompanyProfile(
            @AuthenticationPrincipal CompanyUserDetails companyUserDetails
    ){
        return ApiUtils.success(
                GetCompanyProfileResponse.builder()
                        .email(companyUserDetails.getEmail())
                        .ceoName(companyUserDetails.getCeoName())
                        .companyName(companyUserDetails.getCompanyName())
                        .businessRegistrationNumber(companyUserDetails.getBusinessRegistrationNumber())
                        .profileImageUrl(companyUserDetails.getProfileImageUrl())
                        .phoneNumber(companyUserDetails.getPhoneNumber())
                        .build()
        );
    }

    /**
     * 여행사 프로필 이미지 수정
     */
    @PutMapping("/profile/image")
    public ApiUtils.ApiResponse<?> updateCompanyProfileImage(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal CompanyUserDetails companyUserDetails
    ) {
        UpdateCompanyProfileImageCommand command = UpdateCompanyProfileImageCommand.builder()
                .companyId(companyUserDetails.getCompanyId())
                .file(file)
                .build();
        ;
        return ApiUtils.success(companyService.updateCompanyProfileImage(command));
    }

    /**
     * 여행사 프로필 이미지 조회
     */
    @GetMapping("/profile/image")
    public ApiUtils.ApiResponse<?> getCompanyProfileImage(
            @AuthenticationPrincipal CompanyUserDetails companyUserDetails
    ){
        return ApiUtils.success(GetCompanyProfileImageResponse.builder()
                .profileImageUrl(companyUserDetails.getProfileImageUrl())
                .build()
        );
    }

}
