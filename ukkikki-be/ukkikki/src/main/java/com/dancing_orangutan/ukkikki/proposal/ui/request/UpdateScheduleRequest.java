package com.dancing_orangutan.ukkikki.proposal.ui.request;

import com.dancing_orangutan.ukkikki.proposal.application.command.UpdateScheduleCommand;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class UpdateScheduleRequest {

    String scheduleName;
    LocalDateTime startTime;
    LocalDateTime endTime;
    String imageUrl;

    @Builder
    public UpdateScheduleRequest(String scheduleName, LocalDateTime startTime, LocalDateTime endTime, String imageUrl) {

        this.scheduleName = scheduleName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.imageUrl = imageUrl;
    }

    public UpdateScheduleCommand requestToDomain(Integer proposalId,Integer scheduleId) {
        validate(proposalId,scheduleId);
        return UpdateScheduleCommand
                .builder()
                .proposalId(proposalId)
                .scheduleId(scheduleId)
                .scheduleName(scheduleName)
                .startDate(startTime)
                .endDate(endTime)
                .imageUrl(imageUrl)
                .build();
    }

    private void validate(Integer proposalId, Integer scheduleId) {

        if(proposalId == null) {
            throw new IllegalArgumentException("제안서 ID는 필수입니다.");
        }

        if(proposalId <=0) {
            throw new IllegalArgumentException("제안서 ID는 양수이어야 합니다.");
        }
        if(scheduleId == null) {
            throw new IllegalArgumentException("제안서 ID는 필수입니다.");
        }

        if(scheduleId <=0) {
            throw new IllegalArgumentException("제안서 ID는 양수이어야 합니다.");
        }

        if (startTime ==null ) {
            throw new IllegalArgumentException("시작 날짜와 시간을 입력해주세요.");
        }

        if (endTime ==null) {
            throw new IllegalArgumentException("종료 날짜와 시간을 입력해주세요.");
        }

        if (!startTime.isBefore(endTime)) {
            throw new IllegalArgumentException("시작 시간은 종료 시간보다 이전이어야 합니다.");
        }

    }
}
