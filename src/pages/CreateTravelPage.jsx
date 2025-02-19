import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useParams } from "react-router";
import { TravelPlanDetailProvider } from "../contexts/TravelPlanDetailContext";
import { ProposalDetailProvider } from "../contexts/ProposalDetailContext";
import MainLayout from "../components/TravelPlanner/MainLayout";
import { StyledMainLayout } from "./style/CreateTravelPageStyle";

const CreateTravelPage = () => {
  const { travelPlanId, proposalId } = useParams();
  console.log('travelPlanId:', travelPlanId, 'proposalId:', proposalId);

  return (
    <div>
      <Header />
      {proposalId ? (
        // 수정(제안서 편집) 페이지: proposalId가 있으면 ProposalDetailProvider를 사용하여 제안서 데이터를 불러옴
        <ProposalDetailProvider proposalId={proposalId} travelPlanId={travelPlanId}>
          <StyledMainLayout>
            <MainLayout />
          </StyledMainLayout>
        </ProposalDetailProvider>
      ) : (
        // 생성(새 여행 계획 생성) 페이지: proposalId가 없으면 TravelPlanDetailProvider를 사용하여 여행 계획 데이터를 불러옴
        <TravelPlanDetailProvider travelPlanId={travelPlanId}>
          <StyledMainLayout>
            <MainLayout />
          </StyledMainLayout>
        </TravelPlanDetailProvider>
      )}
      <Footer />
    </div>
  );
};

export default CreateTravelPage;
