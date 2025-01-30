package com.dancing_orangutan.ukkikki.service;

import com.dancing_orangutan.ukkikki.dto.AuthTokens;
import com.dancing_orangutan.ukkikki.dto.MemberLoginRequest;
import com.dancing_orangutan.ukkikki.dto.MemberRegisterRequest;
import com.dancing_orangutan.ukkikki.entity.member.Member;
import com.dancing_orangutan.ukkikki.global.jwt.JwtTokenProvider;
import com.dancing_orangutan.ukkikki.repository.member.CompanyRepository;
import com.dancing_orangutan.ukkikki.repository.member.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@AllArgsConstructor
@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 일반 사용자 회원가입
     */
    @Transactional
    public void memberRegister(MemberRegisterRequest request){
        // 이메일 중복 체크
        if(memberRepository.findByEmail(request.email()).isPresent() || companyRepository.findByEmail(request.email()).isPresent()){
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        Member member = Member.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .name(request.name())
                .profileImageUrl(request.profileImageUrl())
                .build();

        memberRepository.save(member);
    }

    /**
     *  일반 사용자 로그인 - access token(body 응답), refresh token(쿠키 전송) 발급
     */
    public AuthTokens memberLogin(MemberLoginRequest request) {
        Member member = memberRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        if (!passwordEncoder.matches(request.password(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 올바르지 않습니다.");
        }

        return AuthTokens.builder()
                        .accessToken(jwtTokenProvider.createAccessToken(member.getMemberId(), member.getEmail()))
                        .refreshToken(jwtTokenProvider.createRefreshToken(member.getMemberId(), member.getEmail()))
                        .build();
    }
}
