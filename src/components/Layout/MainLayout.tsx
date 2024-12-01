import React from 'react';
import { useLocation } from 'react-router-dom';
import { CommandLineIcon } from '@heroicons/react/24/outline';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 relative">
        {children}
        
        {/* Keyboard shortcut hint */}
        <div className="fixed bottom-4 right-4">
          <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg text-sm text-gray-400">
            <CommandLineIcon className="w-4 h-4" />
            <span>Press</span>
            <kbd className="px-2 py-1 bg-gray-700 rounded-md">⌘</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-gray-700 rounded-md">K</kbd>
            <span>for commands</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;