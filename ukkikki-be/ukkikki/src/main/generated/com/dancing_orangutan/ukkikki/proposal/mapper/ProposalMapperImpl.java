package com.dancing_orangutan.ukkikki.proposal.mapper;

import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-02-06T10:10:12+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.11.1.jar, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class ProposalMapperImpl implements ProposalMapper {

    @Override
    public Proposal entityToDomain(ProposalEntity entity) {
        if ( entity == null ) {
            return null;
        }

        Proposal.ProposalBuilder proposal = Proposal.builder();

        proposal.departureAirportCode( ProposalMapper.airportToId( entity.getDepartureAirport() ) );
        proposal.arrivalAirportCode( ProposalMapper.airportToId( entity.getArrivalAirport() ) );
        proposal.travelPlanId( ProposalMapper.travelPlanToId( entity.getTravelPlan() ) );
        proposal.companyId( ProposalMapper.companyToId( entity.getCompany() ) );
        proposal.proposalId( entity.getProposalId() );
        proposal.startDate( entity.getStartDate() );
        proposal.endDate( entity.getEndDate() );
        proposal.airline( entity.getAirline() );
        proposal.startDateBoardingTime( entity.getStartDateBoardingTime() );
        proposal.startDateArrivalTime( entity.getStartDateArrivalTime() );
        proposal.endDateBoardingTime( entity.getEndDateBoardingTime() );
        proposal.endDateArrivalTime( entity.getEndDateArrivalTime() );
        proposal.deposit( entity.getDeposit() );
        proposal.minPeople( entity.getMinPeople() );
        proposal.guideIncluded( entity.isGuideIncluded() );
        proposal.productIntroduction( entity.getProductIntroduction() );
        proposal.refundPolicy( entity.getRefundPolicy() );
        proposal.insuranceIncluded( entity.isInsuranceIncluded() );
        proposal.proposalStatus( entity.getProposalStatus() );
        proposal.createTime( entity.getCreateTime() );
        proposal.updateTime( entity.getUpdateTime() );

        return proposal.build();
    }

    @Override
    public ProposalEntity domainToEntity(Proposal domain) {
        if ( domain == null ) {
            return null;
        }

        ProposalEntity.ProposalEntityBuilder proposalEntity = ProposalEntity.builder();

        proposalEntity.proposalId( domain.getProposalId() );
        proposalEntity.startDate( domain.getStartDate() );
        proposalEntity.endDate( domain.getEndDate() );
        proposalEntity.airline( domain.getAirline() );
        proposalEntity.startDateBoardingTime( domain.getStartDateBoardingTime() );
        proposalEntity.startDateArrivalTime( domain.getStartDateArrivalTime() );
        proposalEntity.endDateBoardingTime( domain.getEndDateBoardingTime() );
        proposalEntity.endDateArrivalTime( domain.getEndDateArrivalTime() );
        proposalEntity.deposit( domain.getDeposit() );
        proposalEntity.minPeople( domain.getMinPeople() );
        proposalEntity.guideIncluded( domain.isGuideIncluded() );
        proposalEntity.productIntroduction( domain.getProductIntroduction() );
        proposalEntity.refundPolicy( domain.getRefundPolicy() );
        proposalEntity.insuranceIncluded( domain.isInsuranceIncluded() );
        proposalEntity.proposalStatus( domain.getProposalStatus() );
        proposalEntity.createTime( domain.getCreateTime() );
        proposalEntity.updateTime( domain.getUpdateTime() );

        return proposalEntity.build();
    }
}
