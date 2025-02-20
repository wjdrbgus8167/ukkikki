package com.dancing_orangutan.ukkikki.member.ui.request;

import com.dancing_orangutan.ukkikki.member.validator.ValidEmail;
import com.dancing_orangutan.ukkikki.member.validator.ValidImageUrl;
import com.dancing_orangutan.ukkikki.member.validator.ValidMemberName;
import com.dancing_orangutan.ukkikki.member.validator.ValidPassword;
import lombok.Getter;

@Getter
public class MemberRegisterRequest{
        @ValidMemberName
        private String name;
        @ValidEmail
        private String email;
        @ValidPassword
        private String password;
        @ValidImageUrl
        private String profileImageUrl = "";
}
