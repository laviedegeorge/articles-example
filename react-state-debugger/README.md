# React State Debugger

A clean and safe method to trace React state changes, understand their sources, and keep production untouched.

## Overview

This project demonstrates how to debug React state updates like a pro without polluting production code. It includes utility functions that wrap state setters to log:

- The label of the state
- The new value
- Previous value (optional)
- A complete stack trace showing exactly where the update originated

**Best of all:** It automatically disables itself in production using `NODE_ENV`, so there's zero impact on your live app.

## Features

- ✅ Works with `useState`
- ✅ Works with `useReducer`
- ✅ Works with Context providers
- ✅ Works with custom hooks
- ✅ Automatically disabled in production
- ✅ Provides stack traces for debugging
- ✅ Shows previous → new value comparisons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser console to see debug logs when interacting with the examples.

### Build

```bash
npm run build
```

In production builds, all debug utilities are automatically disabled.

## Usage

### 1. Using `createDebugSetter` (Utility Function)

```typescript
import { useState } from 'react';
import { createDebugSetter } from './utils/createDebugSetter';

function MyComponent() {
  const [count, setCountOriginal] = useState(0);
  
  const setCount = createDebugSetter('Counter', setCountOriginal, () => count);
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### 2. Using `useDebugSetter` (Hook Version)

```typescript
import { useState } from 'react';
import { useDebugSetter } from './hooks/useDebugSetter';

