package domain.proposal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "costs")
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
}
