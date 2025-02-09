package com.dancing_orangutan.ukkikki.chat.application;

import com.dancing_orangutan.ukkikki.chat.application.command.SaveMessageCommand;
import com.dancing_orangutan.ukkikki.chat.domain.Message;
import com.dancing_orangutan.ukkikki.chat.infrastructure.MessageRepository;
import com.dancing_orangutan.ukkikki.chat.ui.response.EnterMessageResponse;
import com.dancing_orangutan.ukkikki.chat.ui.response.MessageResponse;
import com.dancing_orangutan.ukkikki.member.infrastructure.member.MemberFinder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

	private final MessageRepository messageRepository;
	private final MemberFinder memberFinder;

	public EnterMessageResponse saveEnterMessage(final SaveMessageCommand command) {
		Message domain = command.toDomain();
		messageRepository.saveMessage(domain);
		String memberName = memberFinder.getMemberNameById(domain.memberId());

		return EnterMessageResponse.builder()
				.content(memberName + " 님이 입장하셨습니다.")
				.travelPlanId(domain.travelPlanId())
				.build();
	}

	public MessageResponse saveMessage(final SaveMessageCommand command) {
		Message domain = command.toDomain();

		Message savedMessage = messageRepository.saveMessage(domain);
		String memberName = memberFinder.getMemberNameById(domain.memberId());

		return MessageResponse.builder()
				.content(savedMessage.content())
				.memberName(memberName)
				.travelPlanId(savedMessage.travelPlanId())
				.build();
	}
}
