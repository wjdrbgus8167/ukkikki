import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/MainPage';
import About from './pages/AboutPage';
import UserRoom from './pages/UserRoomPage';
import SearchRooms from './pages/SearchRoomsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoadingSpinner from './components/common/LoadingSpinner';
import MyRoomsPage from './pages/MyRoomsPage';

import MyProfile from './pages/MyProfilePage';
import TravelPlanDetail from './pages/TravelPlanDetailPage';
import UserVotePage from './pages/UserVotePage';
import OAuthSuccessPage from './components/auth/OAuthSuccessPage';
import CreateTravel from './pages/CreateTravelPage';
import OpenViduPage from './pages/OpenViduPage';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS 스타일 불러오기
import AgencyProposalDetailPage from './pages/AgencyProposalDetailPage';
import ProposalDetailForUser from './pages/ProposalDetailForUserPage';
import ProposalDetail from './pages/ProposalDetailPage';

const App = () => {
  useEffect(() => {
    // AOS 초기화
    AOS.init({
      duration: 1000, // 애니메이션 지속 시간 (기본값: 400ms)
      once: true, // 애니메이션을 한 번만 실행 (기본값: false)
    });
  }, []);

  return (
    <Router>
      <LoadingSpinner /> {/* 전역 로딩 스피너 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/myroom" element={<MyRoomsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/user-room/:travelPlanId" element={<UserRoom />} />
        <Route path="/search-room" element={<SearchRooms />} />
        <Route
          path="/agency-detail/:travelPlanId"
          element={<TravelPlanDetail />}
        />
        <Route path="/user-vote/:travelPlanId" element={<UserVotePage />} />
        <Route path="/oauth/success" element={<OAuthSuccessPage />} />
        {/* 여행사 여행 계획 작성 및 수정 */}
        <Route
          path="/travel-plans/:travelPlanId/proposals/:proposalId?"
          element={<CreateTravel />}
        />

        <Route path="/myprofile" element={<MyProfile />} />

        <Route path="/myprofile" element={<MyProfile />} />
        {/* 여행사 본인이 제시한 제안서 상세 조회 */}
        {/* <Route
          path="/agency-proposal-detail/:travelPlanId/:proposalId"
          element={<AgencyProposalDetailPage />}
        /> */}

        <Route path="/meeting" element={<OpenViduPage />} />
        <Route
          path="/proposal-detail/:travelPlanId/:proposalId"
          element={<ProposalDetailForUser />}
        />


        <Route
          path="/agency-proposal-detail/:travelPlanId/:proposalId"
          element={<ProposalDetail />}
        />
      </Routes>
    </Router>
  );
};

export default App;
