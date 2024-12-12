import React from 'react';
import { TerminalHistory } from '../types/terminal';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { themes } from '../styles/themes';

interface TerminalOutputProps {
  history: TerminalHistory[];
  theme?: keyof typeof themes;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ 
  history, 
  theme = 'ubuntu' 
}) => {
  const currentTheme = themes[theme];

  return (
    <div className="space-y-3">
      {history.map((entry, index) => (
        <div key={index} className="terminal-entry">
          {entry.command && (
            <div className={`flex items-center ${currentTheme.prompt} mb-1`}>
              <span className="flex items-center gap-2">
                <span className="text-gray-500">❯</span>
                <span>guest@ai-terminal:~$</span>
                <span className="ml-2">{entry.command}</span>
              </span>
            </div>
          )}
          {entry.isLoading ? (
            <div className={`${currentTheme.warning} flex items-center gap-2 animate-pulse`}>
              <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin"/>
              Processing...
            </div>
          ) : (
            <TerminalLine
              text={entry.output}
              isError={entry.isError}
              theme={theme}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const TerminalLine: React.FC<{ 
  text: string; 
  isError?: boolean;
  theme?: keyof typeof themes;
}> = ({ text, isError, theme = 'ubuntu' }) => {
  const { displayedText, isComplete } = useTypingAnimation(text, 20);
  const currentTheme = themes[theme];
  
  return (
    <div className={`whitespace-pre-wrap pl-4 border-l-2 border-gray-700 ${
      isError ? currentTheme.error : currentTheme.text
    }`}>
      {displayedText}
      {!isComplete && (
        <span className="animate-pulse ml-1 opacity-75">▊</span>
      )}
    </div>
  );
};