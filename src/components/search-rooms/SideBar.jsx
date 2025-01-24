import React from 'react';

const Sidebar = () => {
  const menuItems = ['내 여행방', '즐겨찾기', '설정'];

  return (
    <aside className="bg-gray-100 w-64 p-6 shadow-md">
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index} className="cursor-pointer text-gray-700 hover:text-dark-green">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
