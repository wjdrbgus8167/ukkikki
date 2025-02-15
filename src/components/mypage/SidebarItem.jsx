// SidebarItem.jsx
import React from 'react';

const SidebarItem = ({ icon, label, href, active, onClick }) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <li className="w-full">
      <a
        href={href || '#'}
        onClick={handleClick}
        className={`flex w-full items-center px-4 py-2 rounded-md transition-colors text-lg 
          ${
            active
              ? 'bg-gray-100 font-semibold text-brown'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span>{label}</span>
      </a>
    </li>
  );
};

export default SidebarItem;
