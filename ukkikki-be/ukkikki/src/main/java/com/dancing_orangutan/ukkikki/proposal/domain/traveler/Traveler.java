package com.dancing_orangutan.ukkikki.proposal.domain.traveler;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class Traveler {

    private final Integer travelerId;
    private final String koreanName;
    private final String englishName;
    private final String passportNumber;
    private final LocalDate expirationDate;
    private final LocalDate birthDate;
    private final String phoneNumber;
    private final Integer proposalId;
    private final Integer travelPlanId;
    private final Integer memberId;

    // 생성자
    @Builder
    public Traveler(Integer travelerId, String koreanName, String englishName, String passportNumber,
                    LocalDate expirationDate, LocalDate birthDate, String phoneNumber,
                    Integer proposalId, Integer travelPlanId, Integer memberId) {
        this.travelerId = travelerId;
        this.koreanName = koreanName;
        this.englishName = englishName;
        this.passportNumber = passportNumber;
        this.expirationDate = expirationDate;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.proposalId = proposalId;
        this.travelPlanId = travelPlanId;
        this.memberId = memberId;
    }
}