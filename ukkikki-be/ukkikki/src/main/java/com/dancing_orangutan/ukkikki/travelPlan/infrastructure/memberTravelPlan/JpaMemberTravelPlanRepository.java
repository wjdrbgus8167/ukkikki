package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.memberTravelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanId;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;


@Component
public interface JpaMemberTravelPlanRepository extends
        JpaRepository<MemberTravelPlanEntity, MemberTravelPlanId>,
        MemberTravelPlanRepository {

    boolean existsByMember_MemberIdAndTravelPlan_TravelPlanId(Integer memberId, Integer travelPlanId);

    default void store(MemberTravelPlanEntity entity) {
        save(entity);
    }
}
