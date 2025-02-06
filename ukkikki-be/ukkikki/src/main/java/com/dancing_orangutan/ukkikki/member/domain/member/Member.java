package com.dancing_orangutan.ukkikki.member.domain.member;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Member {

    private String email;
    private String password;
    private String name;
    private String profileImageUrl;
    private String provider;

    @Builder
    public Member(String email, String password, String name, String profileImageUrl, String provider) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.profileImageUrl = profileImageUrl;
        this.provider = provider;
    }
}
