import React, { useState } from 'react';
import { publicRequest } from '../hooks/requestMethod';
import profileImage from '../assets/profile.png';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroText from '../components/common/SloganText'; // HeroText 컴포넌트 임포트

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    const endpoint =
      userType === 'user'
        ? '/api/v1/auth/users/register'
        : '/api/v1/auth/companies/register';

    try {
      const response = await publicRequest.post(endpoint, {
        email,
        name,
        password,
        profileImage,
      });

      alert('회원가입 성공!');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row items-center md:px-28 py-10">
        {/* 왼쪽 HeroText */}
        <HeroText textColor="text-brown" />

        {/* 오른쪽 회원가입 폼 */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-xl font-bold mb-4">회원가입</h1>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <form onSubmit={handleRegister}>
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
                <label className="block text-sm font-medium mb-1">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brown text-white py-2 rounded hover:bg-yellow hover:text-brown"
              >
                회원가입
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
