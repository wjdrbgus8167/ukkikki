package com.dancing_orangutan.ukkikki.place.domain.place;

import lombok.Builder;
import lombok.Getter;

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

//    public void addTag(String tagName, Member member) {
//        // 1. 같은 이름의 태그가 이미 존재하는지 검사
//        if (hasTagWithName(tagName)) {
//            throw new DuplicateTagException();
//        }
//        // 2. 새로운 태그 생성 및 추가
//        PlaceTag tag = new PlaceTag(this, member, tagName);
//        tags.add(tag);
//    }
    
    
}
