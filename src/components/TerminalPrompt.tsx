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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSubmit(value);
    onChange('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center group">
      <div className="flex items-center gap-2">
        <span className="text-gray-500">❯</span>
        <span className={`${currentTheme.prompt}`}>guest@ai-terminal:~$</span>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`flex-1 bg-transparent ${currentTheme.text} outline-none ml-2 px-2 py-1 
                   focus:bg-opacity-10 focus:bg-white rounded transition-all`}
        autoFocus
        spellCheck="false"
      />
    </form>
  );
};