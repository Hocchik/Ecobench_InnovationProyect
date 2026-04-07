// src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import AuthService from "../api/AuthService";
import { LoginCredentials, LoginResponse } from "../api/types";

type AuthContextType = {
  user: LoginResponse | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await AuthService.login(credentials);
    setUser(response); // ya está guardado en localStorage desde AuthService
  };

  const logout = () => {
    setUser(null);
    AuthService.logout();
    /* localStorage.removeItem("user"); */
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
