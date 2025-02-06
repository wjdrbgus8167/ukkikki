package com.dancing_orangutan.ukkikki.travelPlan.application;


import com.dancing_orangutan.ukkikki.event.eventPublisher.SpringEventPublisher;
import com.dancing_orangutan.ukkikki.event.travelPlanEvent.UpdateHostEvent;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.*;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchSuggestedTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.SearchTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.Host;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanInfo;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.memberTravelPlan.MemberTravelPlanFinder;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.memberTravelPlan.MemberTravelPlanModifier;
import com.dancing_orangutan.ukkikki.travelPlan.mapper.TravelPlanMapper;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.KeywordUi;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan.TravelPlanRepository;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.FetchSuggestedTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.JoinTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.SearchTravelPlanResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TravelPlanService {

	private final TravelPlanRepository travelPlanRepository;
	private final TravelPlanMapper travelPlanMapper;
	private final MemberTravelPlanFinder memberTravelPlanFinder;
	private final MemberTravelPlanModifier memberTravelPlanModifier;
	private final SpringEventPublisher springEventPublisher;

	@Transactional
	public CreateTravelPlanResponse createTravelPlan(CreateTravelPlanCommand command) {
		TravelPlan domain = TravelPlan.builder()
				.travelPlanInfo(TravelPlanInfo.builder()
						.name(command.name())
						.departureCityId(command.departureCityId())
						.arrivalCityId(command.arrivalCityId())
						.planningStatus(command.planningStatus())
						.startDate(command.startDate())
						.endDate(command.endDate())
						.minPeople(command.minPeople())
						.maxPeople(command.maxPeople())
						.keywords(command.keywords())
						.build())
				.host(Host.builder()
						.adultCount(command.adultCount())
						.infantCount(command.infantCount())
						.childCount(command.childCount())
						.memberId(command.memberId())
						.build())
				.build();

		TravelPlan savedTravelPlan = travelPlanRepository.save(domain);
		return CreateTravelPlanResponse.toResponse(savedTravelPlan);
	}

	@Transactional
	public JoinTravelPlanResponse joinTravelPlan(JoinTravelPlanCommand command) {
		boolean isJoining = memberTravelPlanFinder.isJoiningTravelPlan(command.getMemberId(),
				command.getTravelPlanId());

		// 현재 방에 참여중일 경우 마지막 참여시간만 변경
		if (isJoining) {
			memberTravelPlanModifier.modifyLastJoinTime(command.getMemberId(),
					command.getTravelPlanId());
		}

		//아니라면 여행 계획에 참여
		if (!isJoining) {
			TravelPlan domain = TravelPlan.builder()
					.travelPlanInfo(TravelPlanInfo.builder()
							.travelPlanId(command.getTravelPlanId())
							.build())
					.host(Host.builder()
							.adultCount(command.getAdultCount())
							.childCount(command.getChildCount())
							.infantCount(command.getInfantCount())
							.memberId(command.getMemberId())
							.build())
					.build();
			travelPlanRepository.joinTravelPlan(domain);
		}

		// 여행 계획 ID와 관련된 모든 데이터 조회
		return travelPlanMapper.toJoinTravelResponse(
				travelPlanRepository.findAllByTravelPlanId(command.getTravelPlanId(),
						command.getMemberId()));
	}

	public SearchTravelPlanResponse searchTravelPlan(SearchTravelPlanQuery query) {
		TravelPlan domain = TravelPlan.builder()
				.travelPlanInfo(
						TravelPlanInfo.builder()
								.departureCityId(query.departureCityId())
								.arrivalCityId(query.arrivalCityId())
								.startDate(query.startDate())
								.endDate(query.endDate())
								.planningStatus(query.status())
								.keywords(query.keywords())
								.build())
				.build();
		List<TravelPlan> travelPlans = travelPlanRepository.searchTravelPlan(domain);

		return new SearchTravelPlanResponse(
				travelPlans.stream()
						.map(travelPlan -> new SearchTravelPlanResponse.SearchTravelPlanInfo(
								travelPlan.getTravelPlanInfo().travelPlanId(),
								travelPlan.getTravelPlanInfo().name(),
								travelPlan.getTravelPlanInfo().departureCityId(),
								travelPlan.getTravelPlanInfo().arrivalCityId(),
								travelPlan.getTravelPlanInfo().startDate(),
								travelPlan.getTravelPlanInfo().endDate(),
								travelPlan.calPeopleCount(),
								travelPlan.getTravelPlanInfo().maxPeople(),
								travelPlan.getTravelPlanInfo().planningStatus(),
								travelPlan.getTravelPlanInfo().keywords().stream()
										.map(KeywordUi::new)
										.toList()
						))
						.toList()
		);
	}

	public FetchSuggestedTravelPlanResponse fetchSuggestedTravelPlans(
			FetchSuggestedTravelPlanQuery query) {
		TravelPlan domain = TravelPlan.builder()
				.travelPlanInfo(
						TravelPlanInfo.builder()
								.planningStatus(query.status())
								.build()
				).build();

		List<TravelPlan> travelPlans = travelPlanRepository.fetchTravelPlan(domain);

		return new FetchSuggestedTravelPlanResponse(
				travelPlans.stream()
						.map(travelPlan -> new FetchSuggestedTravelPlanResponse.FetchSuggestedTravelPlanInfo(
								travelPlan.getTravelPlanInfo().travelPlanId(),
								travelPlan.getTravelPlanInfo().name(),
								travelPlan.getTravelPlanInfo().departureCityId(),
								travelPlan.getTravelPlanInfo().arrivalCityId(),
								travelPlan.getTravelPlanInfo().startDate(),
								travelPlan.getTravelPlanInfo().endDate(),
								travelPlan.calPeopleCount(),
								travelPlan.getTravelPlanInfo().minPeople(),
								travelPlan.getTravelPlanInfo().maxPeople(),
								travelPlan.getTravelPlanInfo().planningStatus(),
								travelPlan.getTravelPlanInfo().keywords().stream()
										.map(KeywordUi::new)
										.toList()
						))
						.toList()
		);
	}

	@Transactional
	public void updateTravelPlanStatus(UpdateTravelPlanStatusCommand command) {

		TravelPlan domain = TravelPlan.builder()
				.travelPlanInfo(TravelPlanInfo.builder()
						.travelPlanId(command.travelPlanId())
						.planningStatus(command.planningStatus())
						.build())
				.build();
		travelPlanRepository.updateTravelPlanStatus(domain);
	}

	@Transactional
	public void writeComment(WriteCommentCommand command) {
		TravelPlan domain = TravelPlan
				.builder()
				.travelPlanInfo(TravelPlanInfo.builder()
						.travelPlanId(command.travelPlanId())
						.hostComment(command.hostComment())
						.build())
				.build();

		travelPlanRepository.writeComment(domain);
	}

	@Transactional
	public void updateCloseTime(UpdateCloseTimeCommand command) {

		TravelPlan domain = TravelPlan.builder()
				.travelPlanInfo(TravelPlanInfo
						.builder()
						.travelPlanId(command.travelPlanId())
						.closeTime(command.closeTime())
						.build())
				.build();

		TravelPlan result = travelPlanRepository.updateCloseTime(domain);
		result.validateCreatedAndCloseTime();
	}

	@Transactional
	public void updateHost(UpdateHostCommand command) {

		TravelPlan domain = TravelPlan.builder()
				.travelPlanInfo(TravelPlanInfo.builder()
						.travelPlanId(command.travelPlanId())
						.build())
				.host(Host.builder()
						.memberId(command.memberId())
						.adultCount(command.adultCount())
						.childCount(command.childCount())
						.infantCount(command.infantCount())
						.build())
				.build();

		travelPlanRepository.updateHost(domain);

		springEventPublisher.publish(UpdateHostEvent.builder()
				.adultCount(domain.getHost().adultCount())
				.childCount(domain.getHost().childCount())
				.infantCount(domain.getHost().infantCount())
				.memberId(domain.getHost().memberId())
				.travelPlanId(domain.getTravelPlanInfo().travelPlanId())
				.build());
	}
}