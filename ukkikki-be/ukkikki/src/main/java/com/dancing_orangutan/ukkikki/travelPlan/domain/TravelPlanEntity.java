package com.dancing_orangutan.ukkikki.travelPlan.domain;

import com.dancing_orangutan.ukkikki.entity.info.City;
import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "travel_plans")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TravelPlanEntity {

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

    @Column(nullable = false, name = "close_time")
    private LocalDateTime closeTime;

    @Column(nullable = false, name = "create_time")
    private LocalDateTime createTime;

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
    public TravelPlanEntity(Integer travelPlanId, String name, LocalDate startDate, LocalDate endDate,
                            String hostComment, PlanningStatus planningStatus,LocalDateTime closeTime,LocalDateTime createTime,  int minPeople, int maxPeople,
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
