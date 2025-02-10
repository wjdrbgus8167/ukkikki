package com.dancing_orangutan.ukkikki.place.domain.like;

import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class Like {

    private Integer creatorId;
    private Integer placeId;
    private Integer travelPlanId;
    private int likeCount = 0;

    @Builder
    public Like(Integer creatorId, Integer placeId,
                Integer travelPlanId, int likeCount) {
        this.creatorId = creatorId;
        this.placeId = placeId;
        this.travelPlanId = travelPlanId;
        this.likeCount = likeCount;
    }

    /**
     * 현재 인스턴스의 좋아요 수를 제공된 MemberTravelPlanEntity 객체의
     * 성인, 어린이, 유아 수를 합산하여 설정
     *
     * @param memberTravelPlanEntity 성인, 어린이, 유아 수를 포함하는
     *                               MemberTravelPlanEntity 객체
     */
    public void setLikeCount(@NotNull MemberTravelPlanEntity memberTravelPlanEntity) {
        int totalCount = 0;
        totalCount += memberTravelPlanEntity.getAdultCount();
        totalCount += memberTravelPlanEntity.getChildCount();
        totalCount += memberTravelPlanEntity.getInfantCount();
        this.likeCount = totalCount;
    }

    /**
     * Checks whether a specific member has already liked a specific place.
     *
     * @param creatorId The ID of the member.
     * @param placeId   The ID of the place.
     * @return true if the member has already liked the place, false otherwise.
     */
    public static boolean hasDuplicateLike(Integer creatorId, Integer placeId, List<Like> existingLikes) {
        return existingLikes.stream()
                .anyMatch(like -> like.getCreatorId().equals(creatorId) && like.getPlaceId().equals(placeId));
    }

}
