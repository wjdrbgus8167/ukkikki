package com.dancing_orangutan.ukkikki.repository.member;

import com.dancing_orangutan.ukkikki.entity.member.MemberEntity;
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
