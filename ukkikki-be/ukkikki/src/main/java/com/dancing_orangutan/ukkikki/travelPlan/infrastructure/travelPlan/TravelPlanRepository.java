package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan;

import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
import com.dancing_orangutan.ukkikki.entity.member.MemberEntity;
import com.dancing_orangutan.ukkikki.repository.member.MemberFinder;
import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.city.CityFinder;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.keyword.KeywordFinder;
import com.dancing_orangutan.ukkikki.travelPlan.mapper.TravelPlanMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TravelPlanRepository {

	private final JpaTravelPlanRepository jpaTravelPlanRepository;

	private final TravelPlanMapper travelPlanMapper;

	private final CityFinder cityFinder;

	private final KeywordFinder keywordFinder;

	private final MemberFinder memberFinder;

	public TravelPlan save(final TravelPlan travelPlanDomain) {

		CityEntity arrivalCity = cityFinder.getReferenceById(travelPlanDomain.getArrivalCityId());
		CityEntity departureCity = cityFinder.getReferenceById(travelPlanDomain.getDepartureCityId());
		List<KeywordEntity> keywords =travelPlanDomain.getKeywords()
				.stream()
				.map(keywordFinder::getReferenceById)
				.toList();
		MemberEntity member = memberFinder.getReferenceById(travelPlanDomain.getMemberId());

		TravelPlanEntity travelPlanEntity = TravelPlanEntity.builder()
				.arrivalCity(arrivalCity)
				.departureCity(departureCity)
				.name(travelPlanDomain.getName())
				.startDate(travelPlanDomain.getStartDate())
				.endDate(travelPlanDomain.getEndDate())
				.planningStatus(travelPlanDomain.getPlanningStatus())
				.minPeople(travelPlanDomain.getMinPeople())
				.maxPeople(travelPlanDomain.getMaxPeople())
				.keywords(keywords)
				.memberId(member.getMemberId())
				.adultCount(travelPlanDomain.getAdultCount())
				.infantCount(travelPlanDomain.getInfantCount())
				.childCount(travelPlanDomain.getChildCount())
				.build();

		return travelPlanMapper.entityToDomain(
				jpaTravelPlanRepository.save(travelPlanEntity));
	}
}
