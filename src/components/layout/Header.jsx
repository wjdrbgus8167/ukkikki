import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthCookie, removeAuthCookie } from '../../utils/cookie'; // ✅ 수정된 쿠키 함수 가져오기
import logo from '../../assets/logo.png';
import defaultProfile from '../../assets/profile.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [token, setToken] = useState(null); // ✅ 로그인 여부 상태
  const navigate = useNavigate();

  // ✅ 로그인 여부 확인
  useEffect(() => {
    const authToken = getAuthCookie(); // ✅ 수정된 쿠키 함수 사용
    setToken(authToken);
  }, []);

  // ✅ 로그아웃 핸들러
  const handleLogout = () => {
    removeAuthCookie(); // ✅ 쿠키 삭제
    setToken(null); // ✅ 상태 업데이트
    navigate('/');
  };

  return (
    <header className="h-20 flex justify-between items-center px-6 bg-white shadow-md">
      {/* 왼쪽 로고 */}
      <Link to="/">
        <img src={logo} alt="Logo" className="w-32 h-32 ml-10 object-contain" />
      </Link>

      {/* 오른쪽 메뉴 */}
      <nav className="hidden md:flex space-x-6 mr-10">
        {!token ? (
          <>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-500 transition duration-300"
            >
              서비스 소개
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-500 transition duration-300"
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
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                <Link
                  to="/mypage"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* 햄버거 메뉴 (모바일) */}
      <div className="md:hidden relative">
        <button
          className="text-xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
            {!token ? (
              <>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition duration-300"
                >
                  서비스 소개
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition duration-300"
                >
                  로그인
                </Link>
              </>
            ) : (
              <div className="px-4 py-2">
                <Link
                  to="/mypage"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition duration-300"
                >
                  마이페이지
                </Link>
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
