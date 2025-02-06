package com.dancing_orangutan.ukkikki.member.domain.member;

import lombok.Builder;

import java.time.LocalDateTime;

public class Member {

    private Integer memberId;
    private String email;
    private String password;
    private String name;
    private String profileImageUrl;
    private String provider;

    @Builder
    public Member(Integer memberId, String email, String password, String name, String profileImageUrl, String provider) {
        this.memberId = memberId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.profileImageUrl = profileImageUrl;
        this.provider = provider;
    }
}
