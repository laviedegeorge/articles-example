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
