import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthCookie } from '../../utils/cookie'; // ✅ 수정된 쿠키 유틸 가져오기
import { publicRequest } from '../../hooks/requestMethod';
import { useCookies } from 'react-cookie';

const LoginForm = ({ isCompany }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [cookies] = useCookies(['accesstoken', 'refreshtoken']);

  // 쿠키 값이 변경되었을 때 콘솔에 출력 (선택 사항)
  useEffect(() => {
    if (cookies.accesstoken || cookies.refreshtoken) {
      console.log(
        '쿠키에서 가져온 토큰:',
        cookies.accesstoken,
        cookies.refreshtoken,
      );
    }
  }, [cookies]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await publicRequest.post('/auth/members/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token; // ✅ 백엔드에서 받은 토큰
        setAuthCookie(token); // ✅ 쿠키에 토큰 저장

        console.log('로그인 성공, 저장된 토큰:', token);
        navigate('/'); // ✅ 로그인 성공 후 이동
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
