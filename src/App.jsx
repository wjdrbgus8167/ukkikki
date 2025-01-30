import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/MainPage/mainPage';
import About from './pages/AboutPage';
import UserRoom from './pages/UserRoomPage/UserRoom';
import SearchRooms from './pages/SearchRoomPage/SearchRooms';
import AgencyRoomList from './pages/AgencyRoomListPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AgencySignUp from './pages/AgencySignUpPage';
import LoadingSpinner from './components/common/LoadingSpinner';

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
      </Routes>
    </Router>
  );
};

export default App;
