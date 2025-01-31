package com.dancing_orangutan.ukkikki.travelPlan.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "keywords")
public class KeywordEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer keywordId;

	@Column(nullable = false, length = 50)
	private String name;
}
