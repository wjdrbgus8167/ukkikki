import { useEffect } from 'react';
import useAuthStore from '../stores/authStore';
import { getAuthCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

const useAutoLogout = () => {
  const logout = useAuthStore.getState().logout;

  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthCookie();
      if (!token) {
        console.log('🔴 쿠키 만료 감지 → 자동 로그아웃 실행');
        logout();
        useAuthStore.persist.clearStorage();
      }
    };

    // 30초마다 쿠키 상태 확인
    const interval = setInterval(checkAuth, 30000);

    return () => clearInterval(interval);
  }, [logout]);
};

export default useAutoLogout;
