package com.dancing_orangutan.ukkikki.global.security;

import com.dancing_orangutan.ukkikki.member.domain.CompanyEntity;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@AllArgsConstructor
public class CompanyUserDetails implements UserDetails {

    private final CompanyEntity companyEntity;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_COMPANY"));
    }

    @Override
    public String getPassword() {
        return companyEntity.getPassword();
    }

    @Override
    public String getUsername() {
        return companyEntity.getEmail();
    }

    public Integer getCompanyId() {
        return companyEntity.getCompanyId();
    }
}
