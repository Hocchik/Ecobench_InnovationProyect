import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Client } from "../data/interface/clientinterfaces";
import TechClientApi from "../api/TechClientApi";
import { useAuth } from "../../../../contexts/AuthContext";

interface ClientsContextProps {
  clients: Client[];
  refreshClients: () => Promise<void>;
}

export const TechClientsContext = createContext<ClientsContextProps>({
  clients: [],
  refreshClients: async () => {},
});

export const TechClientsProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);

  const {user} = useAuth();
  const userr = JSON.parse(localStorage.getItem("user") ?? "{}");
  const id_employee = user?.id || userr?.id || "";

  const refreshClients = async () => {
    const data = await TechClientApi.getClients(id_employee);
    setClients(data);
  };

  useEffect(() => {
    refreshClients();
  }, []);

  return (
    <TechClientsContext.Provider value={{ clients, refreshClients }}>
      {children}
    </TechClientsContext.Provider>
  );
};

export const useTechClients = () => useContext(TechClientsContext);