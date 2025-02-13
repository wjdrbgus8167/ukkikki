import React from 'react';
import { FaUser, FaHistory, FaCog, FaSignOutAlt } from 'react-icons/fa';
import SidebarItem from './SidebarItem';
import { useLocation } from 'react-router';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { label: '내 활동', href: '#', icon: <FaHistory /> },
    { label: '프로필', href: '/mypage/profile', icon: <FaUser /> },
    { label: '설정', href: '#', icon: <FaCog /> },
    { label: '로그아웃', href: '#', icon: <FaSignOutAlt /> },
  ];

  return (
    <aside
      className="
        w-full           /* 모바일: 전체 폭 */
        md:w-64          /* 데스크톱(md 이상): 폭 16rem */
        bg-white
        border-b         /* 모바일: 아래쪽 테두리 */
        md:border-b-0
        md:border-r
        p-4
      "
    >

      <nav>
        <ul className="flex flex-row items-center space-x-6 md:flex-col md:items-start md:space-x-0 md:space-y-6">
        {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              // active={
              //   (location.pathname === '/mypage' && item.href === '/mypage/profile') ||
              //   location.pathname.startsWith(item.href)
              // }
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;