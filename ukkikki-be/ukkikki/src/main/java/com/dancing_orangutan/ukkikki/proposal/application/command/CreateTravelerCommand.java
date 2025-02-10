package com.dancing_orangutan.ukkikki.proposal.application.command;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateTravelerCommand {

    private Integer memberId;
    private Integer travelPlanId;
    private Integer proposalId;
    private String koreanName;
    private String englishName;
    private String passportNumber;
    private LocalDate expirationDate;
    private LocalDate birthDate;
    private String phoneNumber;

    @Builder
    public CreateTravelerCommand(Integer memberId,Integer travelPlanId, Integer proposalId,String koreanName
    , String englishName, String passportNumber, LocalDate expirationDate, LocalDate birthDate,String phoneNumber){

        this.memberId = memberId;
        this.travelPlanId = travelPlanId;
        this.proposalId = proposalId;
        this.koreanName = koreanName;
        this.englishName = englishName;
        this.passportNumber = passportNumber;
        this.expirationDate = expirationDate;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;


    }

}
