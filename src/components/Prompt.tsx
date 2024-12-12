import React from 'react';
import { SendHorizontal } from 'lucide-react';

interface PromptProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDisabled: boolean;
}

export const Prompt: React.FC<PromptProps> = ({ input, setInput, onSubmit, isDisabled }) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 mt-4">
      <div className="flex-1 flex items-center bg-[#1E1E1E] rounded border border-[#6C6C6C]">
        <span className="text-green-400 px-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isDisabled}
          className="flex-1 bg-transparent p-2 text-white placeholder-gray-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isDisabled}
        className="px-4 py-2 bg-[#6C6C6C] text-white rounded hover:bg-[#808080] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <SendHorizontal className="w-5 h-5" />
        Send
      </button>
    </form>
  );
};