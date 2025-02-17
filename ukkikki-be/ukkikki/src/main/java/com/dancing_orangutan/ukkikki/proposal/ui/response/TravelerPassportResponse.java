package com.dancing_orangutan.ukkikki.proposal.ui.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class TravelerPassportResponse {
    private final Integer travelerId;
    private final String koreanName;
    private final String englishName;
    private final String passportNumber;
    private final LocalDate expirationDate;
    private final LocalDate birthDate;
    private final String phoneNumber;

    @Builder
    public TravelerPassportResponse(Integer travelerId, String koreanName, String englishName,
                                    String passportNumber, LocalDate expirationDate, LocalDate birthDate,
                                    String phoneNumber) {
        this.travelerId = travelerId;
        this.koreanName = koreanName;
        this.englishName = englishName;
        this.passportNumber = passportNumber;
        this.expirationDate = expirationDate;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
    }
}
