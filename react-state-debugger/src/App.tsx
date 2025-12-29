import './App.css';
import { UseStateExample } from './examples/UseStateExample';
import { UseReducerExample } from './examples/UseReducerExample';
import { ContextExample } from './examples/ContextExample';
import { CustomHookExample } from './examples/CustomHookExample';

function App() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>React State Debugger</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>
          Debug React state updates like a pro (without polluting production)
        </p>
        <p style={{ color: '#888', fontSize: '14px', marginTop: '10px' }}>
          Open your browser console to see debug logs. These logs only appear in development mode.
        </p>
      </header>

      <div style={{ display: 'grid', gap: '20px' }}>
        <UseStateExample />
        <UseReducerExample />
        <ContextExample />
        <CustomHookExample />
      </div>

      <footer style={{ marginTop: '40px', padding: '20px', textAlign: 'center', color: '#666' }}>
        <p>
          All debug utilities automatically disable in production builds (NODE_ENV !== 'development')
        </p>
      </footer>
    </div>
  );
}

export default App;
