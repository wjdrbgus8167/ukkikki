// ProfileInfo.jsx
import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const ProfileInfo = ({user}) => {
  const {name, email} = user;

  const details = [
    { label: '이름', value: name },
    { label: '이메일', value: email },
    { label: '소셜계정', value: 'aaa.@naver.com', icon: <FaEnvelope className="mr-2 text-xl" /> },
  ];

  return (
    <div>
      {details.map((detail) => (
        <div key={detail.label} className="flex justify-between mb-10">
          <div className="w-24 flex-none font-semibold text-gray-700">
            {detail.label}
          </div>
          <div className="text-gray-500 flex items-center">
            {detail.icon && detail.icon}
            <span>{detail.value}</span>
          </div>
        </div>
      ))}
    </div>
  );

  // return (
  //   <div>
  //     {/* <div className="justify-between flex items-center">
  //       <h3 className="font-bold text-gray-700">연결된 소셜계정</h3>
  //       <FaEnvelope className="mr-2 text-xl" />
  //     </div> */}
  //     <div className="justify-between flex mb-2">
  //       <div className="font-semibold text-gray-700">이름</div>
  //       <div className='text-gray-500'>{name}</div>
  //     </div>
  //     <div className="justify-between flex mb-2">
  //       <div className="font-semibold text-gray-700">이메일</div>
  //       <div className='text-gray-500'>{email}</div>
  //     </div>
  //   </div>
  // );
};

export default ProfileInfo;
