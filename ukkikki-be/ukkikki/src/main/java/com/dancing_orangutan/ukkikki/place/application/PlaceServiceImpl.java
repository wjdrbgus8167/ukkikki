package com.dancing_orangutan.ukkikki.place.application;

import com.dancing_orangutan.ukkikki.place.application.command.*;
import com.dancing_orangutan.ukkikki.place.domain.like.Like;
import com.dancing_orangutan.ukkikki.place.domain.like.LikeEntity;
import com.dancing_orangutan.ukkikki.place.domain.place.Place;
import com.dancing_orangutan.ukkikki.place.domain.place.PlaceEntity;
import com.dancing_orangutan.ukkikki.place.domain.placeTag.PlaceTag;
import com.dancing_orangutan.ukkikki.place.domain.placeTag.PlaceTagEntity;
import com.dancing_orangutan.ukkikki.place.infrastructure.*;
import com.dancing_orangutan.ukkikki.place.mapper.PlaceLikeMapper;
import com.dancing_orangutan.ukkikki.place.mapper.PlaceMapper;
import com.dancing_orangutan.ukkikki.place.mapper.PlaceTagMapper;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
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
    private final PlaceTagRepository placeTagRepository;
    private final PlaceLikeRepository placeLikeRepository;
    private final TravelPlanFinder travelPlanFinder;
    private final MemberTravelPlanFinder memberTravelPlanFinder;
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

    @Override
    public void creatPlaceTag(CreatePlaceTagCommand command) {

        // PlaceTag 도메인 객체 생성
        PlaceTag placeTag = PlaceTag.builder()
                .placeId(command.getPlaceId())
                .creatorId(command.getMemberId())
                .placeTagName(command.getPlaceTagName())
                .build();

        // PlaceTag 비즈니즈 로직 수행

        // MemberTravelPlan 객체 생성
        MemberTravelPlanEntity memberTravelPlanEntity =
                memberTravelPlanFinder.findMemberTravelPlanById(command.getTravelPlanId(),
                                                                command.getMemberId());

        Optional<PlaceEntity> placeEntity = placeRepository.findById(command.getPlaceId());
        if(placeEntity.isEmpty()) {
            logger.error("PlaceEntity not found for id: {}", command.getPlaceId());
        } else {
            // PlaceTag 영속성 객체 생성
            PlaceTagEntity placeTagEntity =
                    PlaceTagMapper.mapToEntity(placeTag, placeEntity.get(), memberTravelPlanEntity);
            // PlaceTag save
            placeTagRepository.save(placeTagEntity);
        }
    }

    @Override
    public void deletePlaceTag(DeletePlaceTagCommand command) {

        // PlaceTag 영속성 객체 불러오기
        Optional<PlaceTagEntity> optionalPlaceTagEntity = placeTagRepository.findById(command.getPlaceTagId());
        PlaceTagEntity placeTagEntity = optionalPlaceTagEntity.orElseThrow(() -> {
            logger.error("PlaceTagEntity not found for id: {}", command.getPlaceTagId());
            return new IllegalArgumentException("No PlaceTagEntity found for id: " + command.getPlaceTagId());
        });

        // 영속성 객체 도메인 객체로 매핑
        PlaceTag placeTag = PlaceTagMapper.mapToDomain(placeTagEntity);

        // 비즈니스 로직 수행

        // PlaceTag delete
        placeTagRepository.delete(placeTagEntity);
    }

    @Override
    public void createPlaceLike(CreatePlaceLikeCommand command) {

        // Like 도메인 객체 생성
        Like like = Like.builder()
                .creatorId(command.getMemberId())
                .placeId(command.getPlaceId())
                .travelPlanId(command.getTravelPlanId())
                .build();

        // 비즈니스 로직 수행
        MemberTravelPlanEntity memberTravelPlanEntity = memberTravelPlanFinder
                .findMemberTravelPlanById(like.getTravelPlanId(), like.getCreatorId());
        like.setLikeCount(memberTravelPlanEntity);

        // 도메인 객체 Like 영속성 객체 LikeEntity로 매핑
        LikeEntity likeEntity = PlaceLikeMapper.mapToEntity(like);

        // PlaceLike save
        placeLikeRepository.save(likeEntity);
    }

    @Override
    public void deletePlaceLike(DeletePlaceLikeCommand command) {

        // Like 도메인 객체 생성
        Like like = Like.builder()
                .creatorId(command.getMemberId())
                .placeId(command.getPlaceId())
                .travelPlanId(command.getTravelPlanId())
                .build();

        // 비즈니스 로직 수행

        // 도메인 객체 Like 영속성 객체 LikeEntity로 매핑
        LikeEntity likeEntity = PlaceLikeMapper.mapToEntity(like);

        // PlaceLike delete
        placeLikeRepository.delete(likeEntity);
    }
}
