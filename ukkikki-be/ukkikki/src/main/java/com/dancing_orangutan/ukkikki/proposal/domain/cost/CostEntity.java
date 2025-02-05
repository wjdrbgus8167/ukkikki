package com.dancing_orangutan.ukkikki.proposal.domain.cost;

import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "costs")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CostEntity {

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

	@Builder
	public CostEntity(Integer costId,int maxPeople, int minPeople, int cost, ProposalEntity proposal) {
		this.costId = costId;
		this.maxPeople = maxPeople;
		this.minPeople = minPeople;
		this.cost = cost;
		this.proposal = proposal;
	}
}
