package com.dancing_orangutan.ukkikki.proposal.mapper;

import com.dancing_orangutan.ukkikki.entity.info.Airport;
import com.dancing_orangutan.ukkikki.member.domain.CompanyEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.Proposal;
import com.dancing_orangutan.ukkikki.proposal.domain.ProposalEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ProposalMapper {

    @Mapping(source = "departureAirport", target="departureAirportCode", qualifiedByName ="airportToId")
    @Mapping(source = "arrivalAirport", target="arrivalAirportCode" ,qualifiedByName ="airportToId")
    @Mapping(target = "travelPlanId", source = "travelPlan", qualifiedByName = "travelPlanToId")
    @Mapping(target = "companyId", source = "company" , qualifiedByName = "companyToId")
    Proposal entityToDomain(ProposalEntity entity);

    ProposalEntity domainToEntity(Proposal domain);

    @Named("airportToId")
    static String airportToId(Airport airport) {
        return airport !=null ? airport.getAirportCode() :null;
    }
    @Named("travelPlanToId")
    static Integer travelPlanToId(TravelPlanEntity travelPlan) {
        return travelPlan !=null ? travelPlan.getTravelPlanId() :null;
    }

    @Named("companyToId")
    static Integer companyToId(CompanyEntity company) {
        return company !=null ? company.getCompanyId() :null;
    }
}