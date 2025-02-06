package com.dancing_orangutan.ukkikki.travelPlan.mapper;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRead;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.MessageInfoResponse;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-02-06T10:10:12+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.11.1.jar, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class MessageMapperImpl implements MessageMapper {

    @Override
    public List<MessageInfoResponse> mapMessages(List<TravelPlanRead.MessageInfo> messages) {
        if ( messages == null ) {
            return null;
        }

        List<MessageInfoResponse> list = new ArrayList<MessageInfoResponse>( messages.size() );
        for ( TravelPlanRead.MessageInfo messageInfo : messages ) {
            list.add( messageInfoToMessageInfoResponse( messageInfo ) );
        }

        return list;
    }

    protected MessageInfoResponse messageInfoToMessageInfoResponse(TravelPlanRead.MessageInfo messageInfo) {
        if ( messageInfo == null ) {
            return null;
        }

        MessageInfoResponse.MessageInfoResponseBuilder messageInfoResponse = MessageInfoResponse.builder();

        messageInfoResponse.name( messageInfo.getName() );
        messageInfoResponse.content( messageInfo.getContent() );
        messageInfoResponse.profileImageUrl( messageInfo.getProfileImageUrl() );
        messageInfoResponse.createdAt( messageInfo.getCreatedAt() );

        return messageInfoResponse.build();
    }
}
