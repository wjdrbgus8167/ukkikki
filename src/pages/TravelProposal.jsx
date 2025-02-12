import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useParams } from "react-router";
import { ProposalDetailProvider } from "../contexts/ProposalDetailContext";

const TravelProposal = () => {
    const {travelPlanId, proposalId} = useParams();

    return (
        <div>
            <Header />
                <ProposalDetailProvider travelPlanId={travelPlanId}>
                    <div>
                        제안서 상세 내용
                    </div>
                </ProposalDetailProvider>
            <Footer />
        </div>
    );
};
export default TravelProposal;