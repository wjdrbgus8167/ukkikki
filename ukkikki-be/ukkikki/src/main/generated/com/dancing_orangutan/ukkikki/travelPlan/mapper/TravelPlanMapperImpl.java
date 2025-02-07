package com.dancing_orangutan.ukkikki.travelPlan.mapper;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRead;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.JoinTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.MemberResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.MessageInfoResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.PlaceInfoResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.PlaceTagResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.TravelPlanInfoResponse;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-02-07T20:06:14+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.10 (Amazon.com Inc.)"
)
@Component
public class TravelPlanMapperImpl implements TravelPlanMapper {

    @Override
    public JoinTravelPlanResponse toJoinTravelResponse(TravelPlanRead travelPlanRead) {
        if ( travelPlanRead == null ) {
            return null;
        }

        JoinTravelPlanResponse.JoinTravelPlanResponseBuilder joinTravelPlanResponse = JoinTravelPlanResponse.builder();

        joinTravelPlanResponse.users( mapUsers( travelPlanRead.getUsers() ) );
        joinTravelPlanResponse.travelPlan( mapTravelPlan( travelPlanRead.getTravelPlan() ) );
        joinTravelPlanResponse.messages( mapMessages( travelPlanRead.getMessages() ) );

        return joinTravelPlanResponse.build();
    }

    @Override
    public List<MemberResponse> mapUsers(List<TravelPlanRead.UserInfo> users) {
        if ( users == null ) {
            return null;
        }

        List<MemberResponse> list = new ArrayList<MemberResponse>( users.size() );
        for ( TravelPlanRead.UserInfo userInfo : users ) {
            list.add( userInfoToMemberResponse( userInfo ) );
        }

        return list;
    }

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

    @Override
    public TravelPlanInfoResponse mapTravelPlan(TravelPlanRead.TravelPlanInfo travelPlan) {
        if ( travelPlan == null ) {
            return null;
        }

        TravelPlanInfoResponse.TravelPlanInfoResponseBuilder travelPlanInfoResponse = TravelPlanInfoResponse.builder();

        travelPlanInfoResponse.places( mapPlaces( travelPlan.getPlaces() ) );
        travelPlanInfoResponse.name( travelPlan.getName() );
        travelPlanInfoResponse.startDate( travelPlan.getStartDate() );
        travelPlanInfoResponse.endDate( travelPlan.getEndDate() );
        travelPlanInfoResponse.departureCityName( travelPlan.getDepartureCityName() );
        travelPlanInfoResponse.arrivalCityName( travelPlan.getArrivalCityName() );
        travelPlanInfoResponse.hostComment( travelPlan.getHostComment() );
        travelPlanInfoResponse.planningStatus( travelPlan.getPlanningStatus() );
        travelPlanInfoResponse.createTime( travelPlan.getCreateTime() );
        travelPlanInfoResponse.closeTime( travelPlan.getCloseTime() );
        travelPlanInfoResponse.minPeople( travelPlan.getMinPeople() );
        travelPlanInfoResponse.maxPeople( travelPlan.getMaxPeople() );
        List<String> list1 = travelPlan.getKeywords();
        if ( list1 != null ) {
            travelPlanInfoResponse.keywords( new ArrayList<String>( list1 ) );
        }

        return travelPlanInfoResponse.build();
    }

    @Override
    public List<PlaceInfoResponse> mapPlaces(List<TravelPlanRead.PlaceInfo> places) {
        if ( places == null ) {
            return null;
        }

        List<PlaceInfoResponse> list = new ArrayList<PlaceInfoResponse>( places.size() );
        for ( TravelPlanRead.PlaceInfo placeInfo : places ) {
            list.add( placeInfoToPlaceInfoResponse( placeInfo ) );
        }

        return list;
    }

    @Override
    public List<PlaceTagResponse> mapPlaceTags(List<TravelPlanRead.PlaceTagInfo> placeTags) {
        if ( placeTags == null ) {
            return null;
        }

        List<PlaceTagResponse> list = new ArrayList<PlaceTagResponse>( placeTags.size() );
        for ( TravelPlanRead.PlaceTagInfo placeTagInfo : placeTags ) {
            list.add( placeTagInfoToPlaceTagResponse( placeTagInfo ) );
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

    protected PlaceInfoResponse placeInfoToPlaceInfoResponse(TravelPlanRead.PlaceInfo placeInfo) {
        if ( placeInfo == null ) {
            return null;
        }

        PlaceInfoResponse.PlaceInfoResponseBuilder placeInfoResponse = PlaceInfoResponse.builder();

        placeInfoResponse.placeId( placeInfo.getPlaceId() );
        placeInfoResponse.name( placeInfo.getName() );
        placeInfoResponse.address( placeInfo.getAddress() );
        placeInfoResponse.placeTags( mapPlaceTags( placeInfo.getPlaceTags() ) );
        placeInfoResponse.likesCnt( placeInfo.getLikesCnt() );
        placeInfoResponse.likeYn( placeInfo.isLikeYn() );

        return placeInfoResponse.build();
    }

    protected PlaceTagResponse placeTagInfoToPlaceTagResponse(TravelPlanRead.PlaceTagInfo placeTagInfo) {
        if ( placeTagInfo == null ) {
            return null;
        }

        PlaceTagResponse.PlaceTagResponseBuilder placeTagResponse = PlaceTagResponse.builder();

        placeTagResponse.placeTagId( placeTagInfo.getPlaceTagId() );
        placeTagResponse.placeTagName( placeTagInfo.getPlaceTagName() );

        return placeTagResponse.build();
    }
}
