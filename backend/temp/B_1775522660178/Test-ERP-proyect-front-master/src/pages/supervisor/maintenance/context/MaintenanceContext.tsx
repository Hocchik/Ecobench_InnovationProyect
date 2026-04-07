// src/context/supervisor/MaintenanceContext.tsx
import { createContext, useContext } from "react";
import MaintenanceSupervisorService from "../api/MaintenanceSupervisorService";

const MaintenanceContext = createContext<any>(null);

export const MaintenanceProvider = ({ children }: { children: React.ReactNode }) => {
  const maintenance = MaintenanceSupervisorService; // Acceder a las funciones del servicio

  return (
    <MaintenanceContext.Provider value={maintenance}>
      {children}
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = () => {
  const context = useContext(MaintenanceContext);
  if (!context) throw new Error("useMaintenance debe usarse dentro de MaintenanceProvider");
  return context;
};