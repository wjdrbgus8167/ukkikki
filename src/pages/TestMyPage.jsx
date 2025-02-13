// UserMyPage.jsx
import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/mypage/Sidebar'; 
import UserProfile from '../components/mypage/profile/UserProfile';

const UserMyPage = () => {
  return (
<div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-4">
            <div className="hidden md:block md:col-span-1"/>
                
                <div className="col-span-12 md:col-span-2">
                    <Sidebar />
                </div>

                <div className="hidden md:block md:col-span-1" />

                <div className="col-span-12 md:col-span-5 bg-white p-4">
                    <UserProfile /> 
                </div>
            <div className="hidden md:block md:col-span-3" />
        </div>
      </div>
    </div>
  );
};

export default UserMyPage;