function MyComponent() {
  const [count, setCountOriginal] = useState(0);
  
  const setCount = useDebugSetter('Counter', setCountOriginal, () => count);
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### 3. With Context Providers

```typescript
import { createContext, useContext, useState } from 'react';
import { createDebugSetter } from './utils/createDebugSetter';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUserOriginal] = useState(null);
  const setUser = createDebugSetter('UserContext', setUserOriginal, () => user);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
```

### 4. With useReducer

```typescript
import { useReducer } from 'react';
import { createDebugSetter } from './utils/createDebugSetter';

function MyComponent() {
  const [state, dispatchOriginal] = useReducer(reducer, initialState);
  const dispatch = createDebugSetter('MyReducer', dispatchOriginal, () => state);
  
  return <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>;
}
```

## Examples

This project includes four working examples:

1. **useState Example** - Demonstrates debugging local component state
2. **useReducer Example** - Shows how to debug reducer actions
3. **Context Example** - Illustrates debugging context state changes
4. **Custom Hook Example** - Demonstrates debugging state within custom hooks

## Testing Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn package manager
- A modern web browser with DevTools support (Chrome, Firefox, Edge, Safari)

### Initial Setup

1. **Navigate to the project directory:**
   ```bash
   cd react-state-debugger
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The terminal will display a local URL (typically `http://localhost:5173`)
   - Open this URL in your browser
   - **Important:** Open your browser's Developer Tools (F12 or Cmd+Option+I) and navigate to the Console tab

### Testing Each Example

#### 1. useState Example

**What to Test:**
- Debug logs for local component state updates
- Multiple state variables in the same component

**Steps:**
1. Locate the "useState Example" section on the page
2. Click the "Increment" button
3. **Check Console:** You should see a collapsed log group labeled `🔄 [Counter] State Update`
   - Expand it to see:
     - The new value (incremented count)
     - A stack trace showing where the update was triggered
4. Click "Decrement" to see another debug log
5. Click "Toggle Name" to see debug logs for a different state variable (`Name`)

**Expected Console Output:**
```
🔄 [Counter] State Update
  🆕 New value: 1
  📍 Update triggered from: [stack trace]
```

**What to Verify:**
- ✅ Debug logs appear for both `Counter` and `Name` state updates
- ✅ Stack traces show the exact function that triggered the update
- ✅ Values match what's displayed in the UI

#### 2. useReducer Example

**What to Test:**
- Debug logs for reducer actions/dispatches
- Different action types being logged

**Steps:**
1. Locate the "useReducer Example" section
2. Click "Increment (+1)" button
3. **Check Console:** Look for `🔄 [CounterReducer] State Update` log
   - The new value will be the action object: `{ type: "increment" }`
4. Click "Decrement (-1)" to see another action logged
5. Click "Reset" to see the reset action
6. Click "Toggle Step" to change the step value and see the `setStep` action

**Expected Console Output:**
```
🔄 [CounterReducer] State Update
  🆕 New value: { type: "increment" }
  📍 Update triggered from: [stack trace]
```

**What to Verify:**
- ✅ All action types are logged correctly
- ✅ Stack traces point to the button click handlers
- ✅ The reducer still functions correctly (count changes as expected)

#### 3. Context Example

**What to Test:**
- Debug logs for context state changes
- State updates from child components

**Steps:**
1. Locate the "Context Provider Example" section
2. Click "Login as John Doe"
3. **Check Console:** Look for `🔄 [UserContext] State Update` log
   - The new value should be the user object: `{ name: "John Doe", email: "john@example.com", role: "user" }`
   - Expand the stack trace to see it originated from the `login` function
4. Click "Logout"
5. **Check Console:** Another log should appear with `null` as the new value

**Expected Console Output:**
```
🔄 [UserContext] State Update
  🆕 New value: { name: "John Doe", email: "john@example.com", role: "user" }
  📍 Update triggered from: [stack trace showing login function]
```

**What to Verify:**
- ✅ Context state changes are logged with the correct label
- ✅ Stack traces show the context provider as the source
- ✅ User information displays correctly in the UI

#### 4. Custom Hook Example

**What to Test:**
- Debug logs for state managed within custom hooks
- Multiple state variables within a single hook

**Steps:**
1. Locate the "Custom Hook Example" section
2. Click "Start" button
3. **Check Console:** You should see logs for `Timer.isRunning` state update
   - The new value should be `true`
4. Watch the timer count up - you'll see periodic logs for `Timer.seconds` updates
5. Click "Stop" to see `Timer.isRunning` change to `false`
6. Click "Reset" to see both `Timer.seconds` and `Timer.isRunning` update

**Expected Console Output:**
```
🔄 [Timer.isRunning] State Update
  🆕 New value: true
  📍 Update triggered from: [stack trace]

🔄 [Timer.seconds] State Update
  🆕 New value: 1
  📍 Update triggered from: [stack trace]
```

**What to Verify:**
- ✅ Both state variables (`seconds` and `isRunning`) are logged separately
- ✅ Timer functionality works correctly
- ✅ Stack traces show the interval callback and button handlers

### Testing Production Build

**Purpose:** Verify that debug utilities are automatically disabled in production builds.

**Steps:**
1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Preview the production build:**
   ```bash
   npm run preview
   ```

3. **Test in browser:**
   - Open the preview URL in your browser
   - Open Developer Tools Console
   - Interact with all examples (click buttons, trigger state changes)

4. **Verify:**
   - ✅ **No debug logs should appear** in the console
   - ✅ All functionality still works correctly (buttons work, state updates)
   - ✅ The application behaves identically, just without debug logging

**What This Confirms:**
- Debug utilities are properly disabled in production
- No performance overhead from debug code in production builds
- Application functionality is unaffected

### Advanced Testing

#### Testing Stack Traces

1. **Inspect stack traces:**
   - Click on the stack trace link in any console log
   - Verify it points to the correct function/file
   - Check that it shows the call chain leading to the state update

2. **Test with multiple updates:**
   - Rapidly click buttons to trigger multiple state updates
   - Verify each update is logged separately
   - Check that stack traces remain accurate

#### Testing Edge Cases

1. **Function updaters:**
   - Modify examples to use function updaters: `setCount(prev => prev + 1)`
   - Verify debug logs still work correctly

2. **Complex state objects:**
   - Test with nested objects and arrays
   - Verify the console displays them correctly

3. **Multiple components:**
   - Create multiple instances of components using the same debug setter
   - Verify logs are distinguishable (labels help here)

### Troubleshooting

**Issue: No debug logs appearing**
- ✅ Ensure you're running in development mode (`npm run dev`)
- ✅ Check that `NODE_ENV` is not set to `production`
- ✅ Verify browser console is open and not filtered
- ✅ Check that console logs aren't being filtered out

**Issue: Stack traces not showing**
- ✅ Some browsers may require clicking the stack trace to expand it
- ✅ Ensure your browser DevTools supports `console.trace()`

**Issue: Production build still shows logs**
- ✅ Verify `import.meta.env.PROD` is correctly set during build
- ✅ Check that you're actually running the production build (`npm run preview`)
- ✅ Clear browser cache and hard refresh

### Verification Checklist

Before considering testing complete, verify:

- [ ] All four examples display debug logs in development
- [ ] Stack traces are accurate and helpful
- [ ] Production build shows no debug logs
- [ ] All functionality works in both development and production
- [ ] Console logs are properly formatted and readable
- [ ] Multiple rapid updates are handled correctly
- [ ] Different state types (primitives, objects, arrays) log correctly

## Best Practices

- ✔ Use clear labels: Name your debug setter after the component or context
- ✔ Use it only during development: Keep it wrapped behind NODE_ENV
- ✔ Combine with React DevTools: The helper indicates who caused the update; DevTools reveal what re-rendered
- ✔ Use the optional getter for richer logs: Viewing previous → new values accelerates debugging
- ✔ Add it to shared utilities: Place it in a `utils` folder so any team member can access it

## Things to Avoid

- ✘ Avoid using debug setters in production builds (they're automatically disabled, but don't rely on them)
- ✘ Do not wrap setter functions conditionally within components (perform wrapping outside renders)
- ✘ Do not rely on it to replace proper state architecture (this tool helps identify issues, but doesn't fix poor state design)
- ✘ Do not depend solely on console logs (use it as part of a broader debugging workflow)

## Project Structure

```
react-state-debugger/
├── src/
│   ├── utils/
│   │   └── createDebugSetter.ts    # Core utility function
│   ├── hooks/
│   │   └── useDebugSetter.ts       # React hook version
│   ├── examples/
│   │   ├── UseStateExample.tsx     # useState example
│   │   ├── UseReducerExample.tsx   # useReducer example
│   │   ├── ContextExample.tsx      # Context example
│   │   └── CustomHookExample.tsx   # Custom hook example
│   ├── App.tsx                     # Main app component
│   └── main.tsx                    # Entry point
└── package.json
```

## License

MIT
