package com.dancing_orangutan.ukkikki.repository.member;

import com.dancing_orangutan.ukkikki.entity.member.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Integer> {
    Optional<MemberEntity> findByEmail(String email);
}
