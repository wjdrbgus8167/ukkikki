package com.dancing_orangutan.ukkikki.member.infrastructure.member;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import com.dancing_orangutan.ukkikki.member.domain.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberFinder {

	private final MemberRepository jpaMemberRepository;

	public MemberEntity findById(Integer memberId) {
		return jpaMemberRepository.findById(memberId).orElse(null);
	}

	public MemberEntity findNameByEmail(String email) {
		return jpaMemberRepository.findByEmail(email).orElseThrow(()->new ApiException(ErrorCode.MEMBER_NOT_FOUND));
	}

}
