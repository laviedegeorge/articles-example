/**
 * Creates a debug wrapper around a state setter or dispatcher function.
 * Logs state changes with label, values, and stack trace.
 * Automatically disables in production builds.
 *
 * @param label - A descriptive label for the state (e.g., "UserContext", "Counter")
 * @param setter - The original state setter or dispatcher function
 * @returns The wrapped setter/dispatcher function (or original in production)
 */

// Overload for useState setters
export function createDebugSetter<T>(
  label: string,
  setter: React.Dispatch<React.SetStateAction<T>>
): React.Dispatch<React.SetStateAction<T>>;

// Overload for useReducer dispatchers
export function createDebugSetter<A>(
  label: string,
  setter: React.Dispatch<A>
): React.Dispatch<A>;

export function createDebugSetter(
  label: string,
  setter:
    | React.Dispatch<React.SetStateAction<unknown>>
    | React.Dispatch<unknown>
): React.Dispatch<React.SetStateAction<unknown>> | React.Dispatch<unknown> {
  // In production, return the original setter unchanged
  if (import.meta.env.PROD) {
    return setter;
  }

  // Create a wrapper that logs before calling the original setter
  return (value: React.SetStateAction<unknown> | unknown) => {
    // Log the state change
    console.groupCollapsed(
      `%c🔄 [${label}] State Update`,
      "color: #adad01; font-weight: bold;"
    );
    console.log("🆕 New value:", value);
    console.trace("📍 Update triggered from:");
    console.groupEnd();

    // Call the original setter
    setter(value);
  };
}
