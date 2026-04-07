import React, { createContext, useContext, useState, useEffect } from "react";
import SupClientApi from "../api/SupClientApi";
import {
  ClientTable,
  ClientElevators,
  ClientMaintenanceHistory,
  CreateElevator,
  UpdateElevator,
} from "../api/SupClientInterfaces";

type UUID = string;

interface SupClientContextProps {
  clients: ClientTable[];
  clientElevators: ClientElevators | null;
  clientMaintenanceHistory: ClientMaintenanceHistory[];
  setClientMaintenanceHistory: React.Dispatch<React.SetStateAction<ClientMaintenanceHistory[]>>;
  fetchClients: () => Promise<void>;
  fetchClientElevators: (clientId: UUID) => Promise<void>;
  fetchClientMaintenanceHistory: (elevatorId: UUID) => Promise<ClientMaintenanceHistory[]>;
  createElevator: (elevator: CreateElevator) => Promise<string>;
  updateElevator: (elevator: UpdateElevator) => Promise<string>;
  deleteElevator: (id: UUID) => Promise<string>;
}

const SupClientContext = createContext<SupClientContextProps | undefined>(undefined);

export const SupClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<ClientTable[]>([]);
  const [clientElevators, setClientElevators] = useState<ClientElevators | null>(null);
  const [clientMaintenanceHistory, setClientMaintenanceHistory] = useState<ClientMaintenanceHistory[]>([]);

  const fetchClients = async () => {
    const data = await SupClientApi.getClients();
    setClients(data);
  };

  const fetchClientElevators = async (clientId: UUID) => {
    const data = await SupClientApi.getClientElevators(clientId);
    setClientElevators(data);

    if (data.elevators.length > 0) {
      const firstElevatorId = data.elevators[0].id;
      const history = await fetchClientMaintenanceHistory(firstElevatorId);
      setClientMaintenanceHistory(history);
    }
  };

  const fetchClientMaintenanceHistory = async (elevatorId: UUID) => {
    return await SupClientApi.getClientMainHistory(elevatorId);
  };

  const createElevator = async (elevator: CreateElevator): Promise<string> => {
    return await SupClientApi.createElevator(elevator);
  };

  const updateElevator = async (elevator: UpdateElevator): Promise<string> => {
    return await SupClientApi.updateElevator(elevator);
  };

  const deleteElevator = async (id: UUID): Promise<string> => {
    return await SupClientApi.deleteElevator(id);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <SupClientContext.Provider
      value={{
        clients,
        clientElevators,
        clientMaintenanceHistory,
        setClientMaintenanceHistory,
        fetchClients,
        fetchClientElevators,
        fetchClientMaintenanceHistory,
        createElevator,
        updateElevator,
        deleteElevator,
      }}
    >
      {children}
    </SupClientContext.Provider>
  );
};

export const useSupClient = () => {
  const context = useContext(SupClientContext);
  if (!context) {
    throw new Error("useSupClient must be used within a SupClientProvider");
  }
  return context;
};