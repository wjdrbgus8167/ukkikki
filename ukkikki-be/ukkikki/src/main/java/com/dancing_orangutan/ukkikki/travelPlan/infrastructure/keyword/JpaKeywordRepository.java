package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.keyword;

import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface JpaKeywordRepository extends JpaRepository<KeywordEntity, Integer> {
}
