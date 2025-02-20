import React from 'react';
import { FaUser, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import SidebarItem from './SidebarItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';
import useAuthStore from '../../stores/authStore';

const Sidebar = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole } = useAuthStore();

  const handleLogout = async () => {
    try {
      const response = await publicRequest.post(
        '/api/v1/auth/logout',
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        useAuthStore.getState().logout();
        await useAuthStore.persist.clearStorage();
        await Swal.fire({
          title: '로그아웃 되었습니다!',
          text: '메인 페이지로 이동합니다.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: '확인',
        });
        navigate('/');
      }
    } catch (error) {
      console.error('🚨 로그아웃 실패:', error);
      Swal.fire({
        title: '로그아웃 실패',
        text: '다시 시도해주세요.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: '확인',
      });
    }
  };

  const menuItems =
    userRole === 'company' && location.pathname.includes('/proposal')
      ? [
        {
          label: '패키지 의뢰',
          onClick: () => onMenuClick('receivedProposals'),
          icon: <FaHistory />,
          to: '/received-proposals', 
        },
        {
          label: '제시 현황',
          onClick: () => onMenuClick('ongoingProposals'),
          icon: <FaHistory />,
          to: '/ongoing-proposals', 
        },
      ]
      : userRole === 'company'
        ? [
          {
            label: '여행 성사 내역',
            onClick: () => onMenuClick('AcceptedProposals'),
            icon: <FaHistory />,
            to: '/accepted-proposals', 
          },
          { label: '프로필', onClick: () => onMenuClick('profile'), icon: <FaUser />, to: '/profile' },
          {
            label: '로그아웃',
            onClick: handleLogout,
            icon: <FaSignOutAlt />,
            to: '/', 
          },
        ]
      : [
          // 일반 사용자인 경우
          { label: '프로필', href: '/myprofile', icon: <FaUser /> },
          {
            label: '로그아웃',
            onClick: handleLogout,
            icon: <FaSignOutAlt />,
            to: '/', 
          },
        ];

  return (
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r p-4">
      <nav>
        <ul className="flex flex-row items-center space-x-6 md:flex-col md:items-start md:space-x-0 md:space-y-6">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              to={item.to} 
              active={item.label !== '로그아웃' && location.pathname === item.to}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
