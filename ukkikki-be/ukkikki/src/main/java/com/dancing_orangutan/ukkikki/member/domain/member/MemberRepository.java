package com.dancing_orangutan.ukkikki.member.domain.member;

import java.util.Optional;

public interface MemberRepository {

	Optional<MemberEntity> findById(Integer memberId);

	Optional<MemberEntity> findByEmail(String email);

}
