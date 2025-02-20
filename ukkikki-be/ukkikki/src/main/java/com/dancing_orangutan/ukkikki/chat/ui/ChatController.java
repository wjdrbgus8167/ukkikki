package com.dancing_orangutan.ukkikki.chat.ui;

import com.dancing_orangutan.ukkikki.chat.application.ChatService;
import com.dancing_orangutan.ukkikki.chat.application.command.SaveMessageCommand;
import com.dancing_orangutan.ukkikki.chat.ui.request.EnterMessageRequest;
import com.dancing_orangutan.ukkikki.chat.ui.request.ActionRequest;
import com.dancing_orangutan.ukkikki.chat.ui.request.MessageRequest;
import com.dancing_orangutan.ukkikki.chat.ui.response.ActionResponse;
import com.dancing_orangutan.ukkikki.chat.ui.response.EnterMessageResponse;
import com.dancing_orangutan.ukkikki.chat.ui.response.FetchHistoryMessagesResponse;
import com.dancing_orangutan.ukkikki.chat.ui.response.MessageResponse;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChatController {

	private final SimpMessagingTemplate simpMessagingTemplate;
	private final ChatService chatService;

	/**
	 * /pub/chat/enter
	 */
	@MessageMapping("/chat/enter")
	public void enterTravelPlan(EnterMessageRequest request, Principal principal) {
		SaveMessageCommand command = SaveMessageCommand.builder()
				.travelPlanId(request.travelPlanId())
				.email(principal.getName())
				.build();

		EnterMessageResponse enterMessageResponse = chatService.saveEnterMessage(
				command);
		simpMessagingTemplate.convertAndSend(
				"/sub/chat/travel-plan/" + enterMessageResponse.travelPlanId(),
				enterMessageResponse);
	}

	/**
	 * /pub/chat/message
	 */
	@MessageMapping("/chat/message")
	public void message(MessageRequest request, Principal principal) {
		MessageResponse messageResponse = chatService.saveMessage(
				request.toDomain(principal.getName()));
		simpMessagingTemplate.convertAndSend(
				"/sub/chat/travel-plan/" + messageResponse.travelPlanId(),
				messageResponse);
	}

	/**
	 * /pub/actions
	 */
	@MessageMapping("/actions")
	public void action(ActionRequest request, Principal principal) {
		log.info(request.toString());

		String memberName = chatService.fetchMemberName(principal.getName());

		ActionResponse response = ActionResponse.builder()
				.travelPlanId(request.travelPlanId())
				.action(request.action())
				.placeName(request.placeName())
				.memberName(memberName)
				.build();

		simpMessagingTemplate.convertAndSend(
				"/sub/actions/travel-plan/" + response.travelPlanId(),
				response
		);
	}

	/**
	 * 이전 채팅 메시지 가져오기
	 */
	@GetMapping("/chat/{travelPlanId}/history")
	public ApiUtils.ApiResponse<FetchHistoryMessagesResponse> fetchHistoryMessages(
			@PathVariable(name = "travelPlanId") Integer travelPlanId,
			@RequestParam(required = true) LocalDateTime createdAtBefore) {

		FetchHistoryMessagesResponse response = chatService.fetchHistoryMessages(travelPlanId, createdAtBefore, 50);
		return ApiUtils.success(response);
	}
}
