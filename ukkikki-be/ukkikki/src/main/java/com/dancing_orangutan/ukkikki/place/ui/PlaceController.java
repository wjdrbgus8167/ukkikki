package com.dancing_orangutan.ukkikki.place.ui;


import com.dancing_orangutan.ukkikki.global.security.MemberUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.place.application.PlaceService;
import com.dancing_orangutan.ukkikki.place.application.command.*;
import com.dancing_orangutan.ukkikki.place.ui.request.CreatePlaceRequest;
import com.dancing_orangutan.ukkikki.place.ui.request.CreatePlaceTagRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(("/travel-plans/{travelPlanId}"))
@RequiredArgsConstructor
@Slf4j
public class PlaceController {

    private final PlaceService placeService;

    @PostMapping("/places")
    public ApiUtils.ApiResponse<?> createPlace(@PathVariable Integer travelPlanId,
                                               @RequestBody CreatePlaceRequest createPlaceRequest) {

        CreatePlaceCommand command = CreatePlaceCommand.builder()
                .travelPlanId(travelPlanId)
                .name(createPlaceRequest.getName())
                .address(createPlaceRequest.getAddress())
                .latitude(createPlaceRequest.getLatitude())
                .longitude(createPlaceRequest.getLongitude())
                .build();

        // CreatePlaceCommand 생성 로깅
        log.debug("CreatePlaceCommand 생성됨 - {}", command);

        try {
            // PlaceService 호출 로깅
            log.info("PlaceService의 createPlace 호출 - {}", command);
            placeService.createPlace(command);

            // 성공 응답 로깅
            log.info("여행 계획 장소 등록 성공 - travelPlanId: {}, 장소 이름: {}", travelPlanId, createPlaceRequest.getName());
            return ApiUtils.success("여행 계획 장소를 등록하였습니다.");

        } catch (Exception e) {
            // 에러 발생 로깅
            log.error("여행 계획 장소 등록 중 오류 발생 - travelPlanId: {}, 요청 데이터: {}", travelPlanId, createPlaceRequest, e);

            // 에러 처리 후 클라이언트에 에러 메시지 반환
            return ApiUtils.error("여행 계획 장소 등록 중 오류가 발생했습니다.", e, HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/places/{placeId}/tags")
    public ApiUtils.ApiResponse<?> createPlaceTag(@PathVariable Integer travelPlanId,
                                                  @PathVariable Integer placeId,
                                                  @AuthenticationPrincipal MemberUserDetails userDetails,
                                                  @RequestBody CreatePlaceTagRequest createPlaceTagRequest) {

        CreatePlaceTagCommand command = CreatePlaceTagCommand.builder()
                .travelPlanId(travelPlanId)
                .placeId(placeId)
                .memberId(userDetails.getMemberId())
                .placeTagName(createPlaceTagRequest.getPlaceTagName())
                .build();

        try {
            // PlaceService 호출 로깅
            log.info("PlaceService의 createPlaceTag 호출 - {}", command);
            placeService.creatPlaceTag(command);

            // 성공 응답 로깅
            log.info("여행 계획 장소 태그 등록 성공 - travelPlanId: {}, placeId: {}, memberName: {}, 장소 이름: {}",
                    travelPlanId, placeId, userDetails.getUsername(), createPlaceTagRequest.getPlaceTagName());
            return ApiUtils.success("여행 계획 장소 태그를 등록하였습니다.");
        } catch (Exception e) {
            // 에러 발생 로깅
            log.error("여행 계획 장소 태그 등록 중 오류 발생 - travelPlanId: {}, 요청 데이터: {}",
                    travelPlanId, createPlaceTagRequest, e);

            // 에러 처리 후 클라이언트에 에러 메시지 반환
            return ApiUtils.error("여행 계획 장소 태그 등록 중 오류가 발생했습니다.", e, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/tags/{tagId}")
    public ApiUtils.ApiResponse<?> deletePlaceTag(@PathVariable Integer travelPlanId,
                                                  @PathVariable Integer tagId,
                                                  @AuthenticationPrincipal MemberUserDetails userDetails) {

        DeletePlaceTagCommand deletePlaceTagCommand = DeletePlaceTagCommand.builder()
                .memberId(userDetails.getMemberId())
                .placeTagId(tagId)
                .travelPlanId(travelPlanId)
                .build();

        placeService.deletePlaceTag(deletePlaceTagCommand);

        return ApiUtils.success("태그를 삭제했습니다.");
    }

    @PostMapping("/places/{placeId}/likes")
    public ApiUtils.ApiResponse<?> createPlaceLike(@PathVariable Integer travelPlanId,
                                                   @PathVariable Integer placeId,
                                                   @AuthenticationPrincipal MemberUserDetails userDetails) {

        CreatePlaceLikeCommand command = CreatePlaceLikeCommand.builder()
                .placeId(placeId)
                .memberId(userDetails.getMemberId())
                .travelPlanId(travelPlanId)
                .build();

        try{
            // PlaceService 호출 로깅
            log.info("PlaceService의 createPlaceLike 호출 - {}", command);
            placeService.createPlaceLike(command);

            // 성공 응답 로깅
            log.info("여행 계획 장소 좋아요 등록 성공 - travelPlanId: {}, placeId: {}, memberName: {}",
                    travelPlanId, placeId, userDetails.getUsername());
            return ApiUtils.success("여행 계획 장소 좋아요를 등록하였습니다.");
        } catch (Exception e) {
            // 에러 발생 로깅
            log.error("여행 계획 장소 좋아요 등록 중 오류 발생 - travelPlanId: {}, placeId: {}, memberName: {}",
                    travelPlanId, placeId, userDetails.getUsername(), e);

            // 에러 처리 후 클라이언트에 에러 메시지 반환
            return ApiUtils.error("여행 계획 장소 좋아요 등록 중 오류가 발생했습니다.", e, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/places/{placeId}/likes")
    public ApiUtils.ApiResponse<?> deletePlaceLike(@PathVariable Integer travelPlanId,
                                                   @PathVariable Integer placeId,
                                                   @AuthenticationPrincipal MemberUserDetails userDetails) {

        DeletePlaceLikeCommand command = DeletePlaceLikeCommand.builder()
                .travelPlanId(travelPlanId)
                .placeId(placeId)
                .memberId(userDetails.getMemberId())
                .build();

        try {
            // PlaceService 호출 로깅
            log.info("PlaceService의 deletePlaceLike 호출 - {}", command);
            placeService.deletePlaceLike(command);

            // 성공 응답 로깅
            log.info("여행 계획 장소 좋아요 삭제 성공 - travelPlanId: {}, placeId: {}, memberName: {}",
                    travelPlanId, placeId, userDetails.getUsername());
            return ApiUtils.success("여행 계획 장소 좋아요를 삭제하였습니다.");
        } catch(Exception e) {
            // 에러 발생 로깅
            log.error("여행 계획 장소 좋아요 등록 중 오류 발생 - travelPlanId: {}, placeId: {}, memberName: {}",
                    travelPlanId, placeId, userDetails.getUsername(), e);

            // 에러 처리 후 클라이언트에 에러 메시지 반환
            return ApiUtils.error("여행 계획 장소 좋아요 삭제 중 오류가 발생했습니다.", e, HttpStatus.BAD_REQUEST);
        }
    }
}
