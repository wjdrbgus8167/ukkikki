package com.dancing_orangutan.ukkikki.geography.application.query;

import lombok.Builder;

public record FetchCitiesQuery(Integer continentId, Integer countryId) {

    @Builder
    public FetchCitiesQuery {

    }
}
