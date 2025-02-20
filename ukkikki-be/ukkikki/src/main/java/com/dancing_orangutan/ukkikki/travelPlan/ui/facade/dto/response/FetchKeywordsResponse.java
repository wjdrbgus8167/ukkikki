package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response;

import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import java.util.List;
import lombok.Builder;


public record FetchKeywordsResponse(List<KeywordResponse> keywords) {

    public static FetchKeywordsResponse fromEntities(List<KeywordEntity> entities) {
        return FetchKeywordsResponse.builder()
                .keywords(entities.stream().map(KeywordResponse::fromEntity).toList())
                .build();
    }

    @Builder
    public FetchKeywordsResponse{

    }

    private record KeywordResponse(
            Integer keywordId,
            String name
    ) {
        @Builder
        private KeywordResponse {}

        private static KeywordResponse fromEntity(KeywordEntity entity) {
            return KeywordResponse.builder()
                    .keywordId(entity.getKeywordId())
                    .name(entity.getName())
                    .build();
        }
    }
}
