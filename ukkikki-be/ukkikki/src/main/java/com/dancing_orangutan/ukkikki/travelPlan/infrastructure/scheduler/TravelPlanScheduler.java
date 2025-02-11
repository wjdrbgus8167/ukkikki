package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.scheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
@Qualifier("threadPoolTaskScheduler")
public class TravelPlanScheduler {

    private final ThreadPoolTaskScheduler scheduler;

    public void scheduleTask(Integer travelPlanId, LocalDateTime closeTime) {
        scheduler.
    }
}
