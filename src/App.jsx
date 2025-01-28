import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/MainPage/mainPage';
import About from './pages/AboutPage';
import UserRoom from './pages/UserRoomPage/UserRoom';
import SearchRooms from './pages/SearchRoomPage/SearchRooms';
import AgencyRoomList from './pages/AgencyRoomListPage';
<<<<<<< HEAD
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
=======
import AgencySignUp from './pages/AgencySignUpPage';
>>>>>>> 902a561a1e7d0c51412291b80d44d1b4a3598470

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/userroom" element={<UserRoom />} />
        <Route path="/searchroom" element={<SearchRooms />} />
<<<<<<< HEAD
        <Route path="/agencyroom" element={<AgencyRoomList />} />
=======
        <Route path="/agencyroom" element={<AgencyRoomList/>} />
        <Route path="/agencySignUp" element={<AgencySignUp/>} />
>>>>>>> 902a561a1e7d0c51412291b80d44d1b4a3598470
      </Routes>
    </Router>
  );
};

export default App;
