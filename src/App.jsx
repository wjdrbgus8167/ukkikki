import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/MainPage/mainPage';
import About from './pages/AboutPage/About';
import UserRoom from './pages/UserRoomPage/UserRoom';
import SearchRooms from './pages/SearchRoomPage/SearchRooms';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/userroom" element={<UserRoom />} />
        <Route path="/searchroom" element={<SearchRooms />} />


      </Routes>
    </Router>
  );
};

export default App;
