package com.dancing_orangutan.ukkikki.geography.domain.city;

import com.dancing_orangutan.ukkikki.geography.domain.CountryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "cities")
@Getter
public class CityEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer cityId;

	@Column(nullable = false, name = "city_name", length = 20)
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "country_id")
	private CountryEntity countryEntity;

	@Builder
	public CityEntity(Integer cityId, String name, CountryEntity countryEntity) {
		this.cityId = cityId;
		this.name = name;
		this.countryEntity = countryEntity;
	}
}
