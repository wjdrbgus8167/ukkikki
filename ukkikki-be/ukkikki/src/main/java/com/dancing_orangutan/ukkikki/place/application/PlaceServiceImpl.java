package com.dancing_orangutan.ukkikki.place.application;

import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import com.dancing_orangutan.ukkikki.member.infrastructure.member.MemberFinder;
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
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
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
    private final MemberFinder memberFinder;

    @Override
    public Integer createPlace(CreatePlaceCommand command) {

        Place place = Place.builder()
                .name(command.getName())
                .address(command.getAddress())
                .latitude(command.getLatitude())
                .longitude(command.getLongitude())
                .travelPlanId(command.getTravelPlanId())
                .build();

        Optional<TravelPlanEntity> OptionalTravelPlanEntity =
                travelPlanFinder.findByTravelPlanId(command.getTravelPlanId());

        if(OptionalTravelPlanEntity.isEmpty()) {
            logger.error("TravelPlanEntity not found for id: {}",
                    command.getTravelPlanId());
            throw new IllegalArgumentException("No TravelPlanEntity found for id: "
                    + command.getTravelPlanId());
        } else {
            TravelPlanEntity travelPlanEntity = OptionalTravelPlanEntity.get();

            // 비즈니스 로직 수행
            // 기존 여행지 조회
            List<PlaceEntity> existingPlacesEntities = placeRepository.findByTravelPlan(travelPlanEntity);
            List<Place> existingPlaces = existingPlacesEntities.stream()
                    .map(PlaceMapper::mapToDomain)
                    .toList();

            // 여행 계획 내에 같은 여행지가 이미 등록되었는지 중복 검사
            if(place.hasDuplicatePlace(existingPlaces)) {
                throw new IllegalArgumentException("중복 여행지: 이미 여행 계획에 등록된 여행지입니다. ");
            }


            PlaceEntity placeEntity = PlaceMapper.mapToEntity(place, travelPlanEntity);
            PlaceEntity save = placeRepository.save(placeEntity);
            return placeEntity.getPlaceId();
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
        Optional<PlaceTagEntity> optionalPlaceTagEntity = placeTagRepository
                .findById(command.getPlaceTagId());
        PlaceTagEntity placeTagEntity = optionalPlaceTagEntity.orElseThrow(() -> {
            logger.error("PlaceTagEntity not found for id: {}", command.getPlaceTagId());
            return new IllegalArgumentException("No PlaceTagEntity found for id: "
                    + command.getPlaceTagId());
        });

        // 영속성 객체 도메인 객체로 매핑
        PlaceTag placeTag = PlaceTagMapper.mapToDomain(placeTagEntity);

        // 비즈니스 로직 수행

        // PlaceTag delete
        placeTagRepository.delete(placeTagEntity);
    }

    @Transactional
    @Override
    public List<LikeEntity> createPlaceLike(CreatePlaceLikeCommand command) {

        // Like 도메인 객체 생성
        Like like = Like.builder()
                .creatorId(command.getMemberId())
                .placeId(command.getPlaceId())
                .travelPlanId(command.getTravelPlanId())
                .build();

        // 비즈니스 로직 수행
        // 기존 좋아요 조회
        List<LikeEntity> existingLikeEntities = placeLikeRepository.findByLikeId_PlaceId(command.getPlaceId());
        List<Like> existingLikes = existingLikeEntities.stream()
                .map(PlaceLikeMapper::mapToDomain)
                .toList();

        // 대상 사용자가 해당 여향지에 대해 이미 좋아요를 했는지 중복 검사
        if (Like.hasDuplicateLike(like.getCreatorId(), like.getPlaceId(), existingLikes)) {
            throw new IllegalStateException("중복 좋아요: 해당 사용자가 이미 이 장소를 좋아요 했습니다.");
        }

        // 여행 계획 내 동행자 수를 가져와 좋아요 수 세팅
        MemberTravelPlanEntity memberTravelPlanEntity = memberTravelPlanFinder
                .findMemberTravelPlanById(like.getTravelPlanId(), like.getCreatorId());
        like.setLikeCount(memberTravelPlanEntity);

        // 도메인 객체 Like 영속성 객체 LikeEntity로 매핑
        LikeEntity likeEntity = PlaceLikeMapper.mapToEntity(like);
        MemberEntity memberEntity = memberFinder.findById(like.getCreatorId());
        likeEntity.setMember(memberEntity);
        PlaceEntity placeEntity = placeRepository.findById(like.getPlaceId()).get();
        likeEntity.setPlace(placeEntity);

        // PlaceLike save
        placeLikeRepository.save(likeEntity);

        // 위의 좋아요를 반영한 해당 사용자의 좋아요 목록 조회
        List<LikeEntity> likeEntities = placeLikeRepository.findByLikeId_MemberId(like.getCreatorId());

        return likeEntities;
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

    @Override
    @Transactional
    public void updatePlaceLike(UpdatePlaceLikeCommand command) {

        // 여행 계획 조회
        Optional<TravelPlanEntity> travelPlanEntity =
                travelPlanFinder.findByTravelPlanId(command.getTravelPlanId());
        if (travelPlanEntity.isEmpty()) {
            throw new IllegalArgumentException("해당 TravelPlan이 존재하지 않습니다. ID: "
                    + command.getTravelPlanId());
        }

        // 해당 여행 계획에 해당 하는 장소 조회 후 좋아요 업데이트
        travelPlanEntity.get().getPlaces().forEach(
                placeEntity -> {
                    placeEntity.getLikes().forEach(
                            likeEntity -> {
                                if(likeEntity.getMember().getMemberId().equals(command.getMemberId())) {
                                    // 좋아요 수 업데이트
                                    int newLikeCount =
                                            command.getAdultCount()
                                            + command.getChildCount()
                                            + command.getInfantCount();
                                    likeEntity.updateLikeCnt(newLikeCount);
                                    placeLikeRepository.save(likeEntity);
                                }
                            }
                    );
                }
        );

    }
}
