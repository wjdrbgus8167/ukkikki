package com.dancing_orangutan.ukkikki.travelPlan.application.query;

import lombok.Builder;
import org.springframework.data.domain.Pageable;

@Builder
public record FetchAllTravelPlansQuery(Pageable pageable) {

}
