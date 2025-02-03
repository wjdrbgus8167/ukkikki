package com.dancing_orangutan.ukkikki.travelPlan.ui.request;

import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand.KeywordCommand;
import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
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
			validate();
		}

		private void validate() {
			if (adultCount < 0 || childCount < 0 || infantCount < 0) {
				throw new IllegalArgumentException("인원 수는 음수일 수 없습니다.");
			}
			if (adultCount + childCount + infantCount < 1) {
				throw new IllegalArgumentException("최소 1명 이상의 호스트가 필요합니다.");
			}
		}
	}

	@Getter
	@NoArgsConstructor
	public static class KeywordRequest {
		private Integer keywordId;

		@Builder
		public KeywordRequest(Integer keywordId) {
			this.keywordId = keywordId;
			validate();
		}

		private void validate() {
			if (keywordId == null || keywordId <= 0) {
				throw new IllegalArgumentException("키워드 ID는 필수이며 양수여야 합니다.");
			}
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
			validate();
		}

		private void validate() {
			if (departureCityId == null || departureCityId <= 0) {
				throw new IllegalArgumentException("출발 도시 ID는 필수이며 양수여야 합니다.");
			}
			if (arrivalCityId == null || arrivalCityId <= 0) {
				throw new IllegalArgumentException("도착 도시 ID는 필수이며 양수여야 합니다.");
			}
			if (name == null || name.isBlank()) {
				throw new IllegalArgumentException("여행 계획 이름은 필수입니다.");
			}
			if (startDate == null || endDate == null || startDate.isAfter(endDate)) {
				throw new IllegalArgumentException("시작일과 종료일이 유효하지 않습니다.");
			}
			if (minPeople <= 0 || maxPeople <= 0 || minPeople > maxPeople) {
				throw new IllegalArgumentException("최소 및 최대 인원이 유효하지 않습니다.");
			}
			if (planningStatus == null) {
				throw new IllegalArgumentException("계획 상태는 필수입니다.");
			}

			if (keywords != null) {
				keywords.forEach(KeywordRequest::validate);
			}
		}
	}

	@Builder
	public CreateTravelPlanRequest(TravelPlanRequest travelPlanRequest, HostRequest host) {
		this.travelPlanRequest = travelPlanRequest;
		this.host = host;
	}

	public CreateTravelPlanCommand toCommand(Integer memberId) {
		if (travelPlanRequest == null) {
			throw new IllegalArgumentException("여행 계획 정보는 필수입니다.");
		}
		if (host == null) {
			throw new IllegalArgumentException("호스트 정보는 필수입니다.");
		}
		if (memberId == null || memberId <= 0) {
			throw new IllegalArgumentException("회원 ID는 필수이며 양수여야 합니다.");
		}

		travelPlanRequest.validate();
		host.validate();

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
				.memberId(memberId)
				.build();
	}

	private List<KeywordCommand> convertToKeywordCommands(List<KeywordRequest> requests) {
		return requests.stream()
				.map(req -> KeywordCommand.builder().keywordId(req.getKeywordId()).build())
				.toList();
	}
}