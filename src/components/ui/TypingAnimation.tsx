import { useState, useEffect, ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  cursorClassName?: string;
  render?: (text: string, cursor: ReactNode) => ReactNode;
}

const TypingAnimation = ({ text, speed = 150, className, cursorClassName, render }: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prevShowCursor) => !prevShowCursor);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const isAnimationComplete = displayText === text;
  const cursor = !isAnimationComplete && (
    <span className={cn("animate-pulse", cursorClassName, { "opacity-0": !showCursor })}>
      {'█'}
    </span>
  );

  return (
    <span className={className}>
      {render ? render(displayText, cursor) : <>{displayText}{cursor}</>}
    </span>
  );
};

export default TypingAnimation;
