import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 추가
import apiClient from '../../apis/axiosInstance';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import HeroText from '../../components/common/SloganText';
import kakaoLogo from '../../assets/icon.png';
import googleLogo from '../../assets/google.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const endpoint = '/api/v1/auth/users/login';

    try {
      const response = await apiClient.post(endpoint, {
        email,
        password,
      });

      alert('로그인 성공!');
      console.log('로그인 성공:', response.data);
      // TODO: 로그인 후 페이지 이동 또는 상태 업데이트
    } catch (error) {
      console.error('로그인 실패:', error.response?.data);
      setErrorMessage(error.response?.data?.message || '로그인 실패');
    }
  };

  const handleKakaoLogin = () => {
    alert('카카오 계정으로 로그인하기 클릭됨');
  };

  const handleGoogleLogin = () => {
    alert('구글 계정으로 로그인하기 클릭됨');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row items-center md:px-28 py-10">
        {/* 왼쪽 HeroText */}
        <HeroText textColor="text-brown" />

        {/* 오른쪽 로그인 폼 */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-xl font-bold mb-4">로그인</h1>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brown text-white py-2 rounded hover:bg-yellow hover:text-brown"
              >
                로그인
              </button>
            </form>
            <div className="mt-6 space-y-4">
              {/* 구글 로그인 버튼 */}
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-black py-2 rounded border border-gray-300 transition flex items-center relative"
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
              {/* 카카오 로그인 버튼 */}
              <button
                onClick={handleKakaoLogin}
                className="w-full bg-yellow text-brown py-2 rounded transition flex items-center relative"
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
            {/* 회원가입 및 기업 바로가기 */}
            <div className="mt-6 flex items-center justify-center space-x-4">
              <Link to="/signup" className="text-gray-600 hover:underline">
                이메일로 회원가입
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                to="/company-login"
                className=" text-blue-500 hover:underline"
              >
                기업이신가요? 바로가기
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
