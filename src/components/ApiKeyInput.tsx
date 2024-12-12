import React from 'react';
import { Key } from 'lucide-react';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey }) => {
  return (
    <div className="w-full max-w-md mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Key className="w-5 h-5 text-yellow-500" />
        <span className="text-yellow-500">Authentication Required</span>
      </div>
      <div className="bg-[#1E1E1E] rounded border border-[#6C6C6C]">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          className="w-full p-2 bg-transparent text-white placeholder-gray-500 focus:outline-none"
        />
      </div>
      <p className="mt-2 text-sm text-gray-400">
        Your API key is stored locally and never sent to our servers.
      </p>
    </div>
  );
};