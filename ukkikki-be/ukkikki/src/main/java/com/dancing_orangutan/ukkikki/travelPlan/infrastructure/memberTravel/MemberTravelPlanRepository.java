package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.memberTravel;

import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberTravelPlanRepository extends JpaRepository<MemberTravelPlanEntity, MemberTravelPlanId> {

}
