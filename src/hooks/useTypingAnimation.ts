import { useState, useEffect } from 'react';

export const useTypingAnimation = (text: string, speed: number = 30) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsComplete(false);

    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return { displayedText, isComplete };
};