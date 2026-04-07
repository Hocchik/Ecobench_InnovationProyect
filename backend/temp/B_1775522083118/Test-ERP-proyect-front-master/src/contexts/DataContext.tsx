import React, { createContext, useContext, useEffect, useState } from "react";
import DataApi from "../api/DataApi";
import {
  /* Clients, */
  ElevatorsType,
  MaintenanceType,
  Supervisors,
  Techs
} from "../api/interfaces/DataInterfaces";

// Interfaz del contexto
interface DataApiContextProps {
  techs: Techs[];
  supervisors: Supervisors[];
  maintenanceTypes: MaintenanceType[];
  elevatorTypes: ElevatorsType[];
  elevators: ElevatorsType[]; // ← nuevo campo
  /* clients?: Clients[]; */
  loading: boolean;
  reload: () => void;
}

// Creación del contexto
const DataApiContext = createContext<DataApiContextProps | undefined>(undefined);

// Proveedor del contexto
export const DataApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [techs, setTechs] = useState<Techs[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisors[]>([]);
  const [maintenanceTypes, setMaintenanceTypes] = useState<MaintenanceType[]>([]);
  const [elevatorTypes, setElevatorTypes] = useState<ElevatorsType[]>([]);
  const [elevators, setElevators] = useState<ElevatorsType[]>([]); // ← nuevo estado
  /* const [clients, setClients] = useState<Clients[]>([]); */
  const [loading, setLoading] = useState(true);

  // Función para cargar todos los datos
  const fetchData = async () => {
    setLoading(true);
    const [
      techsData,
      supervisorsData,
      maintenanceTypesData,
      elevatorTypesData,
      elevatorsData,
      /* clientsData */
    ] = await Promise.all([
      DataApi.getTechs(),
      DataApi.getSupervisors(),
      DataApi.getMaintenanceTypes(),
      DataApi.getElevatorTypes(),
      DataApi.getElevators(), // ← nueva llamada
      /* DataApi.getClients() */
    ]);

    setTechs(techsData);
    setSupervisors(supervisorsData);
    setMaintenanceTypes(maintenanceTypesData);
    setElevatorTypes(elevatorTypesData);
    setElevators(elevatorsData); // ← nuevo set
    /* setClients(clientsData); */
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataApiContext.Provider
      value={{
        techs,
        supervisors,
        maintenanceTypes,
        elevatorTypes,
        elevators, // ← nuevo valor expuesto
        /* clients, */
        loading,
        reload: fetchData
      }}
    >
      {children}
    </DataApiContext.Provider>
  );
};

// Hook para consumir el contexto
export const useDataApi = () => {
  const context = useContext(DataApiContext);
  if (!context) throw new Error("useDataApi must be used within a DataApiProvider");
  return context;
};