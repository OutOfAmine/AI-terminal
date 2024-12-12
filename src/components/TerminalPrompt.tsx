import React, { useEffect, useRef } from 'react';
import { themes } from '../styles/themes';

interface TerminalPromptProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  disabled?: boolean;
  theme?: keyof typeof themes;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  value,
  onChange,
  onSubmit,
  disabled,
  theme = 'ubuntu'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentTheme = themes[theme];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keep focus on input when clicking anywhere in the terminal
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSubmit(value);
    onChange('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center group">
      <div className="flex items-center gap-2">
        <span className={`${currentTheme.prompt}`}>guest@ai-terminal:~$</span>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`flex-1 bg-transparent ${currentTheme.text} caret-white outline-none border-none ml-2 
                   focus:outline-none focus:ring-0 focus:bg-transparent`}
        autoFocus
        spellCheck="false"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
      />
    </form>
  );
};