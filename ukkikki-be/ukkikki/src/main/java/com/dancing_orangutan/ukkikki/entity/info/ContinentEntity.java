package com.dancing_orangutan.ukkikki.entity.info;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "continents")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ContinentEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer continentId;

	@Column(nullable = false, name = "continent_name", length = 10)
	private String name;
}
