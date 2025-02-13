package com.dancing_orangutan.ukkikki.member.infrastructure.member;

import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import com.dancing_orangutan.ukkikki.member.domain.member.MemberRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaMemberRepository extends JpaRepository<MemberEntity, Integer>, MemberRepository{
    Optional<MemberEntity> findByEmail(String email);

    Optional<MemberEntity> findByMemberId(Integer memberId);

}
