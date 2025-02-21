package com.dancing_orangutan.ukkikki.member.application.command;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
public class UpdateMemberProfileImageCommand {
    private final Integer memberId;
    private final MultipartFile file;
}
