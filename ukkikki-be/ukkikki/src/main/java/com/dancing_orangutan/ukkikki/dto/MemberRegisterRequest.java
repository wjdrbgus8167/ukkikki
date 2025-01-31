package com.dancing_orangutan.ukkikki.dto;

public record MemberRegisterRequest(
        String name,
        String email,
        String password,
        String profileImageUrl
) {
}
