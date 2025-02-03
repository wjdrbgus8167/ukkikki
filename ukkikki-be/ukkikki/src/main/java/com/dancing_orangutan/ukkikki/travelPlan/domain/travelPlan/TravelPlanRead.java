package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.domain.like.LikeEntity;
import java.math.BigDecimal;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class TravelPlanRead {

	private UserInfo user;

	private List<UserInfo> users;

	private TravelPlanInfo travelPlan;

	private List<MessageInfo> messages;

	@Getter
	@Builder
	public static class UserInfo {

		private Integer userId;
		private String name;
		private boolean hostYn;
		private int totalCount;
		private String profileImageUrl;
	}

	@Getter
	@Builder
	public static class TravelPlanInfo {

		private String name;
		private LocalDate startDate;
		private LocalDate endDate;
		private String departureCityName;
		private String arrivalCityName;
		private String hostComment;
		private String planningStatus;
		private LocalDateTime createTime;
		private LocalDateTime closeTime;
		private int minPeople;
		private int maxPeople;
		private List<String> keywords;
		private List<PlaceInfo> places;
	}

	@Getter
	@Builder
	public static class PlaceInfo {

		private Integer placeId;
		private String name;
		private String address;
		private BigDecimal latitude;
		private BigDecimal longitude;
		private List<PlaceTagInfo> placeTags;
		private int likesCnt;
		private boolean likeYn;
	}

	@Getter
	@Builder
	public static class PlaceTagInfo {

		private Integer placeTagId;
		private String placeTagName;
	}

	@Getter
	@Builder
	public static class MessageInfo {

		private Integer userId;
		private String content;
		private String profileImageUrl;
		private LocalDateTime createdAt;
	}

	public static TravelPlanRead fromEntity(TravelPlanEntity entity, Integer memberId) {
		return TravelPlanRead.builder()
				.travelPlan(TravelPlanInfo.builder()
						.name(entity.getName())
						.startDate(entity.getStartDate())
						.endDate(entity.getEndDate())
						.departureCityName(entity.getDepartureCity().getCityName())
						.arrivalCityName(entity.getArrivalCity().getCityName())
						.hostComment(entity.getHostComment())
						.planningStatus(entity.getPlanningStatus().name())
						.createTime(entity.getCreateTime())
						.closeTime(entity.getCloseTime())
						.minPeople(entity.getMinPeople())
						.maxPeople(entity.getMaxPeople())
						.keywords(entity.getTravelPlanKeywords().stream()
								.map(k -> k.getKeyword().getName())
								.collect(Collectors.toList()))
						.places(entity.getPlaces().stream()
								.map(place -> PlaceInfo.builder()
										.placeId(place.getPlaceId())
										.name(place.getName())
										.address(place.getAddress())
										.latitude(place.getLatitude())
										.longitude(place.getLongitude())
										.placeTags(place.getPlaceTags().stream()
												.map(tag -> PlaceTagInfo.builder()
														.placeTagId(tag.getPlaceTagId())
														.placeTagName(tag.getPlaceTagName())
														.build())
												.collect(Collectors.toList()))
										.likesCnt(place.getLikes().stream().
												mapToInt(LikeEntity::getLikesCnt).sum())
										.likeYn(place.getLikes()
												.stream()
												.anyMatch(like -> like.getMember().getMemberId()
														.equals(memberId)))
										.build())
								.collect(Collectors.toList()))
						.build())
				.users(entity.getMemberTravelPlans().stream()
						.map(memberTravel -> UserInfo.builder()
								.userId(memberTravel.getMember().getMemberId())
								.name(memberTravel.getMember().getName())
								.hostYn(memberTravel.isHostYn())
								.totalCount(
										memberTravel.getAdultCount() + memberTravel.getChildCount()
												+ memberTravel.getInfantCount())
								.profileImageUrl(memberTravel.getMember().getProfileImageUrl())
								.build())
						.collect(Collectors.toList()))
				.build();
	}
}
