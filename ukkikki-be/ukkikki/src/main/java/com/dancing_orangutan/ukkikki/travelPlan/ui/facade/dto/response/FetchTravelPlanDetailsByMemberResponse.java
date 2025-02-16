package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response;

import com.dancing_orangutan.ukkikki.geography.domain.city.CityEntity;
import com.dancing_orangutan.ukkikki.place.domain.place.PlaceEntity;
import com.dancing_orangutan.ukkikki.place.domain.placeTag.PlaceTagEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.VoteSurveyEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;

public record FetchTravelPlanDetailsByMemberResponse(TravelPlanResponse travelPlan) {


	@Builder
	public FetchTravelPlanDetailsByMemberResponse {

	}

	public static FetchTravelPlanDetailsByMemberResponse fromEntity(
			final TravelPlanEntity travelPlanEntity, final Integer memberId,
			final boolean canVote,final VoteSurveyEntity voteSurveyEntity) {
		return FetchTravelPlanDetailsByMemberResponse.builder()
				.travelPlan(TravelPlanResponse.fromEntity(travelPlanEntity, memberId, canVote,voteSurveyEntity))
				.build();
	}

	@Builder
	private record TravelPlanResponse(
			Integer travelPlanId,
			String name,
			CityResponse arrivalCity,
			CityResponse departureCity,
			LocalDate startDate,
			LocalDate endDate,
			PlanningStatus planningStatus,
			int minPeople,
			int maxPeople,
			int currentParticipants,
			List<KeywordResponse> keywords,
			List<PlaceResponse> places,
			LocalDateTime closeTime,
			MyInfo member,
			VoteSurveyInfo voteSurveyInfo
	) {

		private static TravelPlanResponse fromEntity(TravelPlanEntity entity, Integer memberId,
				boolean canVote, VoteSurveyEntity voteSurveyEntity) {
			return TravelPlanResponse.builder()
					.travelPlanId(entity.getTravelPlanId())
					.name(entity.getName())
					.arrivalCity(CityResponse.fromEntity(entity.getArrivalCity()))
					.departureCity(CityResponse.fromEntity(entity.getDepartureCity()))
					.startDate(entity.getStartDate())
					.endDate(entity.getEndDate())
					.planningStatus(entity.getPlanningStatus())
					.minPeople(entity.getMinPeople())
					.maxPeople(entity.getMaxPeople())
					.currentParticipants(entity.calCurrentParticipants())
					.keywords(entity.getTravelPlanKeywords().stream()
							.map(travelPlanKeywordEntity -> KeywordResponse.fromEntity(
									travelPlanKeywordEntity.getKeyword()))
							.collect(Collectors.toList()))
					.closeTime(entity.getCloseTime())
					.places(entity.getPlaces().stream()
							.map(placeEntity -> PlaceResponse.fromEntity(placeEntity, memberId))
							.toList())
					.member(entity.getMemberTravelPlans().stream()
							.filter(memberTravelPlan -> memberTravelPlan.hasJoined(memberId))
							.findFirst()
							.map(MyInfo::fromEntity)
							.orElse(null))
					.voteSurveyInfo(VoteSurveyInfo.fromEntity(voteSurveyEntity, canVote))
					.build();
		}
	}

	@Builder
	private record CityResponse(
			Integer cityId,
			String name
	) {

		private static CityResponse fromEntity(CityEntity entity) {
			return CityResponse.builder()
					.cityId(entity.getCityId())
					.name(entity.getName())
					.build();
		}
	}

	@Builder
	private record KeywordResponse(
			Integer keywordId,
			String name
	) {

		private static KeywordResponse fromEntity(KeywordEntity entity) {
			return KeywordResponse.builder()
					.keywordId(entity.getKeywordId())
					.name(entity.getName())
					.build();
		}
	}

	@Builder
	public record PlaceResponse(
			Integer placeId,
			String name,
			Integer likeCount,
			double latitude,
			double longitude,
			List<PlaceTagResponse> tags,
			boolean likeYn
	) {

		private static PlaceResponse fromEntity(PlaceEntity entity, Integer memberId) {
			return PlaceResponse.builder()
					.placeId(entity.getPlaceId())
					.name(entity.getName())
					.likeCount(entity.countLikes())
					.latitude(entity.getLatitude())
					.longitude(entity.getLongitude())
					.tags(entity.getPlaceTags().stream()
							.map(placeTagEntity -> PlaceTagResponse.fromEntity(placeTagEntity,
									memberId))
							.toList())
					.likeYn(entity.isLiked(memberId))
					.build();
		}

	}


	@Builder
	private record PlaceTagResponse(Integer placeTagId,
									String name,

									boolean isMyTag) {

		private static PlaceTagResponse fromEntity(PlaceTagEntity entity, Integer memberId) {
			return PlaceTagResponse.builder()
					.name(entity.getPlaceTagName())
					.placeTagId(entity.getPlaceTagId())
					.isMyTag(entity.isMyTag(memberId))
					.build();
		}

	}

	@Builder
	private record MyInfo(
			int totalParticipants,
			boolean isHost
	) {

		private static MyInfo fromEntity(MemberTravelPlanEntity entity) {
			return MyInfo.builder()
					.totalParticipants(entity.calTotalParticipants())
					.isHost(entity.isHost())
					.build();
		}
	}

	@Builder
	private record VoteSurveyInfo(Integer voteSurveyId, boolean canVote) {


		private static VoteSurveyInfo fromEntity(VoteSurveyEntity entity, boolean canVote) {
			return VoteSurveyInfo.builder()
					.canVote(canVote)
					.voteSurveyId(entity.getVoteSurveyId())
					.build();
		}

	}
}
