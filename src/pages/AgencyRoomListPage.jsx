import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import UserProposals from "../components/agencyPlanList/UserProposals";
import AgencyProposals from "../components/agencyPlanList/AgencyProposals";
import { TravelPlanProvider } from "../contexts/travelPlanContext";
import { ProposalDetailProvider } from "../contexts/ProposalDetailContext";
import { 
  AgencyRoomListPageContainer,
  MainContent, 
  TabButtonGroup, 
  TabButton, 
  TabContent 
} from './style/AgencyRoomListPageStyle';

const AgencyRoomList = () => {
  const [activeTab, setActiveTab] = useState('user');

  return (
    <AgencyRoomListPageContainer>
      <Header />
      <MainContent>
          <TabButtonGroup>
            <TabButton active={activeTab === 'user'} onClick={() => setActiveTab('user')}>제시받은 목록</TabButton>
            <TabButton active={activeTab === 'agency'} onClick={() => setActiveTab('agency')}>진행중인 목록</TabButton>
          </TabButtonGroup>
          <TabContent>
            {activeTab === 'user' ? (
              <TravelPlanProvider>
                <UserProposals />
              </TravelPlanProvider>
              
            ) : (
              <ProposalDetailProvider>
                <AgencyProposals />
              </ProposalDetailProvider>
            )}
          </TabContent>
      </MainContent>
      <Footer />
    </AgencyRoomListPageContainer>
  );
};

export default AgencyRoomList;