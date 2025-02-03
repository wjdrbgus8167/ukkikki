package com.dancing_orangutan.ukkikki.proposal.infrastructure.company;


import com.dancing_orangutan.ukkikki.member.domain.CompanyEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CompanyFinder {

    private final JpaCompanyRepository jpaCompanyRepository;

    public CompanyEntity getReferenceById(Integer companyId) {
        return jpaCompanyRepository.getReferenceById(companyId);
    }
}
