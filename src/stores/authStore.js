import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // 로그인된 사용자 정보 (예: { id, name, ... })
      isAuthenticated: false, // 로그인 여부를 boolean으로 관리
      setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-store', // 로컬 스토리지에 저장될 key 이름
      // getStorage: () => localStorage, // 기본값이 localStorage입니다.
    },
  ),
);

export default useAuthStore;
