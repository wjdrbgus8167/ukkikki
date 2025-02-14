import React from 'react';
import { FaUser, FaHistory, FaCog, FaSignOutAlt } from 'react-icons/fa';
import SidebarItem from './SidebarItem';
import { useLocation } from 'react-router';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { label: '내 여행', href: '/mypage/myroom', icon: <FaHistory /> },
    { label: '프로필', href: '/mypage/profile', icon: <FaUser /> },
    { label: '로그아웃', href: '/logout', icon: <FaSignOutAlt /> },
  ];

  return (
    <aside className=" w-full md:w-64 bg-white border-b md:border-b-0 md:border-r p-4">
      <nav>
        <ul className="flex flex-row items-center space-x-6 md:flex-col md:items-start md:space-x-0 md:space-y-6">
        {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={location.pathname === item.href}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;