package com.dancing_orangutan.ukkikki.travelPlan.mapper;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRead;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.PlaceInfoResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.PlaceTagResponse;
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
public class PlaceMapperImpl implements PlaceMapper {

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
