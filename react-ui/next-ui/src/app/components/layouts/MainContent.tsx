// src/components/layouts/MainContent.tsx
import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
      {children}
    </main>
  );
};

export default MainContent;