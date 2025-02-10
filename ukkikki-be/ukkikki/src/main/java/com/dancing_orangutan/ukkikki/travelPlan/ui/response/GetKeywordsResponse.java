package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetKeywordsResponse {
    List<KeywordResponse> keywords;

    @Getter
    @Builder
    public static class KeywordResponse {
        private Integer id;
        private String name;
    }
}
