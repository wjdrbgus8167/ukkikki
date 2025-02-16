package com.dancing_orangutan.ukkikki.chat.application;

import com.dancing_orangutan.ukkikki.chat.application.command.SaveMessageCommand;
import com.dancing_orangutan.ukkikki.chat.domain.MessageEntity;
import com.dancing_orangutan.ukkikki.chat.domain.MessageRepository;
import com.dancing_orangutan.ukkikki.chat.ui.response.EnterMessageResponse;
import com.dancing_orangutan.ukkikki.chat.ui.response.FetchHistoryMessagesResponse;
import com.dancing_orangutan.ukkikki.chat.ui.response.MessageResponse;
import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import com.dancing_orangutan.ukkikki.member.infrastructure.member.MemberFinder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatService {

	private final MessageRepository messageRepository;
	private final MemberFinder memberFinder;

	public EnterMessageResponse saveEnterMessage(final SaveMessageCommand command) {
		MemberEntity memberEntity = memberFinder.findNameByEmail(command.email());

		MessageEntity messageEntity = MessageEntity.builder()
				.memberId(memberEntity.getMemberId())
				.memberName(memberEntity.getName())
				.travelPlanId(command.travelPlanId())
				.build();

		messageRepository.save(messageEntity);

		return EnterMessageResponse.builder()
				.content(memberEntity.getName() + " 님이 입장하셨습니다.")
				.travelPlanId(messageEntity.getTravelPlanId())
				.memberName(memberEntity.getName())
				.memberId(memberEntity.getMemberId())
				.build();
	}

	public MessageResponse saveMessage(final SaveMessageCommand command) {
		MemberEntity memberEntity = memberFinder.findNameByEmail(command.email());

		MessageEntity messageEntity = MessageEntity.builder()
				.memberId(memberEntity.getMemberId())
				.memberName(memberEntity.getName())
				.travelPlanId(command.travelPlanId())
				.content(command.content())
				.build();

		messageRepository.save(messageEntity);

		return MessageResponse.builder()
				.content(messageEntity.getContent())
				.memberName(memberEntity.getName())
				.travelPlanId(messageEntity.getTravelPlanId())
				.profileImageUrl(memberEntity.getProfileImageUrl())
				.memberId(memberEntity.getMemberId())
				.createdAt(messageEntity.getCreatedAt())
				.build();
	}


	public FetchHistoryMessagesResponse fetchHistoryMessages(Integer travelPlanId, LocalDateTime createdAtBefore, int pageSize) {
		Pageable pageable = PageRequest.of(0, pageSize+1, Sort.by(Sort.Direction.DESC, "createdAt"));

		Page<MessageEntity> messagePage = messageRepository.findByTravelPlanIdAndCreatedAtBeforeOrderByCreatedAtDesc(
				travelPlanId, createdAtBefore, pageable
		);

		return FetchHistoryMessagesResponse.builder()
				.messages(messagePage.getContent().stream()
						.map(message -> MessageResponse.builder()
						.content(message.getContent())
						.memberName(message.getMemberName())
						.travelPlanId(message.getTravelPlanId())
						.profileImageUrl(memberFinder.findById(message.getMemberId()).getProfileImageUrl())
						.memberId(message.getMemberId())
						.createdAt(message.getCreatedAt())
						.build())
						.toList())
				.hasMore(messagePage.getContent().size() > pageSize)
				.build();
	}

}
