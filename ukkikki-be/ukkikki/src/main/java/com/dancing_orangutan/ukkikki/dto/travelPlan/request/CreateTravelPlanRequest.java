package com.dancing_orangutan.ukkikki.dto.travelPlan.request;

import com.dancing_orangutan.ukkikki.command.travelPlan.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.command.travelPlan.CreateTravelPlanCommand.KeywordCommand;
import com.dancing_orangutan.ukkikki.entity.travelPlan.PlanningStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
public class CreateTravelPlanRequest {

	@JsonProperty("travelPlan")
	private TravelPlanRequest travelPlanRequest;

	private HostRequest host;

	@Getter
	@NoArgsConstructor
	public static class HostRequest {
		private int adultCount;
		private int childCount;
		private int infantCount;

		@Builder
		public HostRequest(int adultCount, int childCount, int infantCount) {
			this.adultCount = adultCount;
			this.childCount = childCount;
			this.infantCount = infantCount;
		}
	}

	@Getter
	@NoArgsConstructor
	public static class KeywordRequest {
		private Integer keywordId;

		@Builder
		public KeywordRequest(Integer keywordId) {
			this.keywordId = keywordId;
		}
	}

	@Getter
	@NoArgsConstructor
	public static class TravelPlanRequest {
		private Integer departureCityId;
		private Integer arrivalCityId;
		private String name;
		private LocalDate startDate;
		private LocalDate endDate;
		private List<KeywordRequest> keywords;
		private int minPeople;
		private int maxPeople;
		private PlanningStatus planningStatus;

		@Builder
		public TravelPlanRequest(Integer departureCityId, Integer arrivalCityId, String name,
				LocalDate startDate, LocalDate endDate, List<KeywordRequest> keywords,
				int minPeople, int maxPeople, PlanningStatus planningStatus) {
			this.departureCityId = departureCityId;
			this.arrivalCityId = arrivalCityId;
			this.name = name;
			this.startDate = startDate;
			this.endDate = endDate;
			this.keywords = keywords;
			this.minPeople = minPeople;
			this.maxPeople = maxPeople;
			this.planningStatus = planningStatus;
		}
	}

	@Builder
	public CreateTravelPlanRequest(TravelPlanRequest travelPlanRequest, HostRequest host) {
		this.travelPlanRequest = travelPlanRequest;
		this.host = host;
	}

	// Command 변환 메서드
	public CreateTravelPlanCommand toCommand() {
		return CreateTravelPlanCommand.builder()
				.departureCityId(travelPlanRequest.getDepartureCityId())
				.arrivalCityId(travelPlanRequest.getArrivalCityId())
				.name(travelPlanRequest.getName())
				.startDate(travelPlanRequest.getStartDate())
				.endDate(travelPlanRequest.getEndDate())
				.keywords(convertToKeywordCommands(travelPlanRequest.getKeywords()))
				.minPeople(travelPlanRequest.getMinPeople())
				.maxPeople(travelPlanRequest.getMaxPeople())
				.adultCount(host.getAdultCount())
				.childCount(host.getChildCount())
				.infantCount(host.getInfantCount())
				.planningStatus(travelPlanRequest.getPlanningStatus())
				.build();
	}

	private List<KeywordCommand> convertToKeywordCommands(List<KeywordRequest> requests) {
		return requests.stream()
				.map(req -> KeywordCommand.builder().keywordId(req.getKeywordId()).build())
				.toList();
	}
}
