package com.dancing_orangutan.ukkikki.member.application;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.global.infrastructure.S3FolderName;
import com.dancing_orangutan.ukkikki.global.infrastructure.S3Service;
import com.dancing_orangutan.ukkikki.member.application.command.UpdateCompanyProfileImageCommand;
import com.dancing_orangutan.ukkikki.member.domain.company.CompanyEntity;
import com.dancing_orangutan.ukkikki.member.infrastructure.company.CompanyRepository;
import com.dancing_orangutan.ukkikki.member.ui.response.UpdateCompanyProfileImageResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CompanyService {
    private final S3Service s3Service;
    private final CompanyRepository companyRepository;

    public UpdateCompanyProfileImageResponse updateCompanyProfileImage(UpdateCompanyProfileImageCommand command) {
        CompanyEntity companyEntity = companyRepository.findByCompanyId(command.getCompanyId()).orElseThrow(
                () -> new ApiException(ErrorCode.COMPANY_NOT_FOUND)
        );

        companyEntity.updateProfileImage(s3Service.uploadFile(command.getFile(), S3FolderName.PROFILE));
        companyRepository.save(companyEntity);
        return UpdateCompanyProfileImageResponse.builder()
                .profileImageUrl(companyEntity.getProfileImageUrl())
                .build();
    }
}
