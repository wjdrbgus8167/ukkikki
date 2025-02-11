package com.dancing_orangutan.ukkikki.chat.domain;

import java.time.LocalDateTime;
import java.util.List;

public interface MessageRepository {

    MessageEntity save(MessageEntity message);

    List<MessageEntity> findAllByTravelPlanIdAndCreatedAtBefore(Integer travelPlanId, LocalDateTime createdAtBefore);

}
