package com.dancing_orangutan.ukkikki.proposal.ui.request;

import com.dancing_orangutan.ukkikki.proposal.application.command.CreateScheduleCommand;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CreateScheduleRequest {

    String scheduleName;
    LocalDateTime startTime;
    LocalDateTime endTime;
    String imageUrl;

    @Builder
    public CreateScheduleRequest(String scheduleName, LocalDateTime startTime, LocalDateTime endTime, String imageUrl) {

        this.scheduleName = scheduleName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.imageUrl = imageUrl;
    }

    public CreateScheduleCommand toCommand() {
        validate(scheduleName,startTime,endTime);
        return CreateScheduleCommand
                .builder()
                .scheduleName(scheduleName)
                .startDate(startTime)
                .endDate(endTime)
                .imageUrl(imageUrl)
                .build();
    }

    private void validate(String scheduleName,LocalDateTime startTime,LocalDateTime endTime) {

        if (scheduleName ==null ) {
            throw new IllegalArgumentException("일정 제목을 입력해주세요");
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
