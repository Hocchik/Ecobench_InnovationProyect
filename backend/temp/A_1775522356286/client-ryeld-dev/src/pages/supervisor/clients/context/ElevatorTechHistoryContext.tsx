import React, { createContext, useContext, useState } from "react";
import SupClientApi from "../api/SupClientApi";
import {
  ElevatorTechHistory,
  EmergencyHistory,
  /* PreventiveMaintenanceHistory, */
  SparePartHistory,
  ElevatorPartLocation,
} from "../api/SupClientInterfaces";

type UUID = string;

interface ElevatorTechHistoryContextProps {
  elevatorTechHistory: ElevatorTechHistory | null;
  fetchElevatorTechHistory: (elevatorId: UUID) => Promise<void>;
  createEmergency: (elevatorId: UUID, data: Omit<EmergencyHistory, "id" | "elevatorId">) => Promise<void>;
  updateEmergency: (emergencyId: UUID, data: EmergencyHistory) => Promise<void>;
  deleteEmergency: (emergencyId: UUID, elevatorId: UUID) => Promise<void>;
  createSparePart: (elevatorId: UUID, data: Omit<SparePartHistory, "id" | "elevatorId">) => Promise<void>;
  updateSparePart: (spareId: UUID, data: SparePartHistory) => Promise<void>;
  deleteSparePart: (spareId: UUID, elevatorId: UUID) => Promise<void>;
  createPartLocation: (elevatorId: UUID, data: Omit<ElevatorPartLocation, "id" | "elevatorId">) => Promise<void>;
  updatePartLocation: (partId: UUID, data: ElevatorPartLocation) => Promise<void>;
  deletePartLocation: (partId: UUID, elevatorId: UUID) => Promise<void>;
}

const ElevatorTechHistoryContext = createContext<ElevatorTechHistoryContextProps>(null!);

export const useElevatorTechHistoryContext = () => useContext(ElevatorTechHistoryContext);

export const ElevatorTechHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elevatorTechHistory, setElevatorTechHistory] = useState<ElevatorTechHistory | null>(null);

  const fetchElevatorTechHistory = async (elevatorId: UUID) => {
    const data = await SupClientApi.getElevatorTechHistory(elevatorId);
    setElevatorTechHistory(data);
  };

  const refresh = async (elevatorId: UUID) => {
    await fetchElevatorTechHistory(elevatorId);
  };

  return (
    <ElevatorTechHistoryContext.Provider
      value={{
        elevatorTechHistory,
        fetchElevatorTechHistory,
        createEmergency: async (id, data) => {
          await SupClientApi.createEmergencyEvent(id, data);
          await refresh(id);
        },
        updateEmergency: async (id, data) => {
          await SupClientApi.updateEmergencyEvent(id, data);
          await refresh(data.elevatorId);
        },
        deleteEmergency: async (id, elevatorId) => {
          await SupClientApi.deleteEmergencyEvent(id);
          await refresh(elevatorId);
        },
        createSparePart: async (id, data) => {
          await SupClientApi.createSparePartChange(id, data);
          await refresh(id);
        },
        updateSparePart: async (id, data) => {
          await SupClientApi.updateSparePartChange(id, data);
          await refresh(data.elevatorId);
        },
        deleteSparePart: async (id, elevatorId) => {
          await SupClientApi.deleteSparePartChange(id);
          await refresh(elevatorId);
        },
        createPartLocation: async (id, data) => {
          await SupClientApi.createPartLocation(id, data);
          await refresh(id);
        },
        updatePartLocation: async (id, data) => {
          await SupClientApi.updatePartLocation(id, data);
          await refresh(data.elevatorId);
        },
        deletePartLocation: async (id, elevatorId) => {
          await SupClientApi.deletePartLocation(id);
          await refresh(elevatorId);
        },
      }}
    >
      {children}
    </ElevatorTechHistoryContext.Provider>
  );
};