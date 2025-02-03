package com.dancing_orangutan.ukkikki.travelPlan.ui.request;

import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class CreateTravelPlanRequest {

	private TravelPlanInfoUi travelPlan;

	private HostUi host;


	public CreateTravelPlanCommand toCommand(Integer memberId) {
		validate(memberId);
		return CreateTravelPlanCommand
				.builder()
				.memberId(memberId)
				.departureCityId(travelPlan.departureCityId())
				.arrivalCityId(travelPlan.arrivalCityId())
				.name(travelPlan.name())
				.planningStatus(travelPlan.planningStatus())
				.minPeople(travelPlan.minPeople())
				.maxPeople(travelPlan.maxPeople())
				.startDate(travelPlan.startDate())
				.endDate(travelPlan.endDate())
				.keywords(travelPlan.keywords()
						.stream()
						.map(KeywordUi::keywordId)
						.toList())
				.adultCount(host.adultCount())
				.infantCount(host.infantCount())
				.childCount(host.childCount())
				.build();
	}

	private void validate(Integer memberId) {
		if (travelPlan == null || travelPlan.arrivalCityId() < 0 || travelPlan.departureCityId() < 0) {
			throw new IllegalArgumentException("여행 계획 정보는 필수이며 양수여야 합니다.");
		}
		if (host == null) {
			throw new IllegalArgumentException("호스트 정보는 필수입니다.");
		}
		if (memberId == null || memberId <= 0) {
			throw new IllegalArgumentException("회원 ID는 필수이며 양수여야 합니다.");
		}

		if (host.adultCount() + host.childCount() + host.infantCount() < 1) {
			throw new IllegalArgumentException("인원수는 1명 이상 이어야합니다.");
		}
	}
}
