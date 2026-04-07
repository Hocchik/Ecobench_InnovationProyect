// src/api/AuthService.ts
import axios from "./axios";
import { BackendLoginResponse, LoginCredentials, LoginResponse } from "./types";

class AuthService {

  /**
   * Mapea el roleName del backend a la ruta de dashboard correspondiente.
   */
  private mapRoleToRoute(roleName: string): string {
    switch (roleName) {
      case 'Supervisor': return '/supervisor/dashboard';
      case 'Técnico': return '/tecnico/dashboard';
      case 'Auxiliar': return '/auxiliar/dashboard';
      case 'RecursosHumanos': return '/recursos-humanos/dashboard';
      case 'Gerente': return '/manager/dashboard';
      default: return '/login';
    }
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post<BackendLoginResponse>(
      '/auth/login',
      credentials
    );

    const data = response.data;

    const user: LoginResponse = {
      userId: data.userId,
      employeeId: data.employeeId,
      userCode: data.userCode,
      employeeName: data.employeeName ?? data.userCode,
      areaName: data.areaName ?? '',
      roleName: data.roleName,
      token: data.token,
      mustChangePassword: data.mustChangePassword,
      role: data.roleName as LoginResponse['role'],
      roleRoute: this.mapRoleToRoute(data.roleName),
    };

    // Guardar en localStorage
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  }

  async logout(): Promise<void> {
    try {
      const user = this.getCurrentUser();
      if (user?.token) {
        await axios.post('/auth/logout', null, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      }
    } catch {
      // Si falla el logout en backend, igual limpiamos localmente
    } finally {
      localStorage.removeItem("user");
    }
  }

  getCurrentUser(): LoginResponse | null {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      return parsed?.userId && parsed?.roleRoute ? parsed : null;
    } catch {
      return null;
    }
  }
}

export default new AuthService();