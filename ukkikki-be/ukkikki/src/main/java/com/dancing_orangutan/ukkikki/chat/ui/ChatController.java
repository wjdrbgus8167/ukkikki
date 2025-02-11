package com.dancing_orangutan.ukkikki.chat.ui;

import com.dancing_orangutan.ukkikki.chat.application.ChatService;
import com.dancing_orangutan.ukkikki.chat.application.command.SaveMessageCommand;
import com.dancing_orangutan.ukkikki.chat.ui.request.EnterMessageRequest;
import com.dancing_orangutan.ukkikki.chat.ui.request.MessageRequest;
import com.dancing_orangutan.ukkikki.chat.ui.response.EnterMessageResponse;
import com.dancing_orangutan.ukkikki.chat.ui.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
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
        MessageResponse messageResponse = chatService.saveMessage(request.toDomain(principal.getName()));
        simpMessagingTemplate.convertAndSend(
                "/sub/chat/travel-plan/" + messageResponse.travelPlanId(),
                messageResponse);
    }
}
