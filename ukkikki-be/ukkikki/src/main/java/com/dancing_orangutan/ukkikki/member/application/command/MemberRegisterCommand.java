package com.dancing_orangutan.ukkikki.member.application.command;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberRegisterCommand {
    private final String name;
    private final String email;
    private final String password;
    private final String profileImageUrl;
}
