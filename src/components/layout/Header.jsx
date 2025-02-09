import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import { publicRequest } from '../../hooks/requestMethod'; // API 요청 함수
import logo from '../../assets/logo.png';
import defaultProfile from '../../assets/profile.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await publicRequest.post('auth/logout'); // 로그아웃 API 호출
      logout(); // Zustand 스토어에서 로그아웃 처리
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="object-contain w-32 h-32 ml-4 md:ml-10"
        />
      </Link>

      {/* ✅ 모바일 메뉴 토글 버튼 */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* ✅ 네비게이션 메뉴 */}
      <nav
        className={`${
          menuOpen ? 'block' : 'hidden'
        } absolute top-20 left-0 w-full bg-white shadow-md md:static md:flex md:w-auto md:mr-10 md:space-x-6`}
      >
        {!isAuthenticated ? (
          <>
            <Link
              to="/about"
              className="block px-6 py-3 text-gray-600 transition duration-300 hover:text-blue-500 md:inline md:px-0"
            >
              서비스 소개
            </Link>
            <Link
              to="/login"
              className="block px-6 py-3 text-gray-600 transition duration-300 hover:text-blue-500 md:inline md:px-0"
            >
              회원가입 | 로그인
            </Link>
          </>
        ) : (
          <div className="relative flex items-center space-x-4">
            {/* ✅ 프로필 버튼 (항상 표시) */}
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

            {/* ✅ 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <div className="absolute right-0 w-40 mt-2 bg-white border border-gray-200 rounded-lg">
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
