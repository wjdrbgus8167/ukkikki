import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/mypage/Sidebar';
import UserProfile from '../components/mypage/profile/UserProfile';
import MyRooms from '../components/mypage/myroom/MyRooms';
import OngoingProposals from '../components/mypage/company/OngoingProposals'; 
import ReceivedProposals from '../components/mypage/company/ReceivedProposals'; 
import useAuthStore from '../stores/authStore';
import { TravelPlanProvider } from '../contexts/travelPlanContext';
import { 
  MyProfileContainer, 
  MainContentWrapper, 
  GridWrapper, 
  SidebarWrapper, 
  ContentWrapper 
} from './style/MyProfilePageStyle';

const MyProfile = () => {
  const { userRole } = useAuthStore();
  const [activeComponent, setActiveComponent] = useState('profile');

  const renderContent = () => {
    if (activeComponent === 'profile') {
      return <UserProfile />;
    }
    if (userRole === 'company' && activeComponent === 'ReceivedProposals') {
      return (
        <TravelPlanProvider>
          <ReceivedProposals />
        </TravelPlanProvider>
      );
    }
    if (userRole === 'company' && activeComponent === 'OngoingProposals') {
      return (
        <TravelPlanProvider>
          <OngoingProposals />
        </TravelPlanProvider>
      );
    }
    return <MyRooms />;
  }
  
  return (
    <MyProfileContainer>
      <Header />
      <MainContentWrapper>
        <GridWrapper>
          {/* 왼쪽 여백 */}
          <SidebarWrapper>
            <Sidebar onMenuClick={setActiveComponent}/>
          </SidebarWrapper>
          {/* 메인콘텐츠 */}
          <ContentWrapper>
            {renderContent()}
          </ContentWrapper>
        </GridWrapper>
      </MainContentWrapper>
    </MyProfileContainer>
  );
};

export default MyProfile;
