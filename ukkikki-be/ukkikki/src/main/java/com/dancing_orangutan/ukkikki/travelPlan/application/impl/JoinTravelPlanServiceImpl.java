package com.dancing_orangutan.ukkikki.travelPlan.application.impl;

import com.dancing_orangutan.ukkikki.travelPlan.application.JoinTravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.JoinTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanFactory;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Slf4j
public class JoinTravelPlanServiceImpl implements JoinTravelPlanService {

	private final MemberTravelPlanRepository memberTravelPlanRepository;
	private final MemberTravelPlanFactory factory;

	@Override
	@Transactional
	public Integer joinTravelPlan(final JoinTravelPlanCommand command) {
		return memberTravelPlanRepository.findMemberTravelPlanEntityByMember_MemberIdAndTravelPlan_TravelPlanId(command.memberId(), command.travelPlanId())
				.map(entity -> {
					entity.updateLastJoinTime();
					return entity.getMemberTravelPlanId().getTravelPlanId();
				})
				.orElseGet(() -> {
					MemberTravelPlanEntity newEntity = factory.createEntity(command);
					memberTravelPlanRepository.store(newEntity);
					return newEntity.getMemberTravelPlanId().getTravelPlanId();
				});
	}
}
