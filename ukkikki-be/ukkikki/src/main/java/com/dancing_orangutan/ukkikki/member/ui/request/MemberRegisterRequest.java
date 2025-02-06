package com.dancing_orangutan.ukkikki.member.ui.request;

import lombok.Getter;

@Getter
public class MemberRegisterRequest{
        private String name;
        private String email;
        private String password;
        private String profileImageUrl;
}
