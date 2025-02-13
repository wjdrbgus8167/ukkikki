package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response;

import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.KeywordResponse;
import java.util.List;
import lombok.Builder;


public record FetchKeywordsResponse(List<KeywordResponse> keywords) {

    @Builder
    public FetchKeywordsResponse{

    }
}
