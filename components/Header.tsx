
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-4">
      <div className="flex justify-center items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-300 flex items-center justify-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text leading-tight mb-2">
          My Todos
        </h1>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-300 to-cyan-300 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
      </div>
      <p className="mt-6 text-gray-500 text-lg">
        Organize your life with style ✨
      </p>
    </header>
  );
};

export default Header;
