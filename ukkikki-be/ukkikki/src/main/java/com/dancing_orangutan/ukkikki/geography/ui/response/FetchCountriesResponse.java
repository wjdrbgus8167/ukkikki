package com.dancing_orangutan.ukkikki.geography.ui.response;

import lombok.Builder;

public record FetchCountriesResponse(Integer countryId, String name) {

    @Builder
    public FetchCountriesResponse {

    }
}
