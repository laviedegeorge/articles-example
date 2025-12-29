import { createContext, useContext, useState, type ReactNode } from "react";
import { createDebugSetter } from "../utils/createDebugSetter";

interface User {
  name: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserOriginal] = useState<User | null>(null);

  // Wrap setter with debug functionality
  const setUser = createDebugSetter(
    "UserContext",
    setUserOriginal
  ) as React.Dispatch<React.SetStateAction<User | null>>;

  const login = (name: string, email: string) => {
    setUser({
      name,
      email,
      role: "user",
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function ContextExample() {
  return (
    <UserProvider>
      <ContextExampleContent />
    </UserProvider>
  );
}

function ContextExampleContent() {
  const { user, login, logout } = useUser();

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>Context Provider Example</h2>
      <p>Open the console to see debug logs when context state changes.</p>

      <div style={{ marginTop: "15px" }}>
        {user ? (
          <div>
            <p>
              <strong>Logged in as:</strong>
            </p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button onClick={logout} style={{ marginTop: "10px" }}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <p>Not logged in</p>
            <button onClick={() => login("John Doe", "john@example.com")}>
              Login as John Doe
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
