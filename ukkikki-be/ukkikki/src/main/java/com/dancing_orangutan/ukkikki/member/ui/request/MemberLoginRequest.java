package com.dancing_orangutan.ukkikki.member.ui.request;

import com.dancing_orangutan.ukkikki.member.validator.ValidEmail;
import com.dancing_orangutan.ukkikki.member.validator.ValidPassword;
import lombok.Getter;

@Getter
public class MemberLoginRequest{
    @ValidEmail
    private String email;
    @ValidPassword
    private String password;
}
