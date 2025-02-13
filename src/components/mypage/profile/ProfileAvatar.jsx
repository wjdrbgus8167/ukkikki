// ProfileAvatar.jsx
import React from 'react';

const ProfileAvatar = () => {
  // 보통 props나 전역 상태(예: userContext)에서 사용자 정보를 받아옵니다.
  const userImage = null; // null이면 기본 아바타 이미지를 표시한다고 가정

  return (
    <div className="flex flex-col items-center mb-8">
      {/* 아바타 (원형) */}
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
        {userImage ? (
          <img
            src={userImage}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          // 사용자 이미지가 없을 때 아이콘이나 기본 이미지 표시
          <svg
            className="w-12 h-12 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.667 0 8 1.333 8 4v2H4v-2c0-2.667 5.333-4 8-4zm0-2c-1.06 0-2.08-.421-2.828-1.172C8.421 8.08 8 7.06 8 6s.421-2.08 1.172-2.828C9.92 2.421 10.94 2 12 2s2.08.421 2.828 1.172C15.579 3.92 16 4.94 16 6s-.421 2.08-1.172 2.828C14.08 9.579 13.06 10 12 10z" />
          </svg>
        )}
      </div>

    </div>
  );
};

export default ProfileAvatar;
