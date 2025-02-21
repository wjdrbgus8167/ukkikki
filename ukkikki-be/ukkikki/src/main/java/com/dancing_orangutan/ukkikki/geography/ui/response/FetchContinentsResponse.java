package com.dancing_orangutan.ukkikki.geography.ui.response;

import lombok.Builder;

public record FetchContinentsResponse(Integer continentId, String name) {

    @Builder
    public FetchContinentsResponse {

    }

}
