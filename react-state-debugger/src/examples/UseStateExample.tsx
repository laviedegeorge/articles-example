import { useState } from "react";
import { useDebugSetter } from "../hooks/useDebugSetter";

export function UseStateExample() {
  const [count, setCountOriginal] = useState(0);
  const [name, setNameOriginal] = useState("React");

  // Wrap setters with debug functionality
  const setCount = useDebugSetter("Counter", setCountOriginal);
  const setName = useDebugSetter("Name", setNameOriginal);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleNameChange = () => {
    setName(name === "React" ? "Vite" : "React");
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>useState Example</h2>
      <p>Open the console to see debug logs when state changes.</p>

      <div style={{ marginTop: "15px" }}>
        <p>
          Count: <strong>{count}</strong>
        </p>
        <button onClick={handleIncrement} style={{ marginRight: "10px" }}>
          Increment
        </button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>

      <div style={{ marginTop: "15px" }}>
        <p>
          Name: <strong>{name}</strong>
        </p>
        <button onClick={handleNameChange}>Toggle Name</button>
      </div>
    </div>
  );
}
