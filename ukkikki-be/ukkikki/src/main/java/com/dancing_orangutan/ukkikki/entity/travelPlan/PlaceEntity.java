package com.dancing_orangutan.ukkikki.entity.travelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.domain.like.LikeEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "places")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PlaceEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer placeId;

	@Column(nullable = false, length = 50)
	private String name;

	@Column(nullable = false, length = 100)
	private String address;

	@Column(nullable = false)
	private BigDecimal latitude;

	@Column(nullable = false)
	private BigDecimal longitude;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "travel_plan_id")
	private TravelPlanEntity travelPlan;

	@OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PlaceTag> placeTags;

	@OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<LikeEntity> likes;
}
