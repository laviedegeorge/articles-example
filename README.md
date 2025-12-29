# Articles Example Repository

This repository contains code examples and implementations that accompany various technical articles. Each project demonstrates specific concepts, patterns, or techniques discussed in the corresponding articles.

## 📚 Articles & Projects

### React State Debugger

**Project Location:** `react-state-debugger/`

**Description:** A clean and safe method to trace React state changes, understand their sources, and keep production untouched. This project demonstrates how to debug React state updates like a pro without polluting production code.

**Article URL:** *[Add article URL here]*

**Live Demo URL:** *[HERE](https://react-state-debugger.vercel.app/)*

**Key Features:**
- Works with `useState`, `useReducer`, Context providers, and custom hooks
- Automatically disabled in production using `NODE_ENV`
- Provides stack traces for debugging
- Shows previous → new value comparisons

**Reading Guide:**
- Start with the article to understand the concepts
- Review the code examples in `src/examples/` directory
- Check `src/utils/createDebugSetter.ts` for the core utility function
- Review `src/hooks/useDebugSetter.ts` for the React hook version
- Experiment with the examples in the browser to see debug logs in action

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn package manager

### General Setup

Each project in this repository is self-contained. To get started with any project:

1. Navigate to the project directory
2. Install dependencies using your preferred package manager
3. Follow the project-specific instructions in its README or documentation
4. Run the development server and explore the examples

---

## 📖 Reading & Testing Workflow

### For Each Article:

1. **Read the Article First**
   - Understand the concepts and motivations
   - Note the key techniques being demonstrated
   - Review any code snippets in the article

2. **Explore the Code**
   - Navigate to the corresponding project directory
   - Read through the implementation files
   - Compare the article's code with the actual implementation

3. **Run the Examples**
   - Start the development server
   - Interact with the examples in the browser
   - Open browser DevTools to see console logs and behavior
   - Modify the code to experiment with variations
   - See the project-specific README for detailed testing instructions

---

## 📝 Notes

- All projects in this repository are example implementations
- They are designed for learning and demonstration purposes
- Production-ready implementations may require additional considerations
- Debug utilities are automatically disabled in production builds

---

## 📄 License

Each project may have its own license. Check individual project directories for license information.

