import React from 'react';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const { displayedText, isComplete } = useTypingAnimation(
    message.content,
    isUser ? 0 : 30
  );

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <span className={isUser ? 'text-green-400' : 'text-purple-400'}>
          {isUser ? '$ user' : '# assistant'}
        </span>
      </div>
      <div className="pl-4 border-l-2 border-gray-700">
        <p className="text-gray-200 whitespace-pre-wrap">
          {isUser ? message.content : displayedText}
          {!isComplete && !isUser && (
            <span className="animate-pulse">▊</span>
          )}
        </p>
      </div>
    </div>
  );
};