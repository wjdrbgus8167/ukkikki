package com.dancing_orangutan.ukkikki.place.application;

import com.dancing_orangutan.ukkikki.place.application.command.CreatePlaceCommand;
import com.dancing_orangutan.ukkikki.place.domain.Place;
import com.dancing_orangutan.ukkikki.place.domain.PlaceEntity;
import com.dancing_orangutan.ukkikki.place.infrastructure.PlaceRepository;
import com.dancing_orangutan.ukkikki.place.infrastructure.TravelPlanFinder;
import com.dancing_orangutan.ukkikki.place.mapper.PlaceMapper;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService {

    private final PlaceRepository placeRepository;
    private final TravelPlanFinder travelPlanFinder;
    private static final Logger logger = LoggerFactory.getLogger(PlaceServiceImpl.class);

    @Override
    public void createPlace(CreatePlaceCommand command) {

        Place place = Place.builder()
                .name(command.getName())
                .address(command.getAddress())
                .latitude(command.getLatitude())
                .longitude(command.getLongitude())
                .travelPlanId(command.getTravelPlanId())
                .build();

        Optional<TravelPlanEntity> travelPlanEntity =
                travelPlanFinder.findByTravelPlanId(command.getTravelPlanId());

        if(travelPlanEntity.isEmpty()) {
            logger.error("TravelPlanEntity not found for id: {}", command.getTravelPlanId());
            throw new IllegalArgumentException("No TravelPlanEntity found for id: " + command.getTravelPlanId());
        } else {
            PlaceEntity placeEntity = PlaceMapper.mapToEntity(place, travelPlanEntity.get());
            placeRepository.save(placeEntity);
        }
    }
}
