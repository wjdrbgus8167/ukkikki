package com.dancing_orangutan.ukkikki.chat.infrastructure;

import com.dancing_orangutan.ukkikki.chat.domain.MessageEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoMessageRepository extends MongoRepository<MessageEntity,Integer> {

}
