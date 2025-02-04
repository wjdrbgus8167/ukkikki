package com.dancing_orangutan.ukkikki.member.infrastructure;

import com.dancing_orangutan.ukkikki.member.domain.MemberEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberFinder {

	private final MemberRepository memberRepository;

	public MemberEntity getReferenceById(Integer memberId) {
		return memberRepository.getReferenceById(memberId);
	}
}
