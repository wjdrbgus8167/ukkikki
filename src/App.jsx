import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/mainPage';
import About from './pages/AboutPage';
import UserRoom from './pages/UserRoomPage';
import SearchRooms from './pages/SearchRoomsPage';
import AgencyRoomList from './pages/AgencyRoomListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoadingSpinner from './components/common/LoadingSpinner';
import MyPage from './pages/UserMyPage';
import TravelCreate from './pages/TravelCreatePage';
import ProposalDetail from './pages/ProposalDetailPage';
import UserVotePage from './pages/UserVotePage';
import OAuthSuccessPage from './components/auth/OAuthSuccessPage';
import { CookiesProvider } from 'react-cookie'; // ✅ 쿠키 프로바이더 추가

const App = () => {
  return (
    <CookiesProvider>
      <Router>
        <LoadingSpinner /> {/* 전역 로딩 스피너 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/user-room" element={<UserRoom />} />
          <Route path="/search-room" element={<SearchRooms />} />
          <Route path="/agencyroom" element={<AgencyRoomList />} />
          <Route path="/travel-create" element={<TravelCreate />} />
          <Route path="/proposal-detail" element={<ProposalDetail />} />
          <Route path="/user-vote" element={<UserVotePage />} />
          <Route path="/oauth/success" element={<OAuthSuccessPage />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
};

export default App;
