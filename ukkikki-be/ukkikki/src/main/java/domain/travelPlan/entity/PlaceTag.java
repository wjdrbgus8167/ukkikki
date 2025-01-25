package domain.travelPlan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "place_tags")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlaceTag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long placeTagId;

	@Column(nullable = false, name = "place_tag_name", length = 50)
	private String placeTagName;
}
