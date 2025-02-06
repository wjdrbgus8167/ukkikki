package com.dancing_orangutan.ukkikki.member.infrastructure.member;

import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberFinder {

	private final MemberRepository memberRepository;

	public MemberEntity getReferenceById(Integer memberId) {
		return memberRepository.getReferenceById(memberId);
	}

	public MemberEntity getById(Integer memberId) {
		return memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 멤버 ID입니다."));
	}

}
