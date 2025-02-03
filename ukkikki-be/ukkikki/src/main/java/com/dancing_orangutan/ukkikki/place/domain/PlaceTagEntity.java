package com.dancing_orangutan.ukkikki.place.domain;

import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "place_tags")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlaceTagEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer placeTagId;

	@Column(nullable = false, name = "place_tag_name", length = 50)
	private String placeTagName;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "place_id")
	private PlaceEntity placeEntity;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumns({
			@JoinColumn(name = "travel_plan_id"),
			@JoinColumn(name = "member_id")
	})
	private MemberTravelPlanEntity memberTravelPlan;
	
	@Builder
    PlaceTagEntity(String placeTagName, PlaceEntity placeEntity,
				   MemberTravelPlanEntity memberTravelPlan) {
        this.placeTagName = placeTagName;
        this.placeEntity = placeEntity;
        this.memberTravelPlan = memberTravelPlan;
    }
}
