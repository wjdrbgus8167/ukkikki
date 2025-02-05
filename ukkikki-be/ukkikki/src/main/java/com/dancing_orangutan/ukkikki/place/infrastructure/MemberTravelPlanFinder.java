package com.dancing_orangutan.ukkikki.place.infrastructure;

import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanId;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.memberTravel.MemberTravelPlanRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component("PlaceMemberTravelPlanFinder")
@RequiredArgsConstructor
@Slf4j
public class MemberTravelPlanFinder {

    private final MemberTravelPlanRepository memberTravelPlanRepository;

    public MemberTravelPlanEntity findMemberTravelPlanById(Integer travelPlanId,
                                                           Integer memberId) {
        // 입력받은 매개변수 기록
        log.debug("findMemberTravelPlanById 호출 - travelPlanId: {}, memberId: {}",
                travelPlanId, memberId);

        // 복합키 객체 생성
        MemberTravelPlanId id = MemberTravelPlanId.builder()
                .travelPlanId(travelPlanId)
                .memberId(memberId)
                .build();

        // 복합키 객체 생성 기록
        log.debug("MemberTravelPlanId 생성 완료 - {}", id);

        // JPA Repository 호출
        log.debug("MemberTravelPlanRepository findById 호출 - id: {}", id);
        return memberTravelPlanRepository.findById(id)
                .orElseThrow(() -> {
                    // 조회 실패 로그
                    log.error("MemberTravelPlan 조회 실패 - id: {}", id);
                    return new EntityNotFoundException("해당 MemberTravelPlan을 찾을 수 없습니다.");
                });
    }
}