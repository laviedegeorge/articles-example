import { useReducer } from "react";
import { createDebugSetter } from "../utils/createDebugSetter";

interface CounterState {
  count: number;
  step: number;
}

type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "setStep"; step: number };

function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "reset":
      return { ...state, count: 0 };
    case "setStep":
      return { ...state, step: action.step };
    default:
      return state;
  }
}

export function UseReducerExample() {
  const [state, dispatchOriginal] = useReducer(counterReducer, {
    count: 0,
    step: 1,
  });

  // Wrap dispatch with debug functionality
  const dispatch = createDebugSetter("CounterReducer", dispatchOriginal);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>useReducer Example</h2>
      <p>Open the console to see debug logs for reducer actions.</p>

      <div style={{ marginTop: "15px" }}>
        <p>
          Count: <strong>{state.count}</strong>
        </p>
        <p>
          Step: <strong>{state.step}</strong>
        </p>

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => dispatch({ type: "increment" })}
            style={{ marginRight: "10px" }}
          >
            Increment (+{state.step})
          </button>
          <button
            onClick={() => dispatch({ type: "decrement" })}
            style={{ marginRight: "10px" }}
          >
            Decrement (-{state.step})
          </button>
          <button
            onClick={() => dispatch({ type: "reset" })}
            style={{ marginRight: "10px" }}
          >
            Reset
          </button>
          <button
            onClick={() =>
              dispatch({ type: "setStep", step: state.step === 1 ? 5 : 1 })
            }
          >
            Toggle Step ({state.step === 1 ? "1→5" : "5→1"})
          </button>
        </div>
      </div>
    </div>
  );
}
