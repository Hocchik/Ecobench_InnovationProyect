import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  ToolPosesion,
  ToolRequestGET,
  ToolRequestItemPOST,
  ToolRequestPOST
} from '../data/interface/toolinterfaces';
import TechToolsApi from '../api/TechToolsApi';
import { useAuth } from '../../../../contexts/AuthContext';

interface TechToolsContextProps {
  itemsInventory: ToolRequestItemPOST[];
  tools: ToolPosesion[];
  charges: ToolRequestGET[];
  refreshTools: () => Promise<void>;
  refreshCharges: () => Promise<void>;
  refreshItemsInventory: () => Promise<void>;
  createToolRequest: (request: ToolRequestPOST) => Promise<void>;
}

export const TechToolsContext = createContext<TechToolsContextProps>({
  itemsInventory: [],
  tools: [],
  charges: [],
  refreshTools: async () => {},
  refreshCharges: async () => {},
  refreshItemsInventory: async () => {},
  createToolRequest: async () => {}
});

export const TechToolsProvider = ({ children }: { children: ReactNode }) => {
  const [tools, setTools] = useState<ToolPosesion[]>([]);
  const [charges, setCharges] = useState<ToolRequestGET[]>([]);
  const [itemsInventory, setItemsInventory] = useState<ToolRequestItemPOST[]>([]);
  const { user } = useAuth();
  const userr = JSON.parse(localStorage.getItem("user") ?? "{}");
  const id_employee = user?.id || userr?.id || "";

  const refreshItemsInventory = async () => {
    const data = await TechToolsApi.getItems();
    setItemsInventory(data);
  }

  const refreshTools = async () => {
    const data = await TechToolsApi.getTools(id_employee);
    setTools(data);
  };

  const refreshCharges = async () => {
    const data = await TechToolsApi.getCharges(id_employee);
    setCharges(data);
  };

  const createToolRequest = async (request: ToolRequestPOST): Promise<void> => {
    const result = await TechToolsApi.sendToolRequest(request);
    if (result.success) {
      await refreshCharges();
    }
  };

  useEffect(() => {
    refreshTools();
    refreshCharges();
    refreshItemsInventory();
  }, []);

  return (
    <TechToolsContext.Provider
      value={{
        itemsInventory,
        tools,
        charges,
        refreshTools,
        refreshCharges,
        refreshItemsInventory,
        createToolRequest
      }}
    >
      {children}
    </TechToolsContext.Provider>
  );
};

export const useTechTools = () => useContext(TechToolsContext);