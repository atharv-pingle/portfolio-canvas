import { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from "@/lib/utils";
import { triggerHaptic } from "@/lib/haptics";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  cursorClassName?: string;
  render?: (text: string, cursor: ReactNode) => ReactNode;
  enableHaptics?: boolean;
  typingHapticThrottleMs?: number;
}

const TypingAnimation = ({
  text,
  speed = 150,
  className,
  cursorClassName,
  render,
  enableHaptics = false,
  typingHapticThrottleMs = 100,
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const lastTypingHapticAtRef = useRef(0);
  const completionHapticPlayedRef = useRef(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        const nextCharacter = text[currentIndex];
        setDisplayText((prevText) => prevText + nextCharacter);
        setCurrentIndex((prevIndex) => prevIndex + 1);

        if (enableHaptics && nextCharacter.trim().length > 0) {
          const now = performance.now();
          if (now - lastTypingHapticAtRef.current >= typingHapticThrottleMs) {
            triggerHaptic("selection");
            lastTypingHapticAtRef.current = now;
          }
        }
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, enableHaptics, speed, text, typingHapticThrottleMs]);

  useEffect(() => {
    if (!enableHaptics || displayText !== text || completionHapticPlayedRef.current) {
      return;
    }
    triggerHaptic("soft");
    completionHapticPlayedRef.current = true;
  }, [displayText, enableHaptics, text]);

  useEffect(() => {
    completionHapticPlayedRef.current = false;
    lastTypingHapticAtRef.current = 0;
  }, [text, enableHaptics]);

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
