package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan;


import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
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

	public List<TravelPlanEntity> searchTravelPlan(LocalDate startDate, LocalDate endDate, Integer departureCityId,
			Integer arrivalCityId) {
		QTravelPlanEntity entity = QTravelPlanEntity.travelPlanEntity;
		BooleanBuilder booleanBuilder = new BooleanBuilder();

		booleanBuilder.and(entity.startDate.between(startDate, endDate));
		booleanBuilder.and(entity.departureCity.cityId.eq(departureCityId));
		booleanBuilder.and(entity.arrivalCity.cityId.eq(arrivalCityId));

		return queryFactory
				.selectFrom(entity)
				.where(booleanBuilder)
				.fetch();
	}
}

