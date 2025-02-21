package com.dancing_orangutan.ukkikki.travelPlan.domain.keyword;

import java.util.List;

public interface KeywordRepository {

	List<KeywordEntity> findByKeywordIdIn(List<Integer> keywordIds);

	List<KeywordEntity> findAll();

}
