// UserProfile.jsx
import React from 'react';
import ProfileAvatar from './ProfileAvatar';
import SocialAccounts from './SocailAccounts';
import ProfileInfo from './ProfileInfo';

const UserProfile = () => {

  const user = {
    name: '박주현',
    email: 'aaa.@naver.com'
  }
  return (
    <section className="max-w-4xl mx-auto px-20 pt-2 flex flex-col space-y-12">
      {/* 상단 아바타 영역 */}
      <ProfileAvatar />

      {/* 사용자 상세 정보 */}
      <ProfileInfo user={user}/>
    </section>
  );
};

export default UserProfile;
