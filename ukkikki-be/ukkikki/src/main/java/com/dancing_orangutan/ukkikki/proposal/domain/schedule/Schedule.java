package com.dancing_orangutan.ukkikki.proposal.domain.schedule;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class Schedule {

    private final Integer scheduleId;
    private final String scheduleName;
    private final LocalDateTime startTime;
    private final LocalDateTime endTime;
    private final String imageUrl;
    private final Integer proposalId;

    @Builder
    public Schedule(Integer scheduleId, String scheduleName, LocalDateTime startTime, LocalDateTime endTime, String imageUrl, Integer proposalId) {
        this.scheduleId = scheduleId;
        this.scheduleName = scheduleName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.imageUrl = imageUrl;
        this.proposalId = proposalId;
    }

    // 겹치는 일정 확인

    public static boolean hasOverlappingSchedules(List<Schedule> schedules, LocalDateTime newStart, LocalDateTime newEnd) {

        return schedules.stream().anyMatch(existingSchedule ->
                !(existingSchedule.getEndTime().isBefore(newStart) || existingSchedule.getStartTime().isAfter(newEnd))
        );
    }
    public static boolean hasOverlappingSchedules(List<Schedule> schedules) {
        for (int i = 0; i < schedules.size(); i++) {
            for (int j = i + 1; j < schedules.size(); j++) {
                if (isOverlapping(schedules.get(i), schedules.get(j))) {
                    return true; // 하나라도 겹치면 true 반환
                }
            }
        }
        return false; // 겹치는 일정 없음
    }
    private static boolean isOverlapping(Schedule s1, Schedule s2) {
        return !(s1.getEndTime().isBefore(s2.getStartTime()) || s1.getStartTime().isAfter(s2.getEndTime()));
    }

}
