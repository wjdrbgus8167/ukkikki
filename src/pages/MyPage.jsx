import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/mypage/Sidebar';
import { Routes, Route } from 'react-router-dom';
import UserProfile from '../components/mypage/profile/UserProfile';
import MyRooms from '../components/mypage/myroom/MyRooms';

const MyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow max-w-screen-xl mx-auto px-6 py-10">
        <div className="grid grid-cols-12 gap-4">
          {/* 왼쪽 여백 */}
          <div className="hidden md:block md:col-span-1" />
          {/* 사이드바 */}
          <div className="col-span-12 md:col-span-2">
            <Sidebar />
          </div>
          {/* 메인콘텐츠 왼쪽 여백 */}
          <div className="hidden md:block md:col-span-1" />
          {/* 메인콘텐츠 */}
          <div className="col-span-12 md:col-span-7 bg-white p-4">
            <Routes>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<MyRooms />} />
            </Routes>
          </div>
          {/* 오른쪽 여백 */}
          <div className="hidden md:block md:col-span-1" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
