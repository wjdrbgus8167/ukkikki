package com.dancing_orangutan.ukkikki.global.security;

import com.dancing_orangutan.ukkikki.member.infrastructure.company.CompanyRepository;
import com.dancing_orangutan.ukkikki.member.infrastructure.member.JpaMemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final JpaMemberRepository jpaMemberRepository;
    private final CompanyRepository companyRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return jpaMemberRepository.findByEmail(email)
                .map(member -> (UserDetails) new MemberUserDetails(member))
                .or(() -> companyRepository.findByEmail(email).map(company -> (UserDetails) new CompanyUserDetails(company)))
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email));
    }

}
