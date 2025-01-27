package domain.proposal.entity;

import domain.travelPlan.entity.TravelPlan;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vote_surveys")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VoteSurvey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteSurveyId;

    @Column(nullable = false, name = "survey_start_time")
    private LocalDateTime surveyStartTime;

    @Column(nullable = false, name = "survey_end_time")
    private LocalDateTime surveyEndTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_plan_id")
    private TravelPlan travelPlan;
}
