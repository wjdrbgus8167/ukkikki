package com.dancing_orangutan.ukkikki.global.config;

import com.dancing_orangutan.ukkikki.global.oauth.CustomOAuth2UserService;
import com.dancing_orangutan.ukkikki.global.oauth.OAuth2SuccessHandler;
import com.dancing_orangutan.ukkikki.global.security.*;
import com.dancing_orangutan.ukkikki.global.jwt.JwtTokenProvider;
import com.dancing_orangutan.ukkikki.member.infrastructure.member.JpaMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AppConfig appConfig;
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JpaMemberRepository jpaMemberRepository;
    private final CorsFilter corsFilter;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;
    /**
     * 비밀번호 암호화 설정
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * JWT 인증 필터 설정
     */
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtTokenProvider, customUserDetailsService);
    }

    @Bean
    public OAuth2SuccessHandler oAuth2SuccessHandler() {
        return new OAuth2SuccessHandler(jwtTokenProvider, jpaMemberRepository, appConfig);
    }

    @Bean
    public JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint() {
        return new JwtAuthenticationEntryPoint();
    }

    @Bean
    public JwtAccessDeniedHandler jwtAccessDeniedHandler() {
        return new JwtAccessDeniedHandler();
    }



    /**
     * Spring Security 설정
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)  // CORS 필터 추가
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(permitAll).permitAll()

                        .requestMatchers("/companies/**").hasRole("COMPANY")
                        .requestMatchers("/members/**").hasRole("MEMBER")

                        // === ProposalController (여행계획 내 제안서 관련) ===
                        // 회원 전용 엔드포인트
                        .requestMatchers(HttpMethod.GET, "/travel-plans/*/proposals").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.GET, "/travel-plans/*/proposals/*").hasAnyRole("MEMBER", "COMPANY")
                        .requestMatchers(HttpMethod.POST, "/travel-plans/*/proposals/*/inquiries").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.GET, "/travel-plans/*/proposals/*/inquiries").hasAnyRole("MEMBER", "COMPANY")
                        .requestMatchers(HttpMethod.POST, "/travel-plans/*/proposals/*/vote-survey").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.POST, "/travel-plans/*/proposals/*/vote-survey/*").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.PUT, "/travel-plans/*/proposals/*/confirm").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.POST, "/travel-plans/*/proposals/*/travelers").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.GET, "/travel-plans/*/proposals/schedules/vote-survey").hasRole("MEMBER")

                        // 기업 전용 엔드포인트 (ProposalController)
                        .requestMatchers(HttpMethod.POST, "/travel-plans/*/proposals").hasRole("COMPANY")
                        .requestMatchers(HttpMethod.PUT, "/travel-plans/*/proposals/*").hasRole("COMPANY")
                        .requestMatchers(HttpMethod.PUT, "/travel-plans/*/proposals/*/inquiries/*").hasRole("COMPANY")
                        .requestMatchers(HttpMethod.POST, "/travel-plans/*/proposals/*/schedules").hasRole("COMPANY")
                        .requestMatchers(HttpMethod.DELETE, "/travel-plans/*/proposals/*/schedules/*").hasRole("COMPANY")
                        .requestMatchers(HttpMethod.PUT, "/travel-plans/*/proposals/*/schedules/*").hasRole("COMPANY")

                        // === CompanyProposalController (여행사 제안서 관련, URL: /proposals) ===
                        .requestMatchers(HttpMethod.GET, "/proposals").hasRole("COMPANY")
                        .requestMatchers(HttpMethod.GET, "/proposals/*").hasRole("COMPANY")
                        .requestMatchers(HttpMethod.GET, "/proposals/*/passports").hasRole("COMPANY")

                        // === PlaceController (여행계획 장소 및 태그, 좋아요 관련) ===
                        .requestMatchers(HttpMethod.POST, "/travel-plans/*/places").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.POST, "/travel-plans/*/places/*/tags").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.DELETE, "/travel-plans/*/tags/*").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.POST, "/travel-plans/*/places/*/likes").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.DELETE, "/travel-plans/*/places/*/likes").hasRole("MEMBER")

                        // === TravelPlanController (여행계획 관련) ===
                        .requestMatchers(HttpMethod.POST, "/travel-plans").hasRole("MEMBER")   // 여행계획 생성
                        .requestMatchers(HttpMethod.POST, "/travel-plans/*").hasRole("MEMBER")  // 여행계획 참가(join)
                        .requestMatchers(HttpMethod.GET, "/travel-plans/search").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.GET, "/travel-plans/list").hasRole("COMPANY")
                        .requestMatchers(HttpMethod.PUT, "/travel-plans/*/comments").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.PUT, "/travel-plans/*/closeTime").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.PUT, "/travel-plans/*/companion").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.GET, "/travel-plans").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.GET, "/travel-plans/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/travel-plans/*/members").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.GET, "/travel-plans/keywords").permitAll()  // 키워드는 인증 없이 접근 가능
                        .requestMatchers(HttpMethod.PUT, "/travel-plans/*/exit").hasRole("MEMBER")
                        .requestMatchers(HttpMethod.PUT, "/travel-plans/*").hasRole("MEMBER") // 여행계획 상태 변경 등
                        .requestMatchers(HttpMethod.GET, "/travel-plans/my-search").hasRole("MEMBER")

                        .anyRequest().authenticated()
                ).exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint())
                        .accessDeniedHandler(jwtAccessDeniedHandler())
                )
                .oauth2Login(oauth -> oauth
                        .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
                        .successHandler(oAuth2SuccessHandler())
                )
                .logout(logout -> logout
                        .logoutUrl("/auth/logout")
                        .logoutSuccessHandler(customLogoutSuccessHandler)
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    private final String[] permitAll = {
            "/auth/**",
            "/oauth2/**",
            "/login/oauth2/code/**",
            "/geography/**",
            "/travel-plans",
            "/ws/**",
            "/sessions/**",
            "/travel-plans/all"
    };

}




