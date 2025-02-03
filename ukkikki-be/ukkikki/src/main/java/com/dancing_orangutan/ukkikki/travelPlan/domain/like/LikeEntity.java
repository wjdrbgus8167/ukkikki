package com.dancing_orangutan.ukkikki.travelPlan.domain.like;

import com.dancing_orangutan.ukkikki.entity.member.MemberEntity;
import com.dancing_orangutan.ukkikki.entity.travelPlan.PlaceEntity;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name = "likes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class LikeEntity {

	@EmbeddedId
	private LikeIdEntity likeId;

	@Column(nullable = false, name = "likes_cnt")
	private int likesCnt;

	@CreatedDate
	@Column
	private LocalDate createdAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("placeId")
	@JoinColumn(name = "place_id")
	private PlaceEntity place;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("memberId")
	@JoinColumn(name = "member_id")
	private MemberEntity member;
}

