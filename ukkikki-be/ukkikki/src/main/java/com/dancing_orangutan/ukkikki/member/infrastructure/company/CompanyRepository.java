package com.dancing_orangutan.ukkikki.member.infrastructure.company;

import com.dancing_orangutan.ukkikki.member.domain.company.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyEntity, Integer> {

    Optional<CompanyEntity> findByEmail(String email);
}
