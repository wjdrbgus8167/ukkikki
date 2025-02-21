package com.dancing_orangutan.ukkikki.proposal.infrastructure.company;


import com.dancing_orangutan.ukkikki.member.domain.company.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaCompanyRepository extends JpaRepository<CompanyEntity,Integer> {
}
