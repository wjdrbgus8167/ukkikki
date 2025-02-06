package com.dancing_orangutan.ukkikki.geography.domain;

import lombok.Builder;

public record Continent(Integer continentId, String name) {

    @Builder
    public Continent{

    }
}
