package domain.proposal.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "vote_surveys")
public class VoteSurvey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteSurveyId;

    @Column(nullable = false, name = "survey_start_time")
    private LocalDateTime surveyStartTime;

    @Column(nullable = false, name = "survey_end_time")
    private LocalDateTime surveyEndTime;
}
