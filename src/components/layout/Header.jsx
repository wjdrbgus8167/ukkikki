import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // 로고 이미지
import defaultProfile from '../../assets/profile.png'; // 기본 프로필 이미지

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ 로그인한 사용자 정보 가져오기
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    // ✅ 로그아웃 시 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
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
        {!user ? (
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
            {/* ✅ 프로필 클릭 시 드롭다운 메뉴 */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={user.profile_image_url || defaultProfile}
                alt="프로필"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            </button>

            {/* ✅ 드롭다운 메뉴 */}
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

        {/* 드롭다운 메뉴 */}
        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
            {!user ? (
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
                <img
                  src={user.profile_image_url || defaultProfile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover mb-2"
                />
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
