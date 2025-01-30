package com.dancing_orangutan.ukkikki.dto;

public record MemberLoginRequest(
        String email,
        String password
) {
}
