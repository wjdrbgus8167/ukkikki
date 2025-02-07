import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethod';
import { useNavigate } from 'react-router-dom'; // ✅ React Router v6 이상에서 사용

const UserRegisterForm = () => {
  const navigate = useNavigate(); // ✅ 네비게이트 사용

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ 이메일 형식 검사 함수
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.name ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage('유효한 이메일을 입력하세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await publicRequest.post('/auth/members/register', {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        profileImageUrl: '',
      });
      alert('회원가입 성공!');
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg">
      <h1 className="text-3xl text-brown font-bold text-center mb-6">
        이메일로 회원가입
      </h1>

      {errorMessage && (
        <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-4 border rounded focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <input
            name="name"
            type="text"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-4 border rounded focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-4 border rounded focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-4 border rounded focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-brown text-white py-3 rounded-lg"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default UserRegisterForm;
