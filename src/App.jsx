import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/MainPage/mainPage';
import About from './pages/AboutPage';
import UserRoom from './pages/UserRoomPage/UserRoom';
import SearchRooms from './pages/SearchRoomPage/SearchRooms';
import AgencyRoomList from './pages/AgencyRoomListPage';
import AgencySignUp from './pages/AgencySignUpPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/userroom" element={<UserRoom />} />
        <Route path="/searchroom" element={<SearchRooms />} />
        <Route path="/agencyroom" element={<AgencyRoomList/>} />
        <Route path="/agencySignUp" element={<AgencySignUp/>} />
      </Routes>
    </Router>
  );
};

export default App;
