import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethod';

const LoginForm = ({ isCompany, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 Hook

  const handleLogin = async (e) => {
    e.preventDefault();

    const endpoint = isCompany
      ? '/api/v1/auth/companies/login'
      : '/api/v1/auth/members/login';

    try {
      const response = await publicRequest.post(endpoint, { email, password });

      // ✅ 엑세스 토큰 로컬스토리지에 저장
      localStorage.setItem('accessToken', response.data.accessToken);

      // ✅ 로그인 상태 업데이트 (부모 컴포넌트로 전달)
      onLogin(response.data.user); // 사용자 정보 전달

      // ✅ 메인 페이지로 이동
      navigate('/');
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
        className="w-full bg-brown text-white py-3 rounded-xl "
      >
        {isCompany ? '기업 로그인' : '로그인'}
      </button>
    </form>
  );
};

export default LoginForm;
