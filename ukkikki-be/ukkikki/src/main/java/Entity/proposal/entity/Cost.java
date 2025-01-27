package Entity.proposal.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "costs")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long costId;

	@Column(nullable = false, name = "max_people")
	private int maxPeople;

	@Column(nullable = false, name = "min_people")
	private int minPeople;

	@Column(nullable = false)
	private int cost;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "proposal_id")
	private Proposal proposal;
}
