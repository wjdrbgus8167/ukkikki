package com.dancing_orangutan.ukkikki.travelPlan.application.query;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;


public record SearchTravelPlanQuery(LocalDate startDate, LocalDate endDate, Integer departureCityId,
									Integer arrivalCityId, List<Integer> keywords,
									PlanningStatus status) {

	@Builder
	public SearchTravelPlanQuery {
	}

	public void validate() {
		if (startDate == null || endDate == null) {
			throw new IllegalArgumentException("시작일과 종료일은 필수입니다.");
		}
		if (departureCityId == null) {
			throw new IllegalArgumentException("출발 도시 ID가 필요합니다.");
		}
		if (arrivalCityId == null) {
			throw new IllegalArgumentException("도착 도시 ID가 필요합니다.");
		}
		if (startDate.isAfter(endDate)) {
			throw new IllegalArgumentException("시작일은 종료일보다 이후일 수 없습니다.");
		}

	}
}
