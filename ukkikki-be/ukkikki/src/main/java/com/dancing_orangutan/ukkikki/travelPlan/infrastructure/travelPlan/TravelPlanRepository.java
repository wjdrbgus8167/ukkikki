package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan;

import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
import com.dancing_orangutan.ukkikki.member.domain.MemberEntity;
import com.dancing_orangutan.ukkikki.member.infrastructure.MemberFinder;
import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.*;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.city.CityFinder;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.keyword.KeywordFinder;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
@Slf4j
public class TravelPlanRepository {

	private final JpaTravelPlanRepository jpaTravelPlanRepository;

	private final QueryDslTravelPlanRepository queryDslTravelPlanRepository;

	private final CityFinder cityFinder;

	private final KeywordFinder keywordFinder;

	private final MemberFinder memberFinder;

	public TravelPlan save(final TravelPlan travelPlanDomain) {

		CityEntity arrivalCity = cityFinder.getReferenceById(
				travelPlanDomain.getTravelPlanInfo().arrivalCityId());
		CityEntity departureCity = cityFinder.getReferenceById(
				travelPlanDomain.getTravelPlanInfo().departureCityId());
		List<KeywordEntity> keywords = travelPlanDomain
				.getTravelPlanInfo()
				.keywords()
				.stream()
				.map(keywordFinder::getReferenceById)
				.toList();
		MemberEntity member = memberFinder.getReferenceById(travelPlanDomain.getHost().memberId());

		TravelPlanEntity travelPlanEntity = TravelPlanEntity.builder()
				.name(travelPlanDomain.getTravelPlanInfo().name())
				.arrivalCity(arrivalCity)
				.departureCity(departureCity)
				.name(travelPlanDomain.getTravelPlanInfo().name())
				.startDate(travelPlanDomain.getTravelPlanInfo().startDate())
				.endDate(travelPlanDomain.getTravelPlanInfo().endDate())
				.planningStatus(travelPlanDomain.getTravelPlanInfo().planningStatus())
				.minPeople(travelPlanDomain.getTravelPlanInfo().minPeople())
				.maxPeople(travelPlanDomain.getTravelPlanInfo().maxPeople())
				.keywords(keywords)
				.memberId(member.getMemberId())
				.adultCount(travelPlanDomain.getHost().adultCount())
				.infantCount(travelPlanDomain.getHost().infantCount())
				.childCount(travelPlanDomain.getHost().childCount())
				.build();

		travelPlanEntity.addTravelKeywords(keywords);
		travelPlanEntity.addMemberTravelPlan(member,
				travelPlanDomain.getHost().adultCount(), travelPlanDomain.getHost().childCount(),
				travelPlanDomain.getHost().infantCount(), true);

		TravelPlanEntity entity = jpaTravelPlanRepository.save(travelPlanEntity);

		return TravelPlan.builder()
				.travelPlanInfo(TravelPlanInfo.builder()
						.name(entity.getName())
						.departureCityId(entity.getDepartureCity().getCityId())
						.maxPeople(entity.getMaxPeople())
						.minPeople(entity.getMinPeople())
						.arrivalCityId(entity.getArrivalCity().getCityId())
						.planningStatus(entity.getPlanningStatus())
						.startDate(entity.getStartDate())
						.endDate(entity.getEndDate())
						.keywords(entity.getTravelPlanKeywords()
								.stream()
								.map(travelPlanKeywordEntity -> travelPlanKeywordEntity.getKeyword().getKeywordId())
								.toList())
						.build())
				.build();
	}

	public void joinTravelPlan(final TravelPlan travelPlanDomain) {
		TravelPlanEntity travelPlan = jpaTravelPlanRepository.findById(
						travelPlanDomain.getTravelPlanInfo().travelPlanId())
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 여행 계획입니다."));
		MemberEntity memberEntity = memberFinder.getById(travelPlanDomain.getHost().memberId());

		travelPlan.addMemberTravelPlan(memberEntity, travelPlanDomain.getHost().adultCount(),
				travelPlanDomain.getHost().childCount(), travelPlanDomain.getHost().infantCount(),
				false);
	}

