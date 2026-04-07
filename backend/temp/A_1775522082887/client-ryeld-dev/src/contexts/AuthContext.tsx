// src/context/AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";
import AuthService from "../api/AuthService";
import { LoginCredentials, LoginResponse } from "../api/types";

type AuthContextType = {
  user: LoginResponse | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(() => AuthService.getCurrentUser());

  const login = async (credentials: LoginCredentials) => {
    const response = await AuthService.login(credentials);
    setUser(response);
  };

  const logout = async () => {
    setUser(null);
    await AuthService.logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
