package com.dancing_orangutan.ukkikki.geography.domain;

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
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "countries")
@Getter
public class CountryEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer countryId;

	@Column(nullable = false, name = "country_name", length = 20)
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "continent_id")
	private ContinentEntity continentEntity;
}
