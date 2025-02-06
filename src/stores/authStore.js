import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      // 필요한 경우 login, register 등의 액션도 추가
    }),
    {
      name: 'auth', // 로컬 스토리지에 저장될 key 이름
      // 선택적으로 직렬화/역직렬화 옵션을 설정할 수 있음
    },
  ),
);

export default useAuthStore;
