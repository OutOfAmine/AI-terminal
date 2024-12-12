import React from 'react';
import { Terminal as TerminalIcon, Maximize2, Minus, X } from 'lucide-react';
import { themes } from '../styles/themes';

interface TerminalProps {
  children: React.ReactNode;
  theme?: keyof typeof themes;
}

export const Terminal: React.FC<TerminalProps> = ({ children, theme = 'ubuntu' }) => {
  const currentTheme = themes[theme];

  return (
    <div className={`${currentTheme.bg} min-h-screen text-white font-mono transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-4">
        <div className={`${currentTheme.headerBg} rounded-t-lg shadow-lg`}>
          <div className="flex items-center px-4 py-2">
            <div className="flex gap-2">
              <button className="w-3 h-3 rounded-full bg-[#FF5F57] hover:opacity-80 transition-opacity" 
                      aria-label="close"/>
              <button className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:opacity-80 transition-opacity" 
                      aria-label="minimize"/>
              <button className="w-3 h-3 rounded-full bg-[#28CA41] hover:opacity-80 transition-opacity" 
                      aria-label="maximize"/>
            </div>
            <div className="flex-1 text-center text-sm text-gray-300 flex items-center justify-center gap-2">
              <TerminalIcon className="w-4 h-4" />
              <span>AI Terminal</span>
            </div>
            <div className="flex gap-4">
              <Minus className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
              <Maximize2 className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
              <X className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className={`${currentTheme.bg} p-6 rounded-b-lg shadow-xl border-t-0 border border-gray-700`}>
          {children}
        </div>
      </div>
    </div>
  );
};