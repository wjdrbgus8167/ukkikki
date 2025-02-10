package com.dancing_orangutan.ukkikki.global.security;

import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@AllArgsConstructor
public class MemberUserDetails implements UserDetails {

    private final MemberEntity memberEntity;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(() -> "ROLE_MEMBER");
    }

    @Override
    public String getPassword() {
        return memberEntity.getPassword();
    }

    @Override
    public String getUsername() {
        return memberEntity.getEmail();
    }

    public Integer getMemberId() {
        return memberEntity.getMemberId();
    }

    public String getEmail() { return memberEntity.getEmail();}

    public String getName() { return memberEntity.getName(); }

    public String getProfileImageUrl() {
        return memberEntity.getProfileImageUrl().equals("") ? "https://ukkikki-bucket.s3.ap-northeast-2.amazonaws.com/profile/ukkikki" + ((memberEntity.getMemberId() % 6) + 1) + ".png" : memberEntity.getProfileImageUrl();
    }

}

