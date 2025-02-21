package com.dancing_orangutan.ukkikki.proposal.ui.request;

import com.dancing_orangutan.ukkikki.proposal.application.command.CreateTravelerCommand;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateTravelerRequest {

    String koreanName;
    String englishName;
    String passportNumber;
    LocalDate expirationDate;
    LocalDate birthDate;
    String phoneNumber;

    @Builder
    public CreateTravelerRequest(String koreanName,String englishName,String passportNumber,LocalDate expirationDate
            ,LocalDate birthDate, String phoneNumber) {

        this.koreanName = koreanName;
        this.englishName = englishName;
        this.passportNumber = passportNumber;
        this.expirationDate = expirationDate;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;

    }

    public CreateTravelerCommand toCommand(Integer travelPlanId,Integer proposalId,Integer memberId) {
        validate(travelPlanId,proposalId,memberId,koreanName,englishName,passportNumber,expirationDate,birthDate,phoneNumber);
        return CreateTravelerCommand.builder()
                .koreanName(koreanName)
                .englishName(englishName)
                .passportNumber(passportNumber)
                .expirationDate(expirationDate)
                .birthDate(birthDate)
                .phoneNumber(phoneNumber)
                .travelPlanId(travelPlanId)
                .proposalId(proposalId)
                .memberId(memberId)
                .build();
    }

    public void validate(Integer travelPlanId,Integer proposalId,Integer memberId,String koreanName,String englishName,String passportNumber,LocalDate expirationDate,LocalDate birthDate,String phoneNumber) {

        if(travelPlanId == null) {
            throw new IllegalArgumentException("여행계획 ID는 필수입니다.");
        }

        if(travelPlanId <=0) {
            throw new IllegalArgumentException("여행계획 ID는 양수이어야 합니다.");
        }

        if(proposalId == null) {
            throw new IllegalArgumentException("제안서 ID는 필수입니다.");
        }

        if(proposalId <=0) {
            throw new IllegalArgumentException("제안서 ID는 양수이어야 합니다.");
        }

        if(memberId == null) {
            throw new IllegalArgumentException("멤버 ID는 필수입니다.");
        }

        if(memberId <=0) {
            throw new IllegalArgumentException("멤버 ID는 양수이어야 합니다.");
        }

        if(koreanName ==null){
            throw new IllegalArgumentException("이름을 입력해주세요.");
        }

        if(englishName ==null){
            throw new IllegalArgumentException("영문 이름을 입력해주세요.");
        }

        if(passportNumber ==null){
            throw new IllegalArgumentException("여권번호를 입력해주세요.");
        }

        if(expirationDate ==null){
            throw new IllegalArgumentException("여권 만료일을 입력해주세요.");
        }

        if(birthDate ==null){
            throw new IllegalArgumentException("생년월일을 입력해주세요.");
        }

        if(phoneNumber ==null){
            throw new IllegalArgumentException("전화번호를 입력해주세요.");
        }
    }
}
