/* // src/context/ClientContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Client, ClientBasicDTO, Elevator, ElevatorDTO } from "../data/clientsType";
import ClientSupervisorService from "../api/ClientSupervisorService";

type ClientContextType = {
  clients: ClientBasicDTO[];
  fetchClients: () => void;
  selectedClientElevators: ElevatorDTO[];
  fetchClientElevators: (clientId: string) => Promise<void>;
  createElevator: (clientId: string, elevator: Elevator) => Promise<void>;
  updateElevator: (elevatorId: number, elevator: Elevator) => Promise<void>;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<ClientBasicDTO[]>([]);
  const [selectedClientElevators, setSelectedClientElevators] = useState<ElevatorDTO[]>([]);

  const fetchClients = async () => {
    try {
      const data = await ClientSupervisorService.getClients();
      setClients(data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  const fetchClientElevators = async (clientId: string) => {
    try {
      const data = await ClientSupervisorService.getClientElevators(clientId);
      setSelectedClientElevators(data.elevators);
    } catch (error) {
      console.error("Error al obtener los ascensores del cliente:", error);
    }
  };

  const createElevator = async (clientId: string, elevator: Elevator) => {
    try {
      const newElevator = await ClientSupervisorService.createElevator(clientId, elevator);
      setSelectedClientElevators(prev => [...prev, newElevator]);
    }
    catch (error) {
      console.error("Error al crear el elevador:", error);
      throw error;
    }
  }
  
  const updateElevator = async (elevatorId: number, elevator: Elevator) => {
    try {
      const updatedElevator = await ClientSupervisorService.updateElevator(elevatorId, elevator);
      setSelectedClientElevators(prev => 
        prev.map(el => el.id === updatedElevator.id ? updatedElevator : el)
      );
    } catch (error) {
      console.error("Error al actualizar el elevador:", error);
      throw error;
    }
  };


  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientContext.Provider
      value={{
        clients,
        fetchClients,
        selectedClientElevators,
        fetchClientElevators,
        createElevator,
        updateElevator
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) throw new Error("useClientContext debe usarse dentro de ClientProvider");
  return context;
};
 */