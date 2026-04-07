// src/api/AuthService.ts
import axios from "axios";
import { LoginCredentials, LoginResponse } from "./types";

const BASE_URL = "http://localhost:8080/api/auth";

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/login`,
      credentials,
      { withCredentials: true }
    );

    const user = response.data;

    // Guardar en localStorage
    if (user && user.id && user.roleRoute) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  }

  async logout(): Promise<void> {
    await axios.post(`${BASE_URL}/logout`, null, {
      withCredentials: true,
    });

    // Eliminar del localStorage
    localStorage.removeItem("user");
  }

  getCurrentUser(): LoginResponse | null {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      return parsed?.id && parsed?.roleRoute ? parsed : null;
    } catch {
      return null;
    }
  }
}

export default new AuthService();