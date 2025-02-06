package com.dancing_orangutan.ukkikki.travelPlan.mapper;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRead;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.MemberResponse;
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
public class MemberMapperImpl implements MemberMapper {

    @Override
    public List<MemberResponse> mapMembers(List<TravelPlanRead.UserInfo> users) {
        if ( users == null ) {
            return null;
        }

        List<MemberResponse> list = new ArrayList<MemberResponse>( users.size() );
        for ( TravelPlanRead.UserInfo userInfo : users ) {
            list.add( userInfoToMemberResponse( userInfo ) );
        }

        return list;
    }

    protected MemberResponse userInfoToMemberResponse(TravelPlanRead.UserInfo userInfo) {
        if ( userInfo == null ) {
            return null;
        }

        MemberResponse.MemberResponseBuilder memberResponse = MemberResponse.builder();

        memberResponse.userId( userInfo.getUserId() );
        memberResponse.name( userInfo.getName() );
        memberResponse.hostYn( userInfo.isHostYn() );
        memberResponse.totalCount( userInfo.getTotalCount() );
        memberResponse.profileImageUrl( userInfo.getProfileImageUrl() );

        return memberResponse.build();
    }
}
