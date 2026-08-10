import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    // Admin credentials come from environment variables so that no secret is
  // committed to version control. Copy `.env.example` to `.env` and set them
  // before running `npm run dev` / `npm run build`.
  //
  // NOTE: this is a static site (no backend), so these values are still
  // present in the emitted bundle. They act as a basic gate, NOT real
  // authentication. For production access control use a server-side
  // authentication layer.
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "";
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "";

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      // Credentials not configured via env — login stays disabled.
      return false;
    }
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setUser({ name: "Muhammad Jumah", email: ADMIN_EMAIL });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
