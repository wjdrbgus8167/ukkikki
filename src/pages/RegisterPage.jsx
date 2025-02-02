import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // URL 파라미터 가져오기
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroText from '../components/common/SloganText';
import UserRegisterForm from '../components/auth/UserRegisterForm';
import CompanyRegisterForm from '../components/auth/CompanyRegisterForm';
import bgImage from '../assets/login-bg.png';

const RegisterPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isCompanyFromQuery = queryParams.get('type') === 'company';

  // URL에서 `type=company`이면 기업 회원가입만 보이도록 설정
  const [isCompany, setIsCompany] = useState(isCompanyFromQuery);

  // URL이 변경될 때마다 `isCompany` 상태 업데이트
  useEffect(() => {
    setIsCompany(isCompanyFromQuery);
  }, [isCompanyFromQuery]);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header />
      <main className="flex flex-1 flex-col md:flex-row items-center md:px-28 py-10">
        <HeroText textColor="text-brown" />

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* `type=company`가 없을 때만 스위치 버튼 표시 */}
            {/* {!isCompany && (
              <div className="flex space-x-4 mb-4">
                <button
                  className={`flex-1 py-2 rounded ${!isCompany ? 'bg-brown text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setIsCompany(false)}
                >
                  일반 회원가입
                </button>
                <button
                  className={`flex-1 py-2 rounded ${isCompany ? 'bg-brown text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setIsCompany(true)}
                >
                  기업 회원가입
                </button>
              </div>
            )} */}

            {/* 기업/일반 회원가입 폼 렌더링 */}
            {isCompany ? <CompanyRegisterForm /> : <UserRegisterForm />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
