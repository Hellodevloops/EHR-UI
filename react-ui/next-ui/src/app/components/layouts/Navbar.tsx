// src/components/layouts/Navbar.tsx
'use client';

import React from 'react';
import { Bell, UserCircle, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuToggle: () => void;
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, userName }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </button>
            <div className="flex-shrink-0 flex items-center ml-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Devloops EHR
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-indigo-50 text-gray-600 transition-colors duration-200">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full">
              <UserCircle className="h-6 w-6 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">{userName}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;