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
  const { isAuthenticated, logout } = useAuthStore();
  const handleLogout = async () => {
    try {
      // ✅ 백엔드로 로그아웃 요청 (쿠키 삭제)
      const response = await publicRequest.post(
        '/api/v1/auth/logout',
        {},
        { withCredentials: true }, // ✅ 쿠키 포함 요청
      );

      if (response.status === 200) {
        console.log('✅ 로그아웃 성공:', response.data);
        useAuthStore.getState().setUser(null);
        localStorage.removeItem('auth-store');

        logout();
        // ✅ 페이지 새로고침 없이 상태 업데이트 반영
        navigate('/');
      }
    } catch (error) {
      console.error('🚨 로그아웃 실패:', error);
    }
  };

  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white shadow-md">
      <Link to="/">
        <img src={logo} alt="Logo" className="object-contain w-32 h-32 ml-10" />
      </Link>
      <nav className="block mr-10 space-x-6 md:flex">
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
