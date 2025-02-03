package com.dancing_orangutan.ukkikki.entity.proposal;

import com.dancing_orangutan.ukkikki.proposal.domain.ProposalEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "costs")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Cost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer costId;

	@Column(nullable = false, name = "max_people")
	private int maxPeople;

	@Column(nullable = false, name = "min_people")
	private int minPeople;

	@Column(nullable = false)
	private int cost;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "proposal_id")
	private ProposalEntity proposal;
}
