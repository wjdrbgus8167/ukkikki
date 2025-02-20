package com.dancing_orangutan.ukkikki.geography.domain.airport;

import com.dancing_orangutan.ukkikki.geography.domain.city.CityEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "airports")
@Getter
public class AirportEntity {

	@Id
	private String airportCode; // id 수동 할당

	@Column(nullable = false, name = "airport_name", length = 20)
	private String airportName;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "city_id")
	private CityEntity city;
}
