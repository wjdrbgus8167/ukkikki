package com.dancing_orangutan.ukkikki.proposal.ui.request;

import com.dancing_orangutan.ukkikki.proposal.application.command.UpdateProposalCommand;
import com.dancing_orangutan.ukkikki.proposal.application.command.UpdateScheduleCommand;
import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class UpdateProposalRequest {

    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String airline;
    private String departureAirportCode;
    private String arrivalAirportCode;
    private LocalDateTime startDateBoardingTime;
    private LocalDateTime startDateArrivalTime;
    private LocalDateTime endDateBoardingTime;
    private LocalDateTime endDateArrivalTime;
    private int deposit;
    private int minPeople;
    private boolean guideIncluded;
    private String productIntroduction;
    private String refundPolicy;
    private boolean insuranceIncluded;
    private ProposalStatus proposalStatus;
    private List<UpdateScheduleRequest> scheduleItems;

    @Builder
    public UpdateProposalRequest(String name, LocalDate startDate, LocalDate endDate, String airline,
                                 String departureAirportCode, String arrivalAirportCode, LocalDateTime startDateBoardingTime,
                                 LocalDateTime startDateArrivalTime, LocalDateTime endDateBoardingTime, LocalDateTime endDateArrivalTime,
                                 int deposit, int minPeople, boolean guideIncluded, String productIntroduction,
                                 String refundPolicy, boolean insuranceIncluded, ProposalStatus proposalStatus,
                                 List<UpdateScheduleRequest> scheduleItems) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.airline = airline;
        this.departureAirportCode = departureAirportCode;
        this.arrivalAirportCode = arrivalAirportCode;
        this.startDateBoardingTime = startDateBoardingTime;
        this.startDateArrivalTime = startDateArrivalTime;
        this.endDateBoardingTime = endDateBoardingTime;
        this.endDateArrivalTime = endDateArrivalTime;
        this.deposit = deposit;
        this.minPeople = minPeople;
        this.guideIncluded = guideIncluded;
        this.productIntroduction = productIntroduction;
        this.refundPolicy = refundPolicy;
        this.insuranceIncluded = insuranceIncluded;
        this.proposalStatus = proposalStatus;
        this.scheduleItems = scheduleItems;
    }

    public UpdateProposalCommand toCommand(Integer travelPlanId, Integer companyId,Integer proposalId) {
        validate(name,startDate,endDate,airline,departureAirportCode,arrivalAirportCode,startDateBoardingTime,startDateArrivalTime
                ,endDateArrivalTime,endDateBoardingTime,deposit,minPeople,productIntroduction,refundPolicy);

        return UpdateProposalCommand.builder()
                .name(name)
                .startDate(startDate)
                .endDate(endDate)
                .airline(airline)
                .departureAirportCode(departureAirportCode)
                .arrivalAirportCode(arrivalAirportCode)
                .startDateBoardingTime(startDateBoardingTime)
                .startDateArrivalTime(startDateArrivalTime)
                .endDateBoardingTime(endDateBoardingTime)
                .endDateArrivalTime(endDateArrivalTime)
                .deposit(deposit)
                .minPeople(minPeople)
                .guideIncluded(guideIncluded)
                .productIntroduction(productIntroduction)
                .refundPolicy(refundPolicy)
                .insuranceIncluded(insuranceIncluded)
                .proposalStatus(proposalStatus)
                .travelPlanId(travelPlanId)
                .companyId(companyId)
                .proposalId(proposalId)
                .scheduleItems(
                        scheduleItems != null
                                ? scheduleItems.stream()
                                .map(UpdateScheduleRequest::toCommand)
                                .collect(Collectors.toList())
                                : Collections.<UpdateScheduleCommand>emptyList() // ✅ 명시적 제네릭 추가
                )

                .build();


    }

    private void validate(String name, LocalDate startDate, LocalDate endDate, String airline,
                          String departureAirportCode, String arrivalAirportCode, LocalDateTime startDateBoardingTime,
                          LocalDateTime startDateArrivalTime, LocalDateTime endDateArrivalTime, LocalDateTime endDateBoardingTime,
                          int deposit, int minPeople, String productIntroduction, String refundPolicy) {

        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("제안서 이름을 입력해주세요.");
        }
        if (startDate == null) {
            throw new IllegalArgumentException("시작 날짜를 입력해주세요.");
        }
        if (endDate == null) {
            throw new IllegalArgumentException("종료 날짜를 입력해주세요.");
        }
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("시작 날짜는 종료 날짜보다 이전이어야 합니다.");
        }
        if (airline == null || airline.trim().isEmpty()) {
            throw new IllegalArgumentException("항공사를 입력해주세요.");
        }
        if (departureAirportCode == null || departureAirportCode.trim().isEmpty()) {
            throw new IllegalArgumentException("출발 공항 코드를 입력해주세요.");
        }
        if (arrivalAirportCode == null || arrivalAirportCode.trim().isEmpty()) {
            throw new IllegalArgumentException("도착 공항 코드를 입력해주세요.");
        }
        if (startDateBoardingTime == null) {
            throw new IllegalArgumentException("출발일 탑승 시간을 입력해주세요.");
        }
        if (startDateArrivalTime == null) {
            throw new IllegalArgumentException("출발일 도착 시간을 입력해주세요.");
        }
        if (endDateBoardingTime == null) {
            throw new IllegalArgumentException("귀국일 탑승 시간을 입력해주세요.");
        }
        if (endDateArrivalTime == null) {
            throw new IllegalArgumentException("귀국일 도착 시간을 입력해주세요.");
        }
        if (deposit < 0) {
            throw new IllegalArgumentException("보증금은 0원 이상이어야 합니다.");
        }
        if (minPeople <= 0) {
            throw new IllegalArgumentException("최소 인원은 1명 이상이어야 합니다.");
        }
        if (productIntroduction == null || productIntroduction.trim().isEmpty()) {
            throw new IllegalArgumentException("상품 소개를 입력해주세요.");
        }
        if (refundPolicy == null || refundPolicy.trim().isEmpty()) {
            throw new IllegalArgumentException("환불 정책을 입력해주세요.");
        }

    }
}
