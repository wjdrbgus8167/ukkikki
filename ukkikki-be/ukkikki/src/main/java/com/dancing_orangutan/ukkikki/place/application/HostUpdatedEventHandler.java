package com.dancing_orangutan.ukkikki.place.application;

import com.dancing_orangutan.ukkikki.event.travelPlanEvent.HostUpdatedEvent;
import com.dancing_orangutan.ukkikki.place.application.command.UpdatePlaceLikeCommand;
import com.dancing_orangutan.ukkikki.place.infrastructure.PlaceLikeRepository;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.UpdateHostCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HostUpdatedEventHandler {

    private final PlaceService placeService;

    @EventListener(HostUpdatedEvent.class)
    public void handle(HostUpdatedEvent event) {

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
