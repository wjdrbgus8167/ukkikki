import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethod';

const UserRegisterForm = () => {
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
      await publicRequest.post('/api/v1/auth/members/register', {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        profile_image_url: 'https://source.unsplash.com/random',
      });
      alert('회원가입 성공!');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">회원가입</h2>

      {errorMessage && (
        <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">이메일</label>
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">이름</label>
          <input
            name="name"
            type="text"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">비밀번호</label>
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">비밀번호 확인</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-brown text-white py-2 rounded hover:bg-yellow hover:text-brown transition"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default UserRegisterForm;
