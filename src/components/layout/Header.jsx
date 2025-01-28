import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // react-router-dom에서 Link 가져오기
import logo from '../../assets/logo.png'; // 로고 파일
import profileImage from '../../assets/profile.png'; // 프로필 이미지 파일 (예제)

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const handleLogout = () => {
    // 로그아웃 로직 (예: API 호출 후 상태 초기화)
    setIsLoggedIn(false);
  };

  return (
    <header className="h-20 flex justify-between items-center px-6 bg-white shadow-md">
      {/* 왼쪽 로고 */}
      <Link to="/">
        <img src={logo} alt="Logo" className="w-32 h-32 ml-10 object-contain" />
      </Link>

      {/* 오른쪽 메뉴 */}
      <nav className="hidden md:flex space-x-6 mr-10">
        {!isLoggedIn ? (
          <>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-500 transition duration-300"
            >
              서비스 소개
            </Link>
            <Link
              to="/signup"
              className="text-gray-600 hover:text-blue-500 transition duration-300"
            >
              회원가입
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-500 transition duration-300"
            >
              로그인
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <button
              className="text-gray-600 hover:text-blue-500 transition duration-300"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        )}
      </nav>

      {/* 햄버거 메뉴 (작은 화면) */}
      <div className="md:hidden relative">
        <button
          className="text-xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)} // 클릭 시 메뉴 상태 변경
        >
          ☰
        </button>

        {/* 드롭다운 메뉴 */}
        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition duration-300"
                >
                  서비스 소개
                </Link>
                <Link
                  to="/registerpage"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition duration-300"
                >
                  회원가입
                </Link>
                <Link
                  to="/loginpage"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition duration-300"
                >
                  로그인
                </Link>
              </>
            ) : (
              <div className="px-4 py-2">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover mb-2"
                />
                <button
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition duration-300"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
