import React, { createContext, useContext, useEffect, useState } from "react";
import SupMaintenanceApi from "../api/SupMaintenanceApi";
import {
  MainCorrective,
  MainPreventive,
  CreateMainPreventive,
  CreateMainCorrective,
  UpdateMainPreventive,
  UpdateMainCorrective
} from "../api/SupMaintenanceInterfaces"; // ← Import correcto

type UUID = string;

interface MaintenanceSupervisorContextProps {
  preventives: MainPreventive[];
  correctives: MainCorrective[];
  loading: boolean;
  reload: () => void;
  createMaintenancePreventive: (maintenance: CreateMainPreventive) => Promise<boolean>;
  createMaintenanceCorrective: (maintenance: CreateMainCorrective) => Promise<boolean>;
  updateMaintenancePreventive: (maintenance: UpdateMainPreventive) => Promise<boolean>;
  updateMaintenanceCorrective: (maintenance: UpdateMainCorrective) => Promise<boolean>;
  deleteMaintenance: (type: "preventive" | "corrective", id: UUID) => Promise<boolean>;
}

const MaintenanceSupervisorContext = createContext<MaintenanceSupervisorContextProps | undefined>(undefined);

export const MaintenanceSupervisorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preventives, setPreventives] = useState<MainPreventive[]>([]);
  const [correctives, setCorrectives] = useState<MainCorrective[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [preventiveData, correctiveData] = await Promise.all([
        SupMaintenanceApi.getMainPreventives(),
        SupMaintenanceApi.getMainCorrectives()
      ]);
      setPreventives(preventiveData);
      setCorrectives(correctiveData);
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createMaintenancePreventive = async (maintenance: CreateMainPreventive): Promise<boolean> => {
    return await SupMaintenanceApi.createMaintenancePreventive(maintenance);
  };

  const createMaintenanceCorrective = async (maintenance: CreateMainCorrective): Promise<boolean> => {
    return await SupMaintenanceApi.createMaintenanceCorrective(maintenance);
  };

  const updateMaintenancePreventive = async (maintenance: UpdateMainPreventive): Promise<boolean> => {
    return await SupMaintenanceApi.updateMaintenancePreventive(maintenance);
  };

  const updateMaintenanceCorrective = async (maintenance: UpdateMainCorrective): Promise<boolean> => {
    return await SupMaintenanceApi.updateMaintenanceCorrective(maintenance);
  };

  const deleteMaintenance = async (type: "preventive" | "corrective", id: UUID): Promise<boolean> => {
    return await SupMaintenanceApi.deleteMaintenance(type, id);
  };

  return (
    <MaintenanceSupervisorContext.Provider
      value={{
        preventives,
        correctives,
        loading,
        reload: fetchData,
        createMaintenancePreventive,
        createMaintenanceCorrective,
        updateMaintenancePreventive,
        updateMaintenanceCorrective,
        deleteMaintenance
      }}
    >
      {children}
    </MaintenanceSupervisorContext.Provider>
  );
};

export const useMaintenanceSupervisor = () => {
  const context = useContext(MaintenanceSupervisorContext);
  if (!context) {
    throw new Error("useMaintenanceSupervisor must be used within a MaintenanceSupervisorProvider");
  }
  return context;
};