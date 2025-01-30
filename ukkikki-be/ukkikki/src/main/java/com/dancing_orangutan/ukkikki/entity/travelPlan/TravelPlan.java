package com.dancing_orangutan.ukkikki.entity.travelPlan;

import com.dancing_orangutan.ukkikki.entity.info.City;
import jakarta.persistence.*;

import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "travel_plans")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TravelPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer travelPlanId;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departure_city_id")
    private City departureCity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "arrival_city_id")
    private City arrivalCity;

    @Builder
    public TravelPlan(Integer travelPlanId, String name, LocalDate startDate, LocalDate endDate,
            String hostComment, PlanningStatus planningStatus, int minPeople, int maxPeople,
            City departureCity, City arrivalCity) {
        this.travelPlanId = travelPlanId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.hostComment = hostComment;
        this.planningStatus = planningStatus;
        this.minPeople = minPeople;
        this.maxPeople = maxPeople;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
    }

}
