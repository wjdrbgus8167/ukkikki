import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/MainPage';
import About from './pages/AboutPage';
import UserRoom from './pages/UserRoomPage';
import SearchRooms from './pages/SearchRoomsPage';
import AgencyRoomList from './pages/AgencyRoomListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoadingSpinner from './components/common/LoadingSpinner';
import MyPage from './pages/UserMyPage';
import ProposalDetail from './pages/ProposalDetailPage';
import UserVotePage from './pages/UserVotePage';
import OAuthSuccessPage from './components/auth/OAuthSuccessPage';
import CreateTravel from './pages/CreateTravelPage';
import TravelProposal from './pages/TravelProposal';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS 스타일 불러오기
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/user-room/:travelPlanId" element={<UserRoom />} />
        <Route path="/search-room" element={<SearchRooms />} />
        <Route path="/agency-room" element={<AgencyRoomList />} />
        <Route
          path="/agency-detail/:travelPlanId"
          element={<ProposalDetail />}
        />
        <Route path="/user-vote/:travelPlanId" element={<UserVotePage />} />
        <Route path="/oauth/success" element={<OAuthSuccessPage />} />

        <Route
          path="/travel-plans/:travelPlanId/proposals"
          element={<CreateTravel />}
        />
        {/* <Route
          path="/travel-plans/:travelPlanId/proposals"
          element={<TravelCreate />}
        /> */}

        <Route
          path="/travel-proposal/:travelPlanId/proposals/:proposalId"
          element={<TravelProposal />}
        />
        <Route />
      </Routes>
    </Router>
  );
};

export default App;
