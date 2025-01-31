import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethod';

const CompanyRegisterForm = () => {
  const [step, setStep] = useState(1); // 현재 단계 (1 or 2)
  const [formData, setFormData] = useState({
    email: '',
    representativeName: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessNumber: '',
    companyPhone: '',
    companyAddress: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ 이메일 형식 검사 함수
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (
      !formData.email ||
      !formData.representativeName ||
      !formData.birthDate ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrorMessage('유효한 이메일을 입력하세요.');
      return;
    }
    setErrorMessage('');
    setStep(2);
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.companyName ||
      !formData.businessNumber ||
      !formData.companyPhone ||
      !formData.companyAddress
    ) {
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    try {
      await publicRequest.post('/api/v1/auth/companies/register', formData);
      alert('기업 회원가입 성공!');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg ">
      <h2 className="text-xl font-bold text-center mb-4">기업 회원가입</h2>

      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}

      {step === 1 ? (
        // ✅ **1단계: 대표자 정보 입력**
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">이메일</label>
            <input
              name="email"
              type="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">대표자 이름</label>
            <input
              type="text"
              name="representativeName"
              placeholder="대표자 이름"
              value={formData.representativeName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">생년월일</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleNextStep}
            className="w-full bg-brown text-white py-2 rounded hover:bg-yellow hover:text-brown"
          >
            다음
          </button>
        </form>
      ) : (
        // ✅ **2단계: 회사 정보 입력**
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">사명</label>
            <input
              type="text"
              name="companyName"
              placeholder="사명"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">사업자 등록번호</label>
            <input
              type="text"
              name="businessNumber"
              placeholder="사업자 등록번호"
              value={formData.businessNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">회사 전화번호</label>
            <input
              type="text"
              name="companyPhone"
              placeholder="회사 전화번호"
              value={formData.companyPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">회사 주소</label>
            <input
              type="text"
              name="companyAddress"
              placeholder="회사 주소"
              value={formData.companyAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              이전
            </button>

            <button
              type="submit"
              className="bg-brown text-white px-4 py-2 rounded hover:bg-yellow hover:text-brown"
            >
              회원가입 완료
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CompanyRegisterForm;
