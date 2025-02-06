package com.dancing_orangutan.ukkikki.proposal.domain.schedule;

import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "schedules")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ScheduleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer scheduleId;

    @Column(nullable = false, name = "schedule_name", length = 255)
    private String scheduleName;

    @Column(nullable = false, name = "start_time")
    private LocalDateTime startTime;

    @Column(nullable = false, name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "image_url", length = 2000)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proposal_id")
    private ProposalEntity proposal;

    @Builder
    public ScheduleEntity(Integer scheduleId, String scheduleName, LocalDateTime startTime, LocalDateTime endTime, String imageUrl, ProposalEntity proposal) {
        this.scheduleId = scheduleId;
        this.scheduleName = scheduleName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.imageUrl = imageUrl;
        this.proposal = proposal;
    }
}
