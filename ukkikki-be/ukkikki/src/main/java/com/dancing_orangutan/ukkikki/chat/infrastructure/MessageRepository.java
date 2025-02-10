package com.dancing_orangutan.ukkikki.chat.infrastructure;

import com.dancing_orangutan.ukkikki.chat.domain.Message;
import com.dancing_orangutan.ukkikki.chat.domain.MessageEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class MessageRepository {

	private final MongoMessageRepository repository;

	public Message saveMessage(final Message message) {
		MessageEntity entity = MessageEntity.builder()
				.content(message.content())
				.memberId(message.memberId())
				.travelPlanId(message.travelPlanId())
				.build();
		MessageEntity save = repository.save(entity);

		return Message.builder()
				.travelPlanId(entity.getTravelPlanId())
				.memberId(entity.getMemberId())
				.content(save.getContent())
				.build();
	}

}
