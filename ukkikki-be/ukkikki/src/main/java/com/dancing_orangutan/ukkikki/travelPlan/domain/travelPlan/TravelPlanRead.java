package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;

import com.dancing_orangutan.ukkikki.entity.travelPlan.PlaceEntity;
import com.dancing_orangutan.ukkikki.entity.travelPlan.PlaceTagEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.MessageEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.like.LikeEntity;
import java.math.BigDecimal;
import java.util.stream.Collectors;

import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class TravelPlanRead {

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

		private String name;
		private String content;
		private String profileImageUrl;
		private LocalDate createdAt;
	}
	public static TravelPlanRead fromEntity(TravelPlanEntity entity, Integer memberId) {
		return TravelPlanRead.builder()
				.travelPlan(buildTravelPlanInfo(entity, memberId))
				.users(buildUserInfos(entity))
				.messages(buildMessageInfos(entity))
				.build();
	}

	private static TravelPlanInfo buildTravelPlanInfo(TravelPlanEntity entity, Integer memberId) {
		return TravelPlanInfo.builder()
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
				.keywords(mapKeywords(entity))
				.places(mapPlaces(entity, memberId))
				.build();
	}

	private static List<String> mapKeywords(TravelPlanEntity entity) {
		return entity.getTravelPlanKeywords().stream()
				.map(k -> k.getKeyword().getName())
				.collect(Collectors.toList());
	}

	private static List<PlaceInfo> mapPlaces(TravelPlanEntity entity, Integer memberId) {
		return entity.getPlaces().stream()
				.map(place -> mapToPlaceInfo(place, memberId))
				.collect(Collectors.toList());
	}

	private static PlaceInfo mapToPlaceInfo(PlaceEntity place, Integer memberId) {
		return PlaceInfo.builder()
				.placeId(place.getPlaceId())
				.name(place.getName())
				.address(place.getAddress())
				.latitude(place.getLatitude())
				.longitude(place.getLongitude())
				.placeTags(mapPlaceTags(place))
				.likesCnt(calculateLikesCnt(place))
				.likeYn(isLikedByMember(place, memberId))
				.build();
	}

	private static List<PlaceTagInfo> mapPlaceTags(PlaceEntity place) {
		return place.getPlaceTags().stream()
				.map(TravelPlanRead::mapToPlaceTagInfo)
				.collect(Collectors.toList());
	}

	private static PlaceTagInfo mapToPlaceTagInfo(PlaceTagEntity tag) {
		return PlaceTagInfo.builder()
				.placeTagId(tag.getPlaceTagId())
				.placeTagName(tag.getPlaceTagName())
				.build();
	}

	private static int calculateLikesCnt(PlaceEntity place) {
		return place.getLikes().stream()
				.mapToInt(LikeEntity::getLikesCnt)
				.sum();
	}

	private static boolean isLikedByMember(PlaceEntity place, Integer memberId) {
		return place.getLikes().stream()
				.anyMatch(like -> like.getMember().getMemberId().equals(memberId));
	}

	private static List<UserInfo> buildUserInfos(TravelPlanEntity entity) {
		return entity.getMemberTravelPlans().stream()
				.map(TravelPlanRead::mapToUserInfo)
				.collect(Collectors.toList());
	}

	private static UserInfo mapToUserInfo(MemberTravelPlanEntity memberTravel) {
		return UserInfo.builder()
				.userId(memberTravel.getMember().getMemberId())
				.name(memberTravel.getMember().getName())
				.hostYn(memberTravel.isHostYn())
				.totalCount(calculateTotalCount(memberTravel))
				.profileImageUrl(memberTravel.getMember().getProfileImageUrl())
				.build();
	}

	private static int calculateTotalCount(MemberTravelPlanEntity memberTravel) {
		return memberTravel.getAdultCount()
				+ memberTravel.getChildCount()
				+ memberTravel.getInfantCount();
	}

	private static List<MessageInfo> buildMessageInfos(TravelPlanEntity entity) {
		return entity.getMessages().stream()
				.map(TravelPlanRead::mapToMessageInfo)
				.collect(Collectors.toList());
	}

	private static MessageInfo mapToMessageInfo(MessageEntity message) {
		return MessageInfo.builder()
				.name(message.getMemberTravelPlan().getMember().getName())
				.content(message.getContent())
				.profileImageUrl(message.getMemberTravelPlan().getMember().getProfileImageUrl())
				.createdAt(message.getCreatedAt())
				.build();
	}
}
