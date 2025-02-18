package com.dancing_orangutan.ukkikki.proposal.application.event.handler;

import com.dancing_orangutan.ukkikki.proposal.application.ProposalService;
import com.dancing_orangutan.ukkikki.proposal.application.command.CreateVoteSurveyCommand;
import com.dancing_orangutan.ukkikki.proposal.domain.event.ProposalSubmissionPeriodExpiredEvent;
import com.dancing_orangutan.ukkikki.proposal.domain.event.VoteSurveyCloseTimeReachedEvent;
import com.dancing_orangutan.ukkikki.proposal.ui.response.ConfirmProposalResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProposalEventHandler {

    private final ProposalService proposalService;

    @EventListener
    public void handleProposalVoteSurveyStart(ProposalSubmissionPeriodExpiredEvent event) {

        LocalDateTime surveyStartTime = event.expireTime().plusMinutes(1); // 제출 후 1분 뒤 시작
        LocalDateTime surveyEndTime = event.expireTime().plusHours(72);

        proposalService.createVoteSurvey(CreateVoteSurveyCommand.builder()
                .travelPlanId(event.travelPlanId())
                .surveyStartTime(surveyStartTime)
                .surveyEndTime(surveyEndTime)
                .build());

        log.info("[투표 생성] TravelPlanId={}, 시작: {}, 종료: {}",
                event.travelPlanId(), surveyStartTime, surveyEndTime);
    }

    @EventListener
    public ConfirmProposalResponse handleProposalVoteSurveyEnd(VoteSurveyCloseTimeReachedEvent event){

        ConfirmProposalResponse response =proposalService.confirmProposal(event.travelPlanId());
        log.info(" 투표 마감:{} ",event.travelPlanId());
        log.info("확정된 투표 : {}",response);

        return response;
    }

}
