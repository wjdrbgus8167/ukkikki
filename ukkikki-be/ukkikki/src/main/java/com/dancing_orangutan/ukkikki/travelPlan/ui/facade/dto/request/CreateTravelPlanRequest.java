package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request;


import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.common.CityCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.MemberTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.common.TravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.common.KeywordRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.common.TravelPlanRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Objects;

public record CreateTravelPlanRequest(@JsonProperty("travelPlan") TravelPlanRequest travelPlanRequest,@JsonProperty("host") MemberTravelPlanRequest memberTravelPlanRequest) {


	public CreateTravelPlanCommand toCommand(Integer memberId) {
		validate();
		return new CreateTravelPlanCommand(
				TravelPlanCommand.builder()
						.name(travelPlanRequest.name())
						.startDate(travelPlanRequest.startDate())
						.endDate(travelPlanRequest.endDate())
						.minPeople(travelPlanRequest.minPeople())
						.maxPeople(travelPlanRequest.maxPeople())
						.planningStatus(travelPlanRequest.planningStatus())
						.arrivalCity(CityCommand.builder()
								.cityId(travelPlanRequest().arrivalCityId())
								.build())
						.departureCity(CityCommand.builder()
								.cityId(travelPlanRequest.departureCityId())
								.build())
						.keywords(travelPlanRequest.keywords().stream()
								.map(KeywordRequest::keywordId).toList())
						.memberTravelPlanCommand(MemberTravelPlanCommand.builder()
								.memberId(memberId)
								.adultCount(
										memberTravelPlanRequest.adultCount())
								.infantCount(
										memberTravelPlanRequest.infantCount())
								.childCount(
										memberTravelPlanRequest.childCount())
								.build())
						.build()
		);
	}

	private void validate() {
		if (Objects.isNull(travelPlanRequest.name()) || travelPlanRequest.name().isBlank()) {
			throw new ApiException(ErrorCode.TRAVEL_PLAN_NAME_REQUIRED);
		}
		if (travelPlanRequest.name().length() > 20) {
			throw new ApiException(ErrorCode.TRAVEL_PLAN_NAME_TOO_LONG);
		}
		if (Objects.isNull(travelPlanRequest.startDate())) {
			throw new ApiException(ErrorCode.START_DATE_REQUIRED);
		}
		if (Objects.isNull(travelPlanRequest.endDate())) {
			throw new ApiException(ErrorCode.END_DATE_REQUIRED);
		}
		if (travelPlanRequest.minPeople() < 1) {
			throw new ApiException(ErrorCode.MIN_PEOPLE_REQUIRED);
		}
		if (travelPlanRequest.maxPeople() < travelPlanRequest.minPeople()) {
			throw new ApiException(ErrorCode.MAX_PEOPLE_INVALID);
		}

		if (Objects.isNull(travelPlanRequest.arrivalCityId())) {
			throw new ApiException(ErrorCode.ARRIVAL_CITY_REQUIRED);
		}

		if (Objects.isNull(travelPlanRequest.departureCityId())) {
			throw new ApiException(ErrorCode.DEPARTURE_CITY_REQUIRED);
		}

		if (Objects.isNull(travelPlanRequest.keywords()) || travelPlanRequest.keywords()
				.isEmpty()) {
			throw new ApiException(ErrorCode.KEYWORDS_REQUIRED);
		}

		if (memberTravelPlanRequest.adultCount() < 0
				|| memberTravelPlanRequest.childCount() < 0
				|| memberTravelPlanRequest.infantCount() < 0) {
			throw new ApiException(ErrorCode.PARTICIPANT_COUNT_NEGATIVE);
		}

		if ((memberTravelPlanRequest.adultCount()
				+ memberTravelPlanRequest.infantCount()
				+ memberTravelPlanRequest.childCount()) == 0) {
			throw new ApiException(ErrorCode.PARTICIPANT_COUNT_ZERO);
		}
	}
}