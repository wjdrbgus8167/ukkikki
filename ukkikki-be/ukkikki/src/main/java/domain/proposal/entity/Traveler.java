package domain.proposal.entity;

import domain.travelPlan.entity.UserTravelPlan;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "travelers")
public class Traveler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelerId;

    @Column(nullable = false, name = "korean_name", length = 10)
    private String koreanName;

    @Column(nullable = false, name = "english_name", length = 50)
    private String englishName;

    @Column(nullable = false, name = "passport_number", length = 30)
    private String passportNumber;

    @Column(nullable = false, name = "expiration_date")
    private LocalDate expirationDate;

    @Column(nullable = false, name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "phone_number", length = 11)
    private String phoneNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proposal_id")
    private Proposal proposal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_travel_plan_id")
    private UserTravelPlan userTravelPlan;
}

