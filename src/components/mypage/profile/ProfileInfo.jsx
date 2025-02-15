import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { SiKakaotalk, SiGoogle } from 'react-icons/si';

const ProfileInfo = ({ user }) => {
  const { name, email, provider } = user;

  let socialIcon;
  if (!provider || provider === '') {
    socialIcon = <FaEnvelope className="mr-2 text-xl no-margin" />;
  } else if (provider.toLowerCase() === 'kakao') {
    socialIcon = <SiKakaotalk className="mr-2 text-xl text-yellow no-margin" />;
  } else if (provider.toLowerCase() === 'google') {
    socialIcon = <SiGoogle className="mr-2 text-xl text-progress no-margin" />;
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
};

export default ProfileInfo;
