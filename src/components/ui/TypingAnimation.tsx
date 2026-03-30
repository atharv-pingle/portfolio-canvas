import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { cn } from "@/lib/utils";
import { triggerHaptic, triggerHapticInput } from "@/lib/haptics";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  cursorClassName?: string;
  render?: (text: string, cursor: ReactNode) => ReactNode;
  enableHaptics?: boolean;
  typingHapticThrottleMs?: number;
  waitForUserInteractionToStart?: boolean;
}

const TypingAnimation = ({
  text,
  speed = 150,
  className,
  cursorClassName,
  render,
  enableHaptics = false,
  typingHapticThrottleMs = 80,
  waitForUserInteractionToStart = false,
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [canStartTyping, setCanStartTyping] = useState(!enableHaptics || !waitForUserInteractionToStart);
  const lastTypingHapticAtRef = useRef(0);
  const completionHapticPlayedRef = useRef(false);
  const typingSequenceQueuedRef = useRef(false);
  const currentIndexRef = useRef(0);
  const isCompleteRef = useRef(false);

  const buildTypingPatternFromIndex = useCallback((startIndex: number) => {
    const keypressDurationMs = 18;
    const minimumGapMs = 12;
    const completionPauseMs = 50;
    const pattern: number[] = [];
    let accumulatedDelay = 0;

    for (let index = startIndex; index < text.length; index += 1) {
      accumulatedDelay += speed;
      const nextCharacter = text[index];

      if (nextCharacter.trim().length === 0) {
        continue;
      }

      const onDuration = Math.min(keypressDurationMs, Math.max(8, accumulatedDelay));
      pattern.push(onDuration);

      const offDuration = Math.max(minimumGapMs, accumulatedDelay - onDuration);
      pattern.push(offDuration);
      accumulatedDelay = 0;
    }

    if (pattern.length === 0) {
      return pattern;
    }

    pattern[pattern.length - 1] = Math.max(pattern[pattern.length - 1], completionPauseMs);
    pattern.push(24, 45, 34);
    return pattern;
  }, [speed, text]);

  const scheduleRemainingTypingPattern = useCallback(() => {
    if (!enableHaptics || typingSequenceQueuedRef.current || isCompleteRef.current) {
      return;
    }

    const pattern = buildTypingPatternFromIndex(currentIndexRef.current);
    if (pattern.length === 0) {
      return;
    }

    triggerHapticInput(pattern);
    typingSequenceQueuedRef.current = true;
  }, [buildTypingPatternFromIndex, enableHaptics]);

  useEffect(() => {
    if (!canStartTyping) {
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        const nextCharacter = text[currentIndex];
        setDisplayText((prevText) => prevText + nextCharacter);
        setCurrentIndex((prevIndex) => prevIndex + 1);

        if (enableHaptics && !typingSequenceQueuedRef.current && nextCharacter.trim().length > 0) {
          const now = performance.now();
          if (now - lastTypingHapticAtRef.current >= typingHapticThrottleMs) {
            triggerHaptic("typing");
            lastTypingHapticAtRef.current = now;
          }
        }
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [canStartTyping, currentIndex, enableHaptics, speed, text, typingHapticThrottleMs]);

  useEffect(() => {
    if (
      !enableHaptics ||
      typingSequenceQueuedRef.current ||
      displayText !== text ||
      completionHapticPlayedRef.current
    ) {
      return;
    }
    triggerHaptic("typingComplete");
    completionHapticPlayedRef.current = true;
  }, [displayText, enableHaptics, text]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    isCompleteRef.current = displayText === text;
  }, [currentIndex, displayText, text]);

  useEffect(() => {
    if (!enableHaptics) {
      return;
    }

    const handleUserGesture = () => {
      if (waitForUserInteractionToStart) {
        setCanStartTyping(true);
      }
      scheduleRemainingTypingPattern();
    };

    window.addEventListener("click", handleUserGesture, { passive: true });
    window.addEventListener("touchend", handleUserGesture, { passive: true });
    window.addEventListener("keydown", handleUserGesture);

    return () => {
      window.removeEventListener("click", handleUserGesture);
      window.removeEventListener("touchend", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
    };
  }, [enableHaptics, scheduleRemainingTypingPattern, waitForUserInteractionToStart]);

  useEffect(() => {
    setCanStartTyping(!enableHaptics || !waitForUserInteractionToStart);
  }, [enableHaptics, waitForUserInteractionToStart]);

  useEffect(() => {
    completionHapticPlayedRef.current = false;
    lastTypingHapticAtRef.current = 0;
    typingSequenceQueuedRef.current = false;
    currentIndexRef.current = 0;
    isCompleteRef.current = false;
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
