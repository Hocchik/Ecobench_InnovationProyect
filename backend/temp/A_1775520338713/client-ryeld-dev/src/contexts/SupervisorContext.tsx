// src/context/SupervisorContext.tsx
import { createContext, useContext } from "react";
/* import { AttendanceProvider, useAttendance } from "../pages/supervisor/assistance/context/AttendanceContext" */
import { MaintenanceProvider, useMaintenance } from "../pages/supervisor/maintenance/context/MaintenanceContext";
import { DashboardProvider, useDashboard } from "../pages/supervisor/dashboard/context/DashboardContext";
import { UserDataProvider, useUserData } from "./supervisor/DataContext";


import { DataApiProvider } from "./DataContext";
import {MaintenanceSupervisorProvider, useMaintenanceSupervisor} from "../pages/supervisor/maintenance/context/SupMaintenanceContext";
import { SupActivityProvider, useSupActivity } from "../pages/supervisor/activities/context/SupActivityContext";
import { SupClientProvider, useSupClient } from "../pages/supervisor/clients/context/SupClientContext";
import { SupInventoryProvider, useSupInventory } from "../pages/supervisor/inventory/context/SupInventoryContext";
import { ElevatorTechHistoryProvider } from "../pages/supervisor/clients/context/ElevatorTechHistoryContext";
import { useSupAttendance, SupAttendanceProvider } from "../pages/supervisor/assistance/context/SupAttendanceContext";


const SupervisorContext = createContext<any>(null);

export const SupervisorProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataApiProvider>
    <MaintenanceSupervisorProvider>
    <SupActivityProvider>
    <SupClientProvider>
      <ElevatorTechHistoryProvider>
    <SupInventoryProvider>
    <SupAttendanceProvider>


      <UserDataProvider>
        
            
              <MaintenanceProvider>
                <DashboardProvider>
                  
                    <InternalSupervisorProvider>{children}</InternalSupervisorProvider>
                  
                </DashboardProvider>
        </MaintenanceProvider>
      
    </UserDataProvider>

    </SupAttendanceProvider>
    </SupInventoryProvider>
      </ElevatorTechHistoryProvider>
    </SupClientProvider>
    </SupActivityProvider>
    </MaintenanceSupervisorProvider>
    </DataApiProvider>
  );
};

const InternalSupervisorProvider = ({ children }: { children: React.ReactNode }) => {
  const maintenance = useMaintenance();
  const dashboard = useDashboard();
  const userData = useUserData(); // Ahora incluye actividades

  // Se importa el contexto de mantenimiento del supervisor
  const maintenanceSupervisor = useMaintenanceSupervisor();
  const attendanceSupervisor = useSupAttendance();
  const activitySupervisor = useSupActivity();
  const clientSupervisor = useSupClient();
  const inventorySupervisor = useSupInventory();

  const value = {
    maintenance,
    dashboard,
    userData,


    maintenanceSupervisor,
    attendanceSupervisor,
    activitySupervisor,
    clientSupervisor,
    inventorySupervisor
  };

  return (
    <SupervisorContext.Provider value={value}>
      {children}
    </SupervisorContext.Provider>
  );
};

export const useSupervisor = () => {
  const context = useContext(SupervisorContext);
  if (!context) throw new Error("useSupervisor debe usarse dentro de SupervisorProvider");
  return context;
};