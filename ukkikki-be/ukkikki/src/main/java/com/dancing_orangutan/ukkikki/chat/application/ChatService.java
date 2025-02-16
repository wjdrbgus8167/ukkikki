package com.dancing_orangutan.ukkikki.chat.application;

import com.dancing_orangutan.ukkikki.chat.application.command.SaveMessageCommand;
import com.dancing_orangutan.ukkikki.chat.domain.MessageEntity;
import com.dancing_orangutan.ukkikki.chat.domain.MessageRepository;
import com.dancing_orangutan.ukkikki.chat.ui.response.EnterMessageResponse;
import com.dancing_orangutan.ukkikki.chat.ui.response.MessageResponse;
import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import com.dancing_orangutan.ukkikki.member.infrastructure.member.MemberFinder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
				.build();
	}
}
