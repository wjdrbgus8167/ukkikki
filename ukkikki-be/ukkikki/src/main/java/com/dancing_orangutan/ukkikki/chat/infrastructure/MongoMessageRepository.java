package com.dancing_orangutan.ukkikki.chat.infrastructure;

import com.dancing_orangutan.ukkikki.chat.domain.MessageEntity;
import com.dancing_orangutan.ukkikki.chat.domain.MessageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;

public interface MongoMessageRepository extends MongoRepository<MessageEntity,String>, MessageRepository {
    Page<MessageEntity> findByTravelPlanIdAndCreatedAtBeforeOrderByCreatedAtDesc(
            Integer travelPlanId, LocalDateTime createdAtBefore, Pageable pageable);
}
