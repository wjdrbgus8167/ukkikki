export const setAuthCookie = (token) => {
  document.cookie = `token=${encodeURIComponent(token)}; path=/; secure=None;`;
};

// ✅ 쿠키 가져오기
export const getAuthCookie = () => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

  return cookieValue ? decodeURIComponent(cookieValue) : null;
};

// ✅ 쿠키 삭제 (로그아웃)
export const removeAuthCookie = () => {
  document.cookie =
    'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; sameSite=None; secure';
};
