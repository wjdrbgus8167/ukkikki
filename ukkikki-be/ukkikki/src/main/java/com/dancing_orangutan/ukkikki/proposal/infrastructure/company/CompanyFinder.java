package com.dancing_orangutan.ukkikki.proposal.infrastructure.company;


import com.dancing_orangutan.ukkikki.member.domain.company.CompanyEntity;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CompanyFinder {

    private final JpaCompanyRepository jpaCompanyRepository;

    public CompanyEntity getReferenceById(Integer companyId) {
        return jpaCompanyRepository.findById(companyId)
                .orElseThrow(() -> new EntityNotFoundException("해당 여행사를 찾을 수 없습니다."));
    }
}
