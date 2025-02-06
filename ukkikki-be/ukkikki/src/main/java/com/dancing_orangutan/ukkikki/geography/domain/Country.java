package com.dancing_orangutan.ukkikki.geography.domain;

import lombok.Builder;

public record Country(Integer countryId, Integer continentId, String name) {


    @Builder
    public Country{

    }
}
