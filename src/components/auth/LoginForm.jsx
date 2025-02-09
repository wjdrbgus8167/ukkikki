import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethod';
import useAuthStore from '../../stores/authStore';

const LoginForm = ({ isCompany }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // isCompany에 따라 로그인 API 경로 변경
      const loginEndpoint = isCompany
        ? 'api/v1/auth/companies/login' // 기업 로그인 API
        : 'api/v1/auth/members/login'; // 일반 사용자 로그인 API

      const response = await publicRequest.post(loginEndpoint, {
        email,
        password,
      });

      if (response.status === 200) {
        // 로그인 성공 시 인증 상태 업데이트
        useAuthStore.getState().setUser(true);

        console.log('로그인 성공');
        navigate('/');
      } else {
        setErrorMessage('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setErrorMessage(error.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {errorMessage && (
        <p className="mb-4 text-sm text-red-500">{errorMessage}</p>
      )}
      <div className="mb-4">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-4 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-4 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 text-white bg-brown rounded-xl"
      >
        {isCompany ? '기업 로그인' : '로그인'}
      </button>
    </form>
  );
};

export default LoginForm;
