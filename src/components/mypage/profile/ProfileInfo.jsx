import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { SiKakaotalk, SiGoogle } from 'react-icons/si';
import useAuthStore from '../../../stores/authStore';

const ProfileInfo = ({ user }) => {
  const { userRole } = useAuthStore();

  if (userRole === 'company') {
    const details = [
      { label: '회사명', value: user.companyName },
      { label: '대표자명', value: user.ceoName },
      { label: '이메일', value: user.email },
      { label: '사업자등록번호', value: user.businessRegistrationNumber },
      { label: '전화번호', value: user.phoneNumber },
    ];

    return (
      <div>
        {details.map((detail) => (
          <div key={detail.label} className="flex justify-between mb-10">
            <div className="w-32 flex-none font-semibold text-gray-700">
              {detail.label}
            </div>
            <div
              className="text-gray-500 flex items-center"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
            >
              {detail.icon && detail.icon}
              <span>{detail.value}</span>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    const { name, email, provider } = user;
    let socialIcon;
    if (!provider || provider === '') {
      socialIcon = <FaEnvelope className="mr-2 text-xl" />;
    } else if (provider.toLowerCase() === 'kakao') {
      socialIcon = <SiKakaotalk className="mr-2 text-xl text-yellow" />;
    } else if (provider.toLowerCase() === 'google') {
      socialIcon = <SiGoogle className="mr-2 text-xl" />;
    } else {
      socialIcon = <FaEnvelope className="mr-2 text-xl" />;
    }

    const details = [
      { label: '이름', value: name },
      { label: '이메일', value: email },
      { label: '소셜계정', value: provider, icon: socialIcon },
    ];

    return (
      <div>
        {details.map((detail) => (
          <div key={detail.label} className="flex justify-between mb-10">
            <div className="w-24 flex-none font-semibold text-gray-700">
              {detail.label}
            </div>
            <div
              className="text-gray-500 flex items-center"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
            >
              {detail.icon && detail.icon}
              <span>{detail.value}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default ProfileInfo;
