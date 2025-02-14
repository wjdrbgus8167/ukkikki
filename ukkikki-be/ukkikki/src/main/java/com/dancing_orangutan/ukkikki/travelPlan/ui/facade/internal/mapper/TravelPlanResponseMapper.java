package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.internal.mapper;


import com.dancing_orangutan.ukkikki.geography.domain.city.CityEntity;
import com.dancing_orangutan.ukkikki.place.domain.place.PlaceEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.*;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.CityResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.KeywordResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.MemberResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.PlaceResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.PlaceTagResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.TravelPlanResponse;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class TravelPlanResponseMapper {

	public CreateTravelPlanResponse createTravelPlanResponse(final TravelPlanEntity entity) {
		return CreateTravelPlanResponse
				.builder()
				.travelPlanResponse(buildTravelPlanResponse(entity))
				.build();
	}

	public JoinTravelPlanResponse joinTravelPlanResponse(final TravelPlanEntity entity) {
		return JoinTravelPlanResponse.builder()
				.travelPlan(buildTravelPlanResponseWithPlaces(entity))
				.members(entity.getMemberTravelPlans().stream()
						.map(this::toMemberResponse).toList())
				.build();
	}

	public SearchTravelPlanResponse searchTravelPlanResponse(
			final List<TravelPlanEntity> entities, final Integer memberId) {
		return SearchTravelPlanResponse.builder()
				.travelPlans(entities.stream()
						.map(entity -> buildTravelPlanResponseWithHasJoined(entity, memberId))
						.toList())
				.build();
	}

	public SearchMyTravelPlanResponse searchMyTravelPlanResponse(final List<TravelPlanEntity> entities) {
		return SearchMyTravelPlanResponse.builder()
				.travelPlans(entities.stream()
						.map(this::buildBaseTravelPlanResponse)
						.map(TravelPlanResponse.TravelPlanResponseBuilder::build)
						.toList())
				.build();
	}


	public FetchSuggestedTravelPlansResponse fetchSuggestedTravelPlansResponse(
			final List<TravelPlanEntity> entities) {
		return FetchSuggestedTravelPlansResponse.builder()
				.travelPlans(entities.stream()
						.map(this::buildTravelPlanResponse)
						.toList())
				.build();
	}

	public FetchAvailableTravelPlansResponse fetchAvailableTravelPlansResponse(
			final Page<TravelPlanEntity> page) {

		List<TravelPlanResponse> travelPlanResponses = page.getContent().stream()
				.map(this::buildTravelPlanResponse)
				.toList();

		return FetchAvailableTravelPlansResponse.builder()
				.travelPlans(travelPlanResponses)
				.pageNumber(page.getNumber())
				.pageSize(page.getSize())
				.totalPages(page.getTotalPages())
				.totalElements(page.getTotalElements())
				.build();
	}

	public FetchTravelPlanDetailsResponse fetchTravelPlanDetailsResponse(
			final TravelPlanEntity entity) {
		return FetchTravelPlanDetailsResponse.builder()
				.travelPlan(buildTravelPlanResponseWithPlaces(entity))
				.build();
	}

	public FetchKeywordsResponse fetchKeywordsResponse(final List<KeywordEntity> entities) {
		return FetchKeywordsResponse.builder()
				.keywords(
						entities.stream()
								.map(this::toKeywordResponse)
								.toList()
				).build();
	}


	private TravelPlanResponse.TravelPlanResponseBuilder buildBaseTravelPlanResponse(
			final TravelPlanEntity entity) {
		return TravelPlanResponse.builder()
				.travelPlanId(entity.getTravelPlanId())
				.departureCity(toCityResponse(entity.getDepartureCity()))
				.arrivalCity(toCityResponse(entity.getArrivalCity()))
				.name(entity.getName())
				.startDate(entity.getStartDate())
				.endDate(entity.getEndDate())
				.keywords(entity.getTravelPlanKeywords().stream()
						.map(travelPlanKeywordEntity -> toKeywordResponse(
								travelPlanKeywordEntity.getKeyword()))
						.toList())
				.minPeople(entity.getMinPeople())
				.maxPeople(entity.getMaxPeople())
				.planningStatus(entity.getPlanningStatus())
				.closeTime(entity.getCloseTime())
				.currentParticipants(entity.getMemberTravelPlans().stream()
						.mapToInt(MemberTravelPlanEntity::calTotalParticipants).sum());
	}

	private TravelPlanResponse buildTravelPlanResponse(final TravelPlanEntity entity) {
		return buildBaseTravelPlanResponse(entity).build();
	}

	private TravelPlanResponse buildTravelPlanResponseWithHasJoined(final TravelPlanEntity entity,
			final Integer memberId) {
		return buildBaseTravelPlanResponse(entity)
				.hasJoined(entity.getMemberTravelPlans().stream()
						.anyMatch(memberTravelPlan -> memberTravelPlan.getMember().getMemberId()
								.equals(memberId)))
				.build();
	}

	private TravelPlanResponse buildTravelPlanResponseWithPlaces(final TravelPlanEntity entity) {
		return buildBaseTravelPlanResponse(entity)
				.places(entity.getPlaces().stream()
						.map(this::toPlaceResponse)
						.toList())
				.build();
	}


	private CityResponse toCityResponse(final CityEntity entity) {
		return CityResponse.builder()
				.cityId(entity.getCityId())
				.name(entity.getName())
				.build();
	}

	private KeywordResponse toKeywordResponse(final KeywordEntity entity) {
		return KeywordResponse.builder()
				.keywordId(entity.getKeywordId())
				.name(entity.getName())
				.build();
	}

	private PlaceResponse toPlaceResponse(final PlaceEntity entity) {
		return PlaceResponse.builder()
				.placeId(entity.getPlaceId())
				.name(entity.getName())
				.tags(entity.getPlaceTags().stream()
						.map(tag -> PlaceTagResponse.builder()
								.name(tag.getPlaceTagName())
								.placeTagId(tag.getPlaceTagId())
								.build())
						.toList())
				.longitude(entity.getLongitude())
				.latitude(entity.getLatitude())
				.likeCount(entity.countLikes())
				.build();
	}

	private MemberResponse toMemberResponse(final MemberTravelPlanEntity entity) {
		return MemberResponse.builder()
				.name(entity.getMember().getName())
				.hostYn(entity.isHostYn())
				.totalPeopleCount(entity.calTotalParticipants())
				.build();
	}


}