import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethod';

const LoginForm = ({ isCompany }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // 기업 로그인과 일반 로그인 API 엔드포인트 구분
    const endpoint = isCompany
      ? '/api/v1/auth/companies/login'
      : '/api/v1/auth/users/login';

    try {
      const response = await publicRequest.post(endpoint, { email, password });
      alert('로그인 성공!');
      console.log('로그인 성공:', response.data);
      // TODO: 로그인 후 페이지 이동 또는 상태 업데이트
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
        <label className="block text-sm font-medium mb-1">비밀번호</label>
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
        {isCompany ? '기업 로그인' : '로그인'}
      </button>
    </form>
  );
};

export default LoginForm;
