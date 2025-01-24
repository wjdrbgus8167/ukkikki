package domain.travelPlan.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "travel_plans")
public class TravelPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelPlanId;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false, name = "start_date")
    private LocalDate startDate;

    @Column(nullable = false, name = "end_date")
    private LocalDate endDate;

    @Column(length = 1000)
    private String hostComment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false,name = "planning_status")
    private PlanningStatus planningStatus;

    @Column(nullable = false, name = "min_people")
    private int minPeople;

    @Column(nullable = false, name = "max_people")
    private int maxPeople;
}
