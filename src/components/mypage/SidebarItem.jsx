// SidebarItem.jsx
import React from 'react';

const SidebarItem = ({ icon, label, href, active }) => {
  return (
    <li>
      <a
        href={href}
        className={`flex w-full items-center px-4 py-2 rounded-md transition-colors text-lg 
          ${active ? 'bg-gray-100 font-semibold text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
      >
        {/* 아이콘이 있을 경우만 출력 */}
        {icon && <span className="mr-2">{icon}</span>}
        <span>{label}</span>
      </a>
    </li>
  );
};

export default SidebarItem;
