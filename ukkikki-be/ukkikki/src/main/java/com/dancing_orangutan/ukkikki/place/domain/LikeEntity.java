package com.dancing_orangutan.ukkikki.place.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name = "likes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikeEntity {

	@EmbeddedId
	private LikeId likeId;

	@Column(nullable = false,name = "likes_cnt")
	private int likesCnt;

	@CreatedDate
	@Column
	private LocalDate createdAt;
}
