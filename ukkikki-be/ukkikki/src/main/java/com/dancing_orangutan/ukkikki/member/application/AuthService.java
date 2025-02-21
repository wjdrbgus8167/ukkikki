package com.dancing_orangutan.ukkikki.member.application;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.member.application.command.*;
import com.dancing_orangutan.ukkikki.member.domain.company.CompanyEntity;
import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import com.dancing_orangutan.ukkikki.global.jwt.JwtTokenProvider;
import com.dancing_orangutan.ukkikki.member.domain.refreshToken.RefreshToken;
import com.dancing_orangutan.ukkikki.member.domain.refreshToken.RefreshTokenEntity;
import com.dancing_orangutan.ukkikki.member.infrastructure.refreshToken.RefreshTokenFinder;
import com.dancing_orangutan.ukkikki.member.infrastructure.refreshToken.RefreshTokenRepository;
import com.dancing_orangutan.ukkikki.member.mapper.RefreshTokenMapper;
import com.dancing_orangutan.ukkikki.member.ui.*;
import com.dancing_orangutan.ukkikki.member.infrastructure.company.CompanyRepository;
import com.dancing_orangutan.ukkikki.member.infrastructure.member.JpaMemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@AllArgsConstructor
@Service
public class AuthService {

    private final JpaMemberRepository jpaMemberRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RefreshTokenFinder refreshTokenFinder;

    /**
     * 일반 사용자 회원가입
     */
    @Transactional
    public void memberRegister(MemberRegisterCommand command){
        // 이메일 중복 체크
        if(jpaMemberRepository.findByEmail(command.getEmail()).isPresent() || companyRepository.findByEmail(command.getEmail()).isPresent()){
            throw new ApiException(ErrorCode.EMAIL_ALREADY_IN_USE);
        }

        jpaMemberRepository.save(MemberEntity.builder()
                .email(command.getEmail())
                .password(passwordEncoder.encode(command.getPassword()))
                .name(command.getName())
                .profileImageUrl(command.getProfileImageUrl())
                .provider("")
                .build()
        );
    }

    /**
     *  일반 사용자 로그인 - access token(쿠키), refresh token(쿠키) 발급
     */
    public AuthTokens memberLogin(MemberLoginCommand command) {
        MemberEntity memberEntity = jpaMemberRepository.findByEmail(command.getEmail())
                .orElseThrow(() -> new ApiException(ErrorCode.MEMBER_NOT_FOUND));

        if (!passwordEncoder.matches(command.getPassword(), memberEntity.getPassword())) {
            throw new ApiException(ErrorCode.INVALID_PASSWORD);
        }

        String accessToken = jwtTokenProvider.createAccessToken(memberEntity.getMemberId(), memberEntity.getEmail());
        String refreshToken = jwtTokenProvider.createRefreshToken(memberEntity.getMemberId(), memberEntity.getEmail());
        saveRefreshToken(RefreshToken.builder()
                .email(memberEntity.getEmail())
                .userId(memberEntity.getMemberId())
                .refreshToken(refreshToken)
                .expiration(jwtTokenProvider.getRefreshExpiration())
                .build()
        );

        return AuthTokens.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    /**
     * 여행사 회원가입
     */
    @Transactional
    public void companyRegister(CompanyRegisterCommand command) {
        // 이메일 중복 체크
        if(jpaMemberRepository.findByEmail(command.getEmail()).isPresent() || companyRepository.findByEmail(command.getEmail()).isPresent()){
            throw new ApiException(ErrorCode.EMAIL_ALREADY_IN_USE);
        }

        companyRepository.save(CompanyEntity.builder()
                .email(command.getEmail())
                .password(passwordEncoder.encode(command.getPassword()))
                .ceoName(command.getCeoName())
                .companyName(command.getCompanyName())
                .businessRegistrationNumber(command.getBusinessRegistrationNumber())
                .phoneNumber(command.getPhoneNumber())
                .profileImageUrl(command.getProfileImageUrl())
                .build()
        );
    }
    /**
     * 여행사 로그인
     */
    public AuthTokens companyLogin(CompanyLoginCommand command) {
        CompanyEntity companyEntity = companyRepository.findByEmail(command.getEmail())
                .orElseThrow(() -> new ApiException(ErrorCode.COMPANY_NOT_FOUND));

        if (!passwordEncoder.matches(command.getPassword(), companyEntity.getPassword())) {
            throw new ApiException(ErrorCode.INVALID_PASSWORD);
        }

        String accessToken = jwtTokenProvider.createAccessToken(companyEntity.getCompanyId(), companyEntity.getEmail());
        String refreshToken = jwtTokenProvider.createRefreshToken(companyEntity.getCompanyId(), companyEntity.getEmail());
        saveRefreshToken(RefreshToken.builder()
                .email(companyEntity.getEmail())
                .userId(companyEntity.getCompanyId())
                .refreshToken(refreshToken)
                .expiration(jwtTokenProvider.getRefreshExpiration())
                .build()
        );

        return AuthTokens.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }


    /**
     *  refresh token 저장
     */
    public void saveRefreshToken(RefreshToken refreshToken) {
        refreshTokenRepository.save(RefreshTokenMapper.mapToEntity(refreshToken));
    }

    /**
     * access token 재발급
     */
    public String refreshAccessToken(RefreshAccessTokenCommand command) {
        String refreshToken = command.getRefreshToken().orElseThrow(
                (() -> new ApiException(ErrorCode.MISSING_REFRESH_TOKEN))
        );

        String email = jwtTokenProvider.getEmail(refreshToken);
        int userId = jwtTokenProvider.getUserId(refreshToken);
        RefreshTokenEntity refreshTokenEntity = refreshTokenFinder.findByEmail(email);

        if(!refreshTokenEntity.getRefreshToken().equals(refreshToken) || !refreshTokenEntity.getUserId().equals(userId)){
            throw new ApiException(ErrorCode.INVALID_TOKEN);
        }

        return jwtTokenProvider.createAccessToken(userId, email);
    }

}
