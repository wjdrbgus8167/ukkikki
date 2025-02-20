package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.application.query.SearchMyTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.SearchTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.QTravelPlanKeywordEntity;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QueryDslTravelPlanRepository {

	private final JPAQueryFactory queryFactory;

	public List<TravelPlanEntity> searchTravelPlan(
			SearchTravelPlanQuery query
	) {
		QTravelPlanEntity entity = QTravelPlanEntity.travelPlanEntity;
		QTravelPlanKeywordEntity keywordEntity = QTravelPlanKeywordEntity.travelPlanKeywordEntity;
		BooleanBuilder booleanBuilder = new BooleanBuilder();

		// 기본 검색 조건
		booleanBuilder.and(entity.startDate.between(query.startDate(), query.startDate()));
		booleanBuilder.and(entity.departureCity.cityId.eq(query.departureCityId()));
		booleanBuilder.and(entity.arrivalCity.cityId.eq(query.arrivalCityId()));

		// 추가 조건(상태)
		if (query.status() != null) {
			booleanBuilder.and(entity.planningStatus.eq(query.status()));
		}

		// 추가 조건(키워드)
		if (query.keywords() != null && !query.keywords().isEmpty()) {
			booleanBuilder.and(
					entity.travelPlanKeywords.any().keyword.keywordId.in(query.keywords()));
		}

		return queryFactory
				.selectFrom(entity)
				.leftJoin(entity.travelPlanKeywords, keywordEntity).fetchJoin()
				.where(booleanBuilder)
				.distinct()
				.fetch();
	}

	public List<TravelPlanEntity> fetchSuggestedTravelPlans(
	) {
		QTravelPlanEntity entity = QTravelPlanEntity.travelPlanEntity;
		BooleanBuilder booleanBuilder = new BooleanBuilder();

		booleanBuilder.and(entity.planningStatus.eq(PlanningStatus.BIDDING));

		return queryFactory
				.selectFrom(entity)
				.where(booleanBuilder)
				.distinct()
				.fetch();
	}

	public List<TravelPlanEntity> searchMyTravelPlan(SearchMyTravelPlanQuery query){
		QTravelPlanEntity entity = QTravelPlanEntity.travelPlanEntity;
		QTravelPlanKeywordEntity keywordEntity = QTravelPlanKeywordEntity.travelPlanKeywordEntity;
		BooleanBuilder booleanBuilder = new BooleanBuilder();

		if (query.status() != null) {
			booleanBuilder.and(entity.planningStatus.eq(query.status()));
		}

		booleanBuilder.and(entity.memberTravelPlans.any().member.memberId.eq(query.memberId()));

		return queryFactory
				.selectFrom(entity)
				.leftJoin(entity.travelPlanKeywords, keywordEntity).fetchJoin()
				.where(booleanBuilder)
				.distinct()
				.fetch();
	}
}
