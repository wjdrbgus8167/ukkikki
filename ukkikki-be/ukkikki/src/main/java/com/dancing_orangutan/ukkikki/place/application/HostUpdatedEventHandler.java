package com.dancing_orangutan.ukkikki.place.application;

import com.dancing_orangutan.ukkikki.travelPlan.domain.event.TravelPlanCompanionChangedEvent;
import com.dancing_orangutan.ukkikki.place.application.command.UpdatePlaceLikeCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HostUpdatedEventHandler {

    private final PlaceService placeService;

    @EventListener(TravelPlanCompanionChangedEvent.class)
    public void handle(TravelPlanCompanionChangedEvent event) {

        UpdatePlaceLikeCommand command = UpdatePlaceLikeCommand.builder()
                .travelPlanId(event.travelPlanId())
                .memberId(event.memberId())
                .adultCount(event.adultCount())
                .childCount(event.childCount())
                .infantCount(event.infantCount())
                .build();

        placeService.updatePlaceLike(command);
    }
}
