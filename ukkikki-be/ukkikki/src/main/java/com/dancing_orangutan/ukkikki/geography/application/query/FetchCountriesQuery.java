package com.dancing_orangutan.ukkikki.geography.application.query;

import lombok.Builder;

public record FetchCountriesQuery(Integer continentId) {

    @Builder
    public FetchCountriesQuery {

    }
}
