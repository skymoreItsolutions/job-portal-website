'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FiBriefcase, FiDatabase, FiFileText, FiUsers } from 'react-icons/fi';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Jobs',
      icon: <FiBriefcase />,
      route: '/employer/post-job',
    },
    {
      title: 'Applications',
      icon: <FiFileText />,
      route: '/employer/candidate-database',
    },
    {
      title: 'Database',
      icon: <FiDatabase />,
      route: '/database/profiles',
    },
    {
      title: 'Candidates',
      icon: <FiUsers />,
      route: '/candidates/shortlisted',
    },
  ];

  return (
    <div className={`bg-white shadow-lg ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 h-screen`}>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{isSidebarOpen ? 'Dashboard' : 'D'}</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => router.push(item.route)}
            className={`w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 ${
              pathname === item.route ? 'bg-gray-100 text-gray-900 font-semibold' : ''
            } mb-2`}
          >
            <span className="mr-3">{item.icon}</span>
            {isSidebarOpen && <span>{item.title}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;