package com.dancing_orangutan.ukkikki.travelPlan.application;


import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.JoinTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.Host;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanInfo;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.memberTravelPlan.MemberTravelPlanFinder;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.memberTravelPlan.MemberTravelPlanModifier;
import com.dancing_orangutan.ukkikki.travelPlan.mapper.TravelPlanMapper;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan.TravelPlanRepository;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.JoinTravelPlanResponse;
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
						.build())
				.host(Host.builder()
						.adultCount(command.adultCount())
						.infantCount(command.infantCount())
						.childCount(command.childCount())
						.memberId(command.memberId())
						.build())
				.keywords(command.keywords())
				.build();

		TravelPlan savedTravelPlan = travelPlanRepository.save(domain);
		return CreateTravelPlanResponse.toResponse(savedTravelPlan);
	}

	@Transactional
	public JoinTravelPlanResponse joinTravelPlan(JoinTravelPlanCommand command) {
		boolean isJoining = memberTravelPlanFinder.isJoiningTravelPlan(command.getMemberId(), command.getTravelPlanId());

		// 현재 방에 참여중일 경우 마지막 참여시간만 변경
		if (isJoining) {
			memberTravelPlanModifier.modifyLastJoinTime(command.getMemberId(), command.getTravelPlanId());
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
		return travelPlanMapper.toJoinTravelResponse(travelPlanRepository.findAllByTravelPlanId(command.getTravelPlanId(),command.getMemberId()));
	}
}
