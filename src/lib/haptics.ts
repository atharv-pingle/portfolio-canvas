import { WebHaptics, defaultPatterns } from "web-haptics";

type HapticVariant = "default" | "success" | "selection" | "soft";

type ScrollFeedbackOptions = {
  minDistance?: number;
  stepPx?: number;
  settleTolerancePx?: number;
  maxDurationMs?: number;
};

let haptics: WebHaptics | null = null;
let activeScrollFeedbackRaf: number | null = null;

const getHaptics = () => {
  if (typeof window === "undefined") {
    return null;
  }

  if (!haptics) {
    haptics = new WebHaptics();
  }

  return haptics;
};

export const triggerHaptic = (variant: HapticVariant = "default") => {
  const instance = getHaptics();
  if (!instance) {
    return;
  }

  try {
    if (variant === "success") {
      instance.trigger(defaultPatterns.success);
      return;
    }
    if (variant === "selection") {
      instance.trigger(defaultPatterns.selection);
      return;
    }
    if (variant === "soft") {
      instance.trigger(defaultPatterns.soft);
      return;
    }
    instance.trigger();
  } catch {
    // Ignore unsupported browsers/devices.
  }
};

const cancelActiveScrollFeedback = () => {
  if (activeScrollFeedbackRaf !== null && typeof window !== "undefined") {
    window.cancelAnimationFrame(activeScrollFeedbackRaf);
    activeScrollFeedbackRaf = null;
  }
};

export const scrollElementIntoViewWithHaptics = (
  element: HTMLElement,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" },
  feedbackOptions: ScrollFeedbackOptions = {},
) => {
  if (typeof window === "undefined") {
    element.scrollIntoView(options);
    return;
  }

  const {
    minDistance = 160,
    stepPx = 180,
    settleTolerancePx = 6,
    maxDurationMs = 2400,
  } = feedbackOptions;

  const startY = window.scrollY;
  const targetY = Math.max(0, element.getBoundingClientRect().top + window.scrollY);
  const distance = Math.abs(targetY - startY);

  cancelActiveScrollFeedback();
  triggerHaptic("selection");
  element.scrollIntoView(options);

  if (distance < minDistance) {
    return;
  }

  let lastY = window.scrollY;
  let lastPulseY = window.scrollY;
  let stillFrames = 0;
  let hasMoved = false;
  const startTime = performance.now();

  const tick = () => {
    const currentY = window.scrollY;
    const movedThisFrame = Math.abs(currentY - lastY);
    const distanceToTarget = Math.abs(targetY - currentY);
    const movedSincePulse = Math.abs(currentY - lastPulseY);
    const elapsed = performance.now() - startTime;

    if (movedSincePulse >= stepPx) {
      triggerHaptic("selection");
      lastPulseY = currentY;
    }

    if (movedThisFrame < 0.5) {
      stillFrames += 1;
    } else {
      hasMoved = true;
      stillFrames = 0;
    }

    const reachedTarget = distanceToTarget <= settleTolerancePx;
    const timedOut = elapsed >= maxDurationMs;
    const settledAfterScroll = hasMoved && stillFrames >= 6;

    if (reachedTarget || timedOut || settledAfterScroll) {
      triggerHaptic("soft");
      activeScrollFeedbackRaf = null;
      return;
    }

    lastY = currentY;
    activeScrollFeedbackRaf = window.requestAnimationFrame(tick);
  };

  activeScrollFeedbackRaf = window.requestAnimationFrame(tick);
};
