
package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common;


import lombok.Builder;

public record PlaceTagResponse(Integer placeTagId, String name) {

	@Builder
	public PlaceTagResponse{

	}

}