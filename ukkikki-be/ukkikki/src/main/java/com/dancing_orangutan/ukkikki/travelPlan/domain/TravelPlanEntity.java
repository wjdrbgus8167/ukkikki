package com.dancing_orangutan.ukkikki.travelPlan.domain;

import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "travel_plans")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)  // Auditing 활성화
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

    @Column(nullable = true, name = "close_time")
    private LocalDateTime closeTime;

    @CreatedDate
    @Column(nullable = false, name = "create_time")
    private LocalDateTime createTime;

    @Column(nullable = false, name = "min_people")
    private int minPeople;

    @Column(nullable = false, name = "max_people")
    private int maxPeople;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departure_city_id")
    private CityEntity departureCity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "arrival_city_id")
    private CityEntity arrivalCity;

    @Builder
    public TravelPlanEntity(Integer travelPlanId, String name, LocalDate startDate, LocalDate endDate,
                            String hostComment, PlanningStatus planningStatus, LocalDateTime createTime, int minPeople, int maxPeople,
                            CityEntity departureCity, CityEntity arrivalCity) {
        this.travelPlanId = travelPlanId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.hostComment = hostComment;
        this.planningStatus = planningStatus;
        this.createTime = createTime;
        this.minPeople = minPeople;
        this.maxPeople = maxPeople;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
    }

}
