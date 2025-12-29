import { useCallback } from "react";

/**
 * React hook version of createDebugSetter.
 * Provides a memoized debug wrapper around a state setter.
 *
 * @param label - A descriptive label for the state
 * @param setter - The original state setter function
 * @returns The wrapped setter function (or original in production)
 */

export function useDebugSetter<T>(
  label: string,
  setState: React.Dispatch<React.SetStateAction<T>>
): React.Dispatch<React.SetStateAction<T>> {
  const debugSetter = useCallback(
    (newValue: React.SetStateAction<T>) => {
      // Only log in development
      if (!import.meta.env.PROD) {
        console.groupCollapsed(
          `%c🔄 State Update: ${label}`,
          "color: #2fa; font-weight: bold;"
        );
        console.log("🆕 New value:", newValue);
        console.trace("📍 Update triggered from:");
        console.groupEnd();
      }

      setState(newValue);
    },
    [label, setState]
  );

  // In production, return the original setter (no wrapping overhead)
  // In development, return the debug wrapper
  return import.meta.env.PROD ? setState : debugSetter;
}
