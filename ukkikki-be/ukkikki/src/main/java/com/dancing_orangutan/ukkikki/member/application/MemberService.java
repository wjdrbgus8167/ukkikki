package com.dancing_orangutan.ukkikki.member.application;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.global.infrastructure.S3FolderName;
import com.dancing_orangutan.ukkikki.global.infrastructure.S3Service;
import com.dancing_orangutan.ukkikki.member.application.command.UpdateMemberProfileImageCommand;
import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import com.dancing_orangutan.ukkikki.member.infrastructure.member.JpaMemberRepository;
import com.dancing_orangutan.ukkikki.member.ui.response.UpdateMemberProfileImageResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class MemberService {
    private final S3Service s3Service;
    private final JpaMemberRepository jpaMemberRepository;

    public UpdateMemberProfileImageResponse updateMemberProfileImage(UpdateMemberProfileImageCommand command) {
        MemberEntity memberEntity = jpaMemberRepository.findByMemberId(command.getMemberId()).orElseThrow(
                () -> new ApiException(ErrorCode.MEMBER_NOT_FOUND)
        );

        memberEntity.updateProfileImage(s3Service.uploadFile(command.getFile(), S3FolderName.PROFILE));
        jpaMemberRepository.save(memberEntity);
        return UpdateMemberProfileImageResponse.builder()
                .profileImageUrl(memberEntity.getProfileImageUrl())
                .build();
    }
}
