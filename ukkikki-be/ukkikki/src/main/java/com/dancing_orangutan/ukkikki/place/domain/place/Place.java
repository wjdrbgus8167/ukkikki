package com.dancing_orangutan.ukkikki.place.domain.place;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Set;

@Getter
public class Place {

    Integer placeId;
    String name;
    String address;
    double latitude;
    double longitude;
    Set<Integer> placeTagIds;
    Integer travelPlanId;
    
    // create를 위한 생성자
    @Builder
    public Place(String name, String address, 
                 double latitude, double longitude, Integer travelPlanId) {
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.travelPlanId = travelPlanId;
    }

    /**
     * 현재 장소가 기존 여행 계획의 장소 목록에 이미 있는지 확인합니다.
     * 중복은 현재 장소의 이름, 주소, 또는 위도와 경도의 조합이
     * 기존 장소와 일치할 경우로 정의
     *
     * @param existingPlaces 현재 장소와 비교할 기존 장소 목록
     * @return 목록에 중복된 장소가 발견되면 true, 그렇지 않으면 false
     */
    public boolean hasDuplicatePlace(List<Place> existingPlaces) {
        return existingPlaces.stream()
                .anyMatch(place -> place.getName().equals(this.getName())
                        || place.getAddress().equals(this.getAddress())
                        || (place.getLatitude() == this.getLatitude()
                        && place.getLongitude() == this.getLongitude()));
    }

}
