import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ React Router v6 이상에서 사용
import { publicRequest } from '../../hooks/requestMethod';
import axios from 'axios';
import Swal from 'sweetalert2';

const CompanyRegisterForm = () => {
  const navigate = useNavigate(); // ✅ 네비게이트 사용

  const [step, setStep] = useState(1); // 현재 단계 (1 or 2)
  const [formData, setFormData] = useState({
    email: '',
    ceoName: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessRegistrationNumber: '',
    phoneNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [businessCheckResult, setBusinessCheckResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false); // 사업자번호 조회 중 여부

  const apiKey = import.meta.env.VITE_APP_ODCLOUD_API_KEY; // 환경 변수에서 API 키 가져오기

  // ✅ 이메일 형식 검사 함수
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ 사업자번호 및 전화번호 숫자만 입력 가능
    if (name === 'businessRegistrationNumber' || name === 'phoneNumber') {
      const numericValue = value.replace(/[^0-9]/g, ''); // 숫자만 허용

      setFormData((prev) => ({
        ...prev,
        [name]: numericValue, // ✅ 입력한 필드만 업데이트
      }));

      // ✅ 사업자번호일 경우 10자리 검사
      if (name === 'businessRegistrationNumber') {
        if (numericValue.length === 10) {
          verifyBusinessNumber(numericValue);
        } else {
          setBusinessCheckResult({
            valid: false,
            message: '사업자 등록번호는 10자리여야 합니다.',
          });
        }
      }
      return;
    }

    // 기타 필드 업데이트
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (
      !formData.email ||
      !formData.ceoName ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    // 비밀번호 길이 검증: 8자리 이상이어야 함
    if (formData.password.length < 8) {
      setErrorMessage('비밀번호는 8자리 이상이어야 합니다.');
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

  // ✅ 사업자등록번호 검사 로직
  const verifyBusinessNumber = async (businessRegistrationNumber) => {
    setIsChecking(true);

    const apiUrl = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${apiKey}`;
    const requestData = {
      b_no: [businessRegistrationNumber],
    };

    try {
      const response = await axios.post(apiUrl, JSON.stringify(requestData), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (
        !response.data ||
        !response.data.data ||
        response.data.data.length === 0
      ) {
        setBusinessCheckResult({
          valid: false,
          message: '국세청에 등록되지 않은 사업자등록번호입니다.',
        });
        return;
      }

      const businessData = response.data.data[0];

      if (
        businessData.tax_type === '국세청에 등록되지 않은 사업자등록번호입니다.'
      ) {
        setBusinessCheckResult({
          valid: false,
          message: '국세청에 등록되지 않은 사업자등록번호입니다.',
        });
      } else {
        setBusinessCheckResult({
          valid: true,
          message: `유효한 사업자등록번호입니다. (상태: ${businessData.tax_type})`,
        });
      }
    } catch (error) {
      console.error('📌 API 요청 실패:', error);
      setBusinessCheckResult({ valid: false, message: '사업자번호 조회 실패' });
    } finally {
      setIsChecking(false);
    }
  };

  // 회원가입 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (
      !formData.companyName ||
      !formData.businessRegistrationNumber ||
      !formData.phoneNumber
    ) {
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }
    if (!businessCheckResult?.valid) {
      setErrorMessage('유효한 사업자등록번호를 입력해주세요.');
      return;
    }

    const requestBody = {
      email: formData.email,
      password: formData.password,
      ceoName: formData.ceoName,
      companyName: formData.companyName,
      businessRegistrationNumber: formData.businessRegistrationNumber,
      phoneNumber: formData.phoneNumber,
      profileImageUrl: '',
    };

    try {
      await publicRequest.post('api/v1/auth/companies/register', requestBody);
      Swal.fire('기업 회원가입 성공!');
      navigate('/login'); // 회원가입 성공 시 /login으로 이동
    } catch (error) {
      const errorData = error.response?.data;
      console.log('📌 회원가입 실패:', errorData);
      if (errorData?.error?.code === 'M002') {
        setErrorMessage('중복된 이메일입니다.');
      } else {
        setErrorMessage(errorData?.message || '회원가입 실패');
      }
    }
  };
  return (
    <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg ">
      <h1 className="mb-6 text-3xl font-bold text-center text-brown">
        기업회원 회원가입
      </h1>

      {errorMessage && (
        <p className="mb-4 text-sm text-center text-red-500">{errorMessage}</p>
      )}

      {step === 1 ? (
        // ✅ **1단계: 대표자 정보 입력**
        <form>
          <div className="mb-4">
            <input
              name="email"
              type="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="ceoName"
              placeholder="대표자 이름"
              value={formData.ceoName}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-3 mt-4 text-white rounded-lg bg-brown"
          >
            다음
          </button>
        </form>
      ) : (
        // ✅ **2단계: 회사 정보 입력**
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="companyName"
              placeholder="여행사명"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="businessRegistrationNumber"
              placeholder="사업자 등록번호 (10자리)"
              value={formData.businessRegistrationNumber}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded focus:ring focus:ring-yellow-400"
              required
            />
            {isChecking && <p className="text-sm text-gray-500">조회 중...</p>}
            {businessCheckResult && (
              <p
                className={`text-sm ${
                  businessCheckResult.valid ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {businessCheckResult.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="phoneNumber"
              placeholder="회사 전화번호"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="px-4 py-2 text-white bg-gray-400 rounded"
            >
              이전
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white rounded bg-brown hover:bg-yellow hover:text-brown hover:font-semibold"
              disabled={!businessCheckResult?.valid} // ❌ 유효하지 않으면 버튼 비활성화
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
