import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import { publicRequest } from '../../hooks/requestMethod';
import logo from '../../assets/logo.png';
import defaultProfile from '../../assets/profile.png';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await publicRequest.post('api/v1/auth/logout');

      // Zustand persist 미들웨어에서 제공하는 clearStorage()를 호출하여 localStorage의 persisted state 삭제
      useAuthStore.persist.clearStorage();

      // 상태 초기화
      setUser(null);

      // 페이지 리로드하여 로그인 상태 동기화
      window.location.reload();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white shadow-md">
      <Link to="/">
        <img src={logo} alt="Logo" className="object-contain w-32 h-32 ml-10" />
      </Link>
      <nav className="hidden mr-10 space-x-6 md:flex">
        {!user ? (
          <>
            <Link
              to="/about"
              className="text-gray-600 transition hover:text-blue-500"
            >
              서비스 소개
            </Link>
            <Link
              to="/login"
              className="text-gray-600 transition hover:text-blue-500"
            >
              회원가입 | 로그인
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={defaultProfile}
                alt="프로필"
                className="w-10 h-10 border border-gray-300 rounded-full"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 w-40 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <Link
                  to="/mypage"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
