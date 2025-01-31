import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/mainPage';
import About from './pages/AboutPage';
import UserRoom from './pages/UserRoom';
import SearchRooms from './pages/SearchRooms';
import AgencyRoomList from './pages/AgencyRoomListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AgencySignUp from './pages/AgencySignUpPage';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProposalDetail from './pages/ProposalDetailPage';

const App = () => {
  return (
    <Router>
      <LoadingSpinner /> {/* 전역 로딩 스피너 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/userroom" element={<UserRoom />} />
        <Route path="/searchroom" element={<SearchRooms />} />
        <Route path="/agencyroom" element={<AgencyRoomList />} />
        <Route path="/agencySignUp" element={<AgencySignUp />} />
        <Route path="/proposaldetail" element={<ProposalDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
