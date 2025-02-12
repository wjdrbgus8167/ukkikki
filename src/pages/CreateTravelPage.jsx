import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useParams } from "react-router";
import { ProposalDetailProvider } from "../contexts/ProposalDetailContext";
import MainLayout from "../components/TravelPlanner/MainLayout";

const CreateTravel = () => {
    const { travelPlanId } = useParams();
    console.log('travelPlanId:', travelPlanId)

    return (
        <div>
            <Header />
                <ProposalDetailProvider travelPlanId={travelPlanId}>
                    <MainLayout />
                </ProposalDetailProvider>
            <Footer />
        </div>
        
    );
};
export default CreateTravel;