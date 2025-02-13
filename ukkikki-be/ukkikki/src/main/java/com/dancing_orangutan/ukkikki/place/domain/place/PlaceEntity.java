package com.dancing_orangutan.ukkikki.place.domain.place;

import com.dancing_orangutan.ukkikki.place.domain.placeTag.PlaceTagEntity;
import com.dancing_orangutan.ukkikki.place.domain.like.LikeEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import jakarta.persistence.*;

import lombok.*;
import java.util.Set;

@Entity
@Table(name = "places")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class PlaceEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer placeId;

	@Column(nullable = false, length = 50)
	private String name;

	@Column(nullable = false, length = 100)
	private String address;

	@Column(nullable = false)
	private double latitude;

	@Column(nullable = false)
	private double longitude;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "travel_plan_id", nullable = false)
	private TravelPlanEntity travelPlan;

	@OneToMany(mappedBy = "placeEntity", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<PlaceTagEntity> placeTags;

	@OneToMany(mappedBy = "placeEntity", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<LikeEntity> likes;


	public int countLikes() {
		return likes.stream().mapToInt(LikeEntity::getLikesCnt).sum();
	}
}
