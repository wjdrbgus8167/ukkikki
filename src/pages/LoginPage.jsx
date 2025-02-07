import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroText from '../components/common/SloganText';
import LoginForm from '../components/auth/LoginForm';
import useAuthStore from '../stores/authStore';

import kakaoLogo from '../assets/icon.png';
import googleLogo from '../assets/google.png';
import logo from '../assets/logo.png';
import bgImage from '../assets/login-bg.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore(); // Zustand 스토어에서 user, logout 불러오기

  const handleLogout = () => {
    logout(); // Zustand 로그아웃 호출
    navigate('/login');
  };

  // 카카오 및 구글 로그인 핸들러는 그대로 사용
  const handleKakaoLogin = () => {
    window.location.href =
      'http://i12c204.p.ssafy.io:8080/api/v1/oauth2/authorization/kakao';
  };

  const handleGoogleLogin = () => {
    window.location.href =
      'http://i12c204.p.ssafy.io:8080/api/v1/oauth2/authorization/google';
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
            <LoginForm isCompany={false} />

            {!user && (
              <div className="mt-6 space-y-4">
                <button
                  className="w-full bg-white text-black py-3 rounded-xl border border-gray-200 transition flex items-center relative"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src={googleLogo}
                    alt="Google"
                    className="absolute left-4 w-5 h-5"
                  />
                  <span className="flex-1 text-center">
                    구글 계정으로 로그인하기
                  </span>
                </button>
                <button
                  className="w-full bg-yellow text-brown py-3 rounded-xl transition flex items-center relative"
                  onClick={handleKakaoLogin}
                >
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
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-blue-500 hover:underline"
                >
                  로그아웃
                </button>
              ) : (
                <>
                  <Link to="/signup" className="text-gray-600 hover:underline">
                    이메일로 회원가입
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link
                    to="/signup?type=company"
                    className="text-blue-500 hover:underline"
                  >
                    기업으로 회원가입하기
                  </Link>
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
