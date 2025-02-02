package com.dancing_orangutan.ukkikki.global.security;

import com.dancing_orangutan.ukkikki.entity.member.MemberEntity;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@AllArgsConstructor
public class MemberUserDetails implements UserDetails {

    private final MemberEntity member;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(() -> "ROLE_MEMBER");
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public String getUsername() {
        return member.getEmail();
    }

    public Integer getMemberId() {
        return member.getMemberId();
    }
}

