package com.dancing_orangutan.ukkikki.member.ui;

public record MemberRegisterRequest(
        String name,
        String email,
        String password,
        String profileImageUrl
) {
}
