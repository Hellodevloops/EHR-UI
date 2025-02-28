// src/components/layouts/Navbar.tsx
'use client';

import React, { useState } from 'react';
import { Bell, UserCircle, Menu, LogOut, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onMenuToggle: () => void;
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, userName }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-indigo-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-all duration-200 md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center ml-4">
              <h1 className="text-xl font-serif font-semibold bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent tracking-tight">
                Devloops EHR
              </h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <div className="relative group">
              <button className="p-2 rounded-full text-indigo-600 hover:bg-indigo-50 transition-all duration-200 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </button>
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-indigo-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:-translate-y-1">
                <div className="p-4">
                  <h4 className="text-sm font-medium text-indigo-800 mb-2">Notifications</h4>
                  <p className="text-xs text-gray-600">No new notifications</p>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition-all duration-200 group"
              >
                <UserCircle className="h-5 w-5 text-indigo-600 group-hover:scale-105 transition-transform" />
                <span className="text-sm font-medium text-indigo-800 truncate max-w-[120px]">{userName}</span>
                <ChevronDown className={`h-4 w-4 text-indigo-600 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-indigo-100 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-indigo-800 font-medium border-b border-indigo-100">
                      {userName}
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center px-3 py-2 text-sm text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                    >
                      <UserCircle className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      href="/logout"
                      className="flex items-center px-3 py-2 text-sm text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;