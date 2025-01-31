    package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlanKeyword;

    import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.TravelPlanKeywordEntity;
    import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.TravelPlanKeywordId;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Component;

    @Component
    public interface JpaTravelPlanKeywordRepository extends JpaRepository<TravelPlanKeywordEntity, TravelPlanKeywordId> {
    }
