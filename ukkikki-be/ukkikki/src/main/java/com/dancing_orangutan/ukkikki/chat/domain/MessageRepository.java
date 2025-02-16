package com.dancing_orangutan.ukkikki.chat.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface MessageRepository {

    MessageEntity save(MessageEntity message);

    Page<MessageEntity> findByTravelPlanIdAndCreatedAtBeforeOrderByCreatedAtDesc(
            Integer travelPlanId, LocalDateTime createdAtBefore, Pageable pageable);

}
