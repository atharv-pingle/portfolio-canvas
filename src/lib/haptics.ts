import { WebHaptics, defaultPatterns } from "web-haptics";

type HapticVariant = "default" | "success";

let haptics: WebHaptics | null = null;

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
    instance.trigger();
  } catch {
    // Ignore unsupported browsers/devices.
  }
};
