// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethod';

const LoginForm = ({ isCompany, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 기업/개인에 따라 API 경로 분기
    const endpoint = isCompany
      ? '/api/v1/auth/companies/login'
      : '/api/v1/auth/members/login';

    try {
      // ★ 쿠키에 토큰이 담겨 오므로 withCredentials 필요
      const response = await publicRequest.post(endpoint, {
        email,
        password,
      });

      // 가정: 서버 응답 형태 { status: 201, message: "Success", data: { user: {...} } }
      const { status, message, data } = response.data;

      if (status === 200) {
        console.log('response.data', response.data);
        console.log('data.member', data.member);
        // 백엔드에서 쿠키(엑세스토큰, 리프레시토큰)가 Set-Cookie로 내려옴
        // 브라우저는 자동 저장 (withCredentials: true 설정 시)

        // 사용자 정보를 상위 컴포넌트로 전달
        onLogin(data.user);

        // 메인 페이지로 이동
        navigate('/');
      } else {
        // 로그인 실패 케이스
        setErrorMessage(message || '로그인 실패');
      }
    } catch (error) {
      console.error('로그인 실패:', error.response?.data);
      setErrorMessage(error.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
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
        className="w-full bg-brown text-white py-3 rounded-xl"
      >
        {isCompany ? '기업 로그인' : '로그인'}
      </button>
    </form>
  );
};

export default LoginForm;
