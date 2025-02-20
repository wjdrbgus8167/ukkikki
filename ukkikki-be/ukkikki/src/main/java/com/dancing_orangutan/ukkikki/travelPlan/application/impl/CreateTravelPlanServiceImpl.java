package com.dancing_orangutan.ukkikki.travelPlan.application.impl;

import com.dancing_orangutan.ukkikki.event.eventPublisher.SpringEventPublisher;
import com.dancing_orangutan.ukkikki.travelPlan.application.CreateTravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRepository;
import com.dancing_orangutan.ukkikki.travelPlan.domain.event.TravelPlanCreatedEvent;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateTravelPlanServiceImpl implements CreateTravelPlanService {

	private final TravelPlanFactory factory;
	private final TravelPlanRepository travelPlanRepository;
	private final SpringEventPublisher eventPublisher;

	@Override
	@Transactional
	public Integer createTravelPlan(final CreateTravelPlanCommand command) {
		TravelPlanEntity entity = factory.createEntity(command);
		travelPlanRepository.store(entity);
		eventPublisher.publish(TravelPlanCreatedEvent.builder()
				.travelPlanId(entity.getTravelPlanId())
				.memberId(command.travelPlanCommand().memberTravelPlanCommand().memberId())
				.adultCount(command.travelPlanCommand().memberTravelPlanCommand().adultCount())
				.infantCount(command.travelPlanCommand().memberTravelPlanCommand().infantCount())
				.childCount(command.travelPlanCommand().memberTravelPlanCommand().childCount())
				.build()
		);

		return entity.getTravelPlanId();
	}
}