	public TravelPlanRead findAllByTravelPlanId(final Integer travelPlanId,
			final Integer memberId) {
		TravelPlanEntity travelPlanEntity = jpaTravelPlanRepository.findAllByTravelPlanId(
				travelPlanId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 여행 계획입니다."));
		return TravelPlanRead.fromEntity(travelPlanEntity, memberId);
	}

	public List<TravelPlan> searchTravelPlan(final TravelPlan travelPlanDomain) {
		List<TravelPlanEntity> travelPlanEntities = queryDslTravelPlanRepository.searchTravelPlan(
				travelPlanDomain.getTravelPlanInfo().startDate(),
				travelPlanDomain.getTravelPlanInfo().endDate(),
				travelPlanDomain.getTravelPlanInfo().departureCityId(),
				travelPlanDomain.getTravelPlanInfo().arrivalCityId(),
				travelPlanDomain.getTravelPlanInfo().planningStatus(),
				travelPlanDomain.getTravelPlanInfo().keywords()
		);

		return travelPlanEntities.stream()
				.map(entity -> TravelPlan.builder()
						.travelPlanInfo(
								TravelPlanInfo.builder()
										.travelPlanId(entity.getTravelPlanId())
										.name(entity.getName())
										.startDate(entity.getStartDate())
										.endDate(entity.getEndDate())
										.departureCityId(entity.getDepartureCity().getCityId())
										.arrivalCityId(entity.getArrivalCity().getCityId())
										.planningStatus(entity.getPlanningStatus())
										.maxPeople(entity.getMaxPeople())
										.keywords(
												entity.getTravelPlanKeywords().stream()
														.map(keywordEntity -> keywordEntity.getKeyword().getKeywordId())
														.toList()
										)
										.build()
						)
						.host(
								Host.builder()
										.adultCount(entity.getMemberTravelPlans().
												stream()
												.mapToInt(MemberTravelPlanEntity::getAdultCount)
												.sum()
										).childCount(entity.getMemberTravelPlans().
												stream()
												.mapToInt(MemberTravelPlanEntity::getChildCount)
												.sum())
										.infantCount(entity.getMemberTravelPlans().
												stream()
												.mapToInt(MemberTravelPlanEntity::getInfantCount)
												.sum())
										.build()
						)
						.build()
				)
				.toList();
	}


	//TODO : 반복되는 코드 매퍼로 분리해야함
	public List<TravelPlan> fetchTravelPlan(final TravelPlan travelPlanDomain) {
		List<TravelPlanEntity> travelPlanEntities = queryDslTravelPlanRepository.fetchSuggestedTravelPlan(travelPlanDomain.getTravelPlanInfo().planningStatus());

		return travelPlanEntities.stream()
				.map(entity -> TravelPlan.builder()
						.travelPlanInfo(
								TravelPlanInfo.builder()
										.travelPlanId(entity.getTravelPlanId())
										.name(entity.getName())
										.startDate(entity.getStartDate())
										.endDate(entity.getEndDate())
										.departureCityId(entity.getDepartureCity().getCityId())
										.arrivalCityId(entity.getArrivalCity().getCityId())
										.planningStatus(entity.getPlanningStatus())
										.maxPeople(entity.getMaxPeople())
										.keywords(
												entity.getTravelPlanKeywords().stream()
														.map(keywordEntity -> keywordEntity.getKeyword().getKeywordId())
														.toList()
										)
										.build()
						)
						.host(
								Host.builder()
										.adultCount(entity.getMemberTravelPlans().
												stream()
												.mapToInt(MemberTravelPlanEntity::getAdultCount)
												.sum()
										).childCount(entity.getMemberTravelPlans().
												stream()
												.mapToInt(MemberTravelPlanEntity::getChildCount)
												.sum())
										.infantCount(entity.getMemberTravelPlans().
												stream()
												.mapToInt(MemberTravelPlanEntity::getInfantCount)
												.sum())
										.build()
						)
						.build()
				)
				.toList();


	}

}
