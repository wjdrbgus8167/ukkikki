package com.dancing_orangutan.ukkikki.place.application;

import com.dancing_orangutan.ukkikki.event.travelPlanEvent.HostUpdatedEvent;
import com.dancing_orangutan.ukkikki.place.infrastructure.PlaceLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HostUpdatedEventHandler {

    private final PlaceService placeService;

    @EventListener(HostUpdatedEvent.class)
    public void handle(HostUpdatedEvent event) {


    }
}
