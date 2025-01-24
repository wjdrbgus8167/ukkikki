import React, { useState } from 'react';
import logo from '../../assets/logo.png'; // 상대 경로로 로고 불러오기
import { Link } from 'react-router-dom'; // react-router-dom에서 Link 가져오기

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 상태 관리

  return (
    <header className="h-20 flex justify-between items-center px-6 bg-white shadow-md">
      {/* 왼쪽 로고 */}
      <Link to="/">
        <img src={logo} alt="Logo" className="w-32 h-32 ml-10 object-contain" />
        </Link>

      {/* 오른쪽 메뉴 (큰 화면) */}
      <nav className="hidden md:flex space-x-6 mr-10">
        <a
          href="/about"
          className="text-gray-600 hover:text-blue-500 transition duration-300"
        >
          서비스 소개
        </a>
        <a
          href="/signup"
          className="text-gray-600 hover:text-blue-500 transition duration-300"
        >
          회원가입
        </a>
        <a
          href="/login"
          className="text-gray-600 hover:text-blue-500 transition duration-300"
        >
          로그인
        </a>
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
            <a
              href="/about"
              className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition duration-300"
            >
              서비스 소개
            </a>
            <a
              href="/signup"
              className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition duration-300"
            >
              회원가입
            </a>
            <a
              href="/login"
              className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition duration-300"
            >
              로그인
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
