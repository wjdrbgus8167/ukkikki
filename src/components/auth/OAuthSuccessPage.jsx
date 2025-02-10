import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

const OAuthSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // location이나 query param 등에 user 정보가 들어있다면 여기서 꺼내고
    // localStorage에 저장하거나, 전역 상태관리(예: Redux, Recoil)에 저장하는 로직을 넣어도 됩니다.
    // 예: const query = new URLSearchParams(location.search);
    // const token = query.get('token');
    // localStorage.setItem('accessToken', token);
    useAuthStore.getState().setUser(true);

    // 로그인 성공 시 바로 메인페이지로 이동
    navigate('/');
  }, [navigate, location]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>로그인 중입니다. 잠시만 기다려주세요...</p>
    </div>
  );
};

export default OAuthSuccessPage;
