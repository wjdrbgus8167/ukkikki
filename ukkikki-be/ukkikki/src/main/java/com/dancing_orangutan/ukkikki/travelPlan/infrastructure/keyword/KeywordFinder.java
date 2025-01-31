package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.keyword;

import com.dancing_orangutan.ukkikki.travelPlan.domain.KeywordEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KeywordFinder {

    private final JpaKeywordRepository jpaKeywordRepository;

    public KeywordEntity findById(Integer keywordId) {
        return jpaKeywordRepository.findById(keywordId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 키워드 입니다 : " + keywordId));
    }

}
