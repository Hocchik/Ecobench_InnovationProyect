import React, { createContext, useContext, useEffect, useState } from "react";
import {
  InventoryItem,
  ToolRequestGET,
  ToolRequestPOST,
  ToolRequestPUT,
} from "../api/SupInventoryInterfaces";
import SupInventoryApi from "../api/SupInventoryApi";

interface SupInventoryContextProps {
  inventoryItems: InventoryItem[];
  toolRequests: ToolRequestGET[];
  loading: boolean;
  fetchInventory: () => Promise<void>;
  fetchToolRequests: () => Promise<void>;
  createToolRequest: (toolRequest: ToolRequestPOST) => Promise<string>;
  updateToolRequest: (toolRequest: ToolRequestPUT) => Promise<ToolRequestPUT>;
  deleteToolRequest: (id: string) => Promise<string>;
}

const SupInventoryContext = createContext<SupInventoryContextProps | undefined>(undefined);

export const SupInventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [toolRequests, setToolRequests] = useState<ToolRequestGET[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const items = await SupInventoryApi.getInventoryItems();
      setInventoryItems(items);
    } finally {
      setLoading(false);
    }
  };

  const fetchToolRequests = async () => {
    setLoading(true);
    try {
      const requests = await SupInventoryApi.getAllRequests();
      setToolRequests(requests);
    } finally {
      setLoading(false);
    }
  };

  const createToolRequest = async (toolRequest: ToolRequestPOST) => {
    const result = await SupInventoryApi.createToolRequest(toolRequest);
    await fetchToolRequests();
    return result;
  };

  const updateToolRequest = async (toolRequest: ToolRequestPUT) => {
    const result = await SupInventoryApi.updateToolRequest(toolRequest);
    await fetchToolRequests();
    return result;
  };

  const deleteToolRequest = async (id: string) => {
    const result = await SupInventoryApi.deleteRequest(id);
    await fetchToolRequests();
    return result;
  };

  useEffect(() => {
    fetchInventory();
    fetchToolRequests();
  }, []);

  return (
    <SupInventoryContext.Provider
      value={{
        inventoryItems,
        toolRequests,
        loading,
        fetchInventory,
        fetchToolRequests,
        createToolRequest,
        updateToolRequest,
        deleteToolRequest,
      }}
    >
      {children}
    </SupInventoryContext.Provider>
  );
};

export const useSupInventory = () => {
  const context = useContext(SupInventoryContext);
  if (!context) {
    throw new Error("useSupInventory must be used within a SupInventoryProvider");
  }
  return context;
};