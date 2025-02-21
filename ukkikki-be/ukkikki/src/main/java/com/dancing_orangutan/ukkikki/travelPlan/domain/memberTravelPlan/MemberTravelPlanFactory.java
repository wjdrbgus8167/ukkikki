package com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import com.dancing_orangutan.ukkikki.member.domain.member.MemberRepository;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.JoinTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberTravelPlanFactory {

	private final MemberRepository memberRepository;
	private final TravelPlanRepository travelPlanRepository;

	public MemberTravelPlanEntity createEntity(final JoinTravelPlanCommand command) {
		MemberEntity memberEntity = memberRepository.findById(command.memberId())
				.orElseThrow(() -> new ApiException(ErrorCode.MEMBER_NOT_FOUND));
		TravelPlanEntity travelPlanEntity = travelPlanRepository.findById(command.travelPlanId())
				.orElseThrow(() -> new ApiException(ErrorCode.TRAVEL_PLAN_NOT_FOUND));

		return MemberTravelPlanEntity.builder()
				.memberTravelPlanId(MemberTravelPlanId.builder()
						.memberId(memberEntity.getMemberId())
						.travelPlanId(travelPlanEntity.getTravelPlanId())
						.build())
				.travelPlan(travelPlanEntity)
				.member(memberEntity)
				.adultCount(command.adultCount())
				.infantCount(command.infantCount())
				.childCount(command.childCount())
				.hostYn(command.hostYn())
				.build();
	}


}
