package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.QTravelPlanKeywordEntity;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QueryDslTravelPlanRepository {

	private final JPAQueryFactory queryFactory;

	public List<TravelPlanEntity> searchTravelPlan(
			LocalDate startDate,
			LocalDate endDate,
			Integer departureCityId,
			Integer arrivalCityId,
			PlanningStatus status,
			List<Integer> keywords
	) {
		QTravelPlanEntity entity = QTravelPlanEntity.travelPlanEntity;
		QTravelPlanKeywordEntity keywordEntity = QTravelPlanKeywordEntity.travelPlanKeywordEntity;
		BooleanBuilder booleanBuilder = new BooleanBuilder();

		// 기본 검색 조건
		booleanBuilder.and(entity.startDate.between(startDate, endDate));
		booleanBuilder.and(entity.departureCity.cityId.eq(departureCityId));
		booleanBuilder.and(entity.arrivalCity.cityId.eq(arrivalCityId));

		// 추가 조건(상태)
		if (status != null) {
			booleanBuilder.and(entity.planningStatus.eq(status));
		}

		// 추가 조건(키워드)
		if (keywords != null && !keywords.isEmpty()) {
			booleanBuilder.and(entity.travelPlanKeywords.any().keyword.keywordId.in(keywords));
		}

		return queryFactory
				.selectFrom(entity)
				.leftJoin(entity.travelPlanKeywords, keywordEntity).fetchJoin()
				.where(booleanBuilder)
				.distinct()
				.fetch();
	}

	public List<TravelPlanEntity> fetchSuggestedTravelPlan(
			PlanningStatus status
	) {
		QTravelPlanEntity entity = QTravelPlanEntity.travelPlanEntity;
		BooleanBuilder booleanBuilder = new BooleanBuilder();

		// 추가 조건(상태)
		if (status != null) {
			booleanBuilder.and(entity.planningStatus.eq(status));
		}

		return queryFactory
				.selectFrom(entity)
				.where(booleanBuilder)
				.distinct()
				.fetch();
	}
}
