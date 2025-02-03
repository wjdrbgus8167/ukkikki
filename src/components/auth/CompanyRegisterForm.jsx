import React, { useState, useEffect } from 'react';
import { publicRequest } from '../../hooks/requestMethod';
import axios from 'axios';

const CompanyRegisterForm = () => {
  const [step, setStep] = useState(1); // 현재 단계 (1 or 2)
  const [formData, setFormData] = useState({
    email: '',
    representativeName: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessNumber: '',
    companyPhone: '',
    companyAddress: '',
    companyDetailAddress: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [businessCheckResult, setBusinessCheckResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false); // 사업자번호 조회 중 여부
  const [isScriptLoaded, setIsScriptLoaded] = useState(false); // ✅ 스크립트 로딩 상태

  const apiKey = import.meta.env.VITE_APP_ODCLOUD_API_KEY; // 환경 변수에서 API 키 가져오기
  // ✅ 카카오 주소 API 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true); // ✅ 로딩 완료 시 상태 변경
    document.body.appendChild(script);
  }, []);

  // ✅ 이메일 형식 검사 함수
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ 사업자번호 및 전화번호 숫자만 입력 가능
    if (name === 'businessNumber' || name === 'companyPhone') {
      const numericValue = value.replace(/[^0-9]/g, ''); // 숫자만 허용

      setFormData((prev) => ({
        ...prev,
        [name]: numericValue, // ✅ 입력한 필드만 업데이트
      }));

      // ✅ 사업자번호일 경우 10자리 검사
      if (name === 'businessNumber') {
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

  // ✅ 카카오 주소 검색 API 실행 함수
  const handleAddressSearch = () => {
    if (!isScriptLoaded) {
      alert('주소 검색 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        setFormData((prev) => ({
          ...prev,
          companyAddress: data.address,
        }));
      },
    }).open();
  };

  const handleNextStep = () => {
    if (
      !formData.email ||
      !formData.representativeName ||
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

  // ✅ 사업자등록번호 검사 로직 수정
  const verifyBusinessNumber = async (businessNumber) => {
    setIsChecking(true);

    const apiUrl = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${apiKey}`;

    const requestData = {
      b_no: [businessNumber],
    };

    try {
      const response = await axios.post(apiUrl, JSON.stringify(requestData), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log('📌 API 응답:', response.data);

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

  //회원가입 요청
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
    // ❌ 사업자번호가 유효하지 않으면 가입 불가
    if (!businessCheckResult?.valid) {
      setErrorMessage('유효한 사업자등록번호를 입력해주세요.');
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
      <h1 className="text-3xl text-brown font-bold text-center mb-6">
        기업회원 회원가입
      </h1>

      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
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
              name="representativeName"
              placeholder="대표자 이름"
              value={formData.representativeName}
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
            className="w-full bg-brown text-white py-3 rounded-lg mt-4"
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
              name="businessNumber"
              placeholder="사업자 등록번호 (10자리)"
              value={formData.businessNumber}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded focus:ring focus:ring-yellow-400"
              required
            />
            {isChecking && <p className="text-gray-500 text-sm">조회 중...</p>}
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
              name="companyPhone"
              placeholder="회사 전화번호"
              value={formData.companyPhone}
              onChange={handleChange}
              className="w-full px-3 py-4 border rounded"
              required
            />
          </div>
          {/* ✅ 카카오 주소 입력 필드 */}
          <div className="mb-4">
            <div className="flex">
              <input
                type="text"
                name="companyAddress"
                placeholder="회사 주소"
                value={formData.companyAddress}
                onChange={handleChange}
                onClick={handleAddressSearch}
                className="w-full px-3 py-4 border rounded"
                required
                readOnly
              />
            </div>
          </div>

          {/* ✅ 상세 주소 입력 필드 추가 */}
          {formData.companyAddress && (
            <div className="mb-4">
              <input
                type="text"
                name="companyDetailAddress"
                placeholder="상세 주소 입력"
                value={formData.companyDetailAddress || ''} // ✅ undefined 방지
                onChange={handleChange}
                className="w-full px-3 py-4 border rounded"
              />
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              이전
            </button>

            <button
              type="submit"
              className="bg-brown text-white px-4 py-2 rounded hover:bg-yellow hover:text-brown hover:font-semibold"
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
