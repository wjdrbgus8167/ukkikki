// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroText from '../components/common/SloganText';
import LoginForm from '../components/auth/LoginForm';

import kakaoLogo from '../assets/icon.png';
import googleLogo from '../assets/google.png';
import logo from '../assets/logo.png';
import bgImage from '../assets/login-bg.png';

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [isCompanyLogin, setIsCompanyLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 만약 localStorage에 user 정보가 있다면 복원
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    // user 정보를 localStorage 등에 저장 (원하는 대로)
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/'); // 메인 페이지로 이동
  };

  const handleLogout = () => {
    // 로그아웃 시 user 제거
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
    >
      <Header user={user} onLogout={handleLogout} />
      <main className="flex flex-1 flex-col md:flex-row items-center md:px-28 py-10">
        <HeroText textColor="text-brown" />

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <img src={logo} className="mx-auto my-6 w-48 h-auto" alt="로고" />

            {/* 로그인 폼 */}
            <LoginForm isCompany={isCompanyLogin} onLogin={handleLogin} />

            {!isCompanyLogin && (
              <div className="mt-6 space-y-4">
                <button className="w-full bg-white text-black py-3 rounded-xl border border-gray-200 transition flex items-center relative">
                  <img
                    src={googleLogo}
                    alt="Google"
                    className="absolute left-4 w-5 h-5"
                  />
                  <span className="flex-1 text-center">
                    구글 계정으로 로그인하기
                  </span>
                </button>
                <button className="w-full bg-yellow text-brown py-3 rounded-xl transition flex items-center relative">
                  <img
                    src={kakaoLogo}
                    alt="Kakao"
                    className="absolute left-4 w-6 h-6"
                  />
                  <span className="flex-1 text-center">
                    카카오 계정으로 로그인하기
                  </span>
                </button>
              </div>
            )}

            <div className="mt-6 flex items-center justify-center space-x-4">
              {isCompanyLogin ? (
                <Link
                  to="/signup?type=company"
                  className="text-blue-500 hover:underline"
                >
                  기업으로 회원가입하기
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="text-gray-600 hover:underline">
                    이메일로 회원가입
                  </Link>
                  <span className="text-gray-400">|</span>
                  <button
                    onClick={() => setIsCompanyLogin(true)}
                    className="text-blue-500 hover:underline"
                  >
                    기업이신가요? 바로가기
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
