package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class TravelPlan {

	private final Integer travelPlanId;
	private final String name;
	private final LocalDate startDate;
	private final LocalDate endDate;
	private final String hostComment;
	private final PlanningStatus planningStatus;
	private final int minPeople;
	private final int maxPeople;
	private final Integer departureCityId;
	private final Integer arrivalCityId;
	private final List<Integer> keywords;
	private final Integer memberId;
	private final int adultCount;
	private final int childCount;
	private final int infantCount;

	@Builder
	public TravelPlan(Integer travelPlanId, String name, LocalDate startDate, LocalDate endDate,
			String hostComment, PlanningStatus planningStatus, int minPeople, int maxPeople,
			Integer departureCityId, Integer arrivalCityId, List<Integer> keywords, Integer memberId, int adultCount, int childCount, int infantCount) {

		validatePeopleRange(minPeople,maxPeople);
		validateDateRange(startDate, endDate);
		this.travelPlanId = travelPlanId;
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.hostComment = hostComment;
		this.planningStatus = planningStatus;
		this.minPeople = minPeople;
		this.maxPeople = maxPeople;
		this.departureCityId = departureCityId;
		this.arrivalCityId = arrivalCityId;
		this.keywords = keywords;
		this.memberId = memberId;
		this.adultCount = adultCount;
		this.infantCount = infantCount;
		this.childCount = childCount;
	}

	private static void validatePeopleRange(int minPeople, int maxPeople) {
		if (minPeople > maxPeople) {
			throw new IllegalArgumentException("잘못된 인원 범위입니다. 최소 인원이 최대 인원보다 클 수 없습니다.");
		}
	}

	private static void validateDateRange(LocalDate startDate, LocalDate endDate) {
		if (startDate.isAfter(endDate)) {
			throw new IllegalArgumentException("잘못된 날짜 범위입니다. 시작일이 종료일보다 늦을 수 없습니다.");
		}
	}
}

