package com.dancing_orangutan.ukkikki.chat.domain;

import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "messages")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MessageEntity {

	@Id
	private String messageId;

	private String content;

	@CreatedDate
	private LocalDateTime createdAt;

	private Integer travelPlanId;

	private Integer memberId;

	private String memberName;

	@Builder
	public MessageEntity(String content, Integer travelPlanId, Integer memberId, String memberName) {
		this.content = content;
		this.travelPlanId = travelPlanId;
		this.memberId = memberId;
		this.memberName = memberName;
	}
}
