package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import lombok.Builder;

public record PlaceResponse(Integer placeId, String name, List<PlaceTagResponse> tags, Integer likeCount,
							double latitude,
							double longitude,
							@JsonInclude(JsonInclude.Include.NON_DEFAULT) boolean likeYn) {

	@Builder
	public PlaceResponse{

	}

}
