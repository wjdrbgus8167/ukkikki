package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common;

import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;


public record TravelPlanResponse(Integer travelPlanId, String name,
								 CityResponse arrivalCity,
								 CityResponse departureCity,
								 LocalDate startDate, LocalDate endDate,
								 PlanningStatus planningStatus, int minPeople, int maxPeople,
								 @JsonInclude(JsonInclude.Include.NON_DEFAULT) int currentParticipants,
								 List<KeywordResponse> keywords,
								 LocalDateTime closeTime,
								 @JsonInclude(JsonInclude.Include.NON_DEFAULT) List<MessageResponse> messages,
								 @JsonInclude(JsonInclude.Include.NON_DEFAULT) boolean hasJoined,
								 @JsonInclude(Include.NON_EMPTY)List<PlaceResponse> places) {

	@Builder
	public TravelPlanResponse {
	}
}