import React, {
  createContext,
  useContext,
  useState,
  useCallback
} from "react";
import SupAttendanceApi from "../api/SupAttendanceApi";
import {
  DayAttendance,
  HistoryAttendanceTech,
  UpdateAttendance,
  CreateAttendance // 👈 Asegúrate de importar esta interfaz
} from "../api/SupAttendanceInterfaces";

interface SupAttendanceContextType {
  loading: boolean;
  error: string | null;
  dayAttendances: DayAttendance[];
  technicianHistory: HistoryAttendanceTech[];

  getAttendancesByDate: (date: string) => Promise<void>;
  getAttendanceHistory: (
    technicianId: string,
    month: number,
    year: number
  ) => Promise<void>;
  getAttendancesByTechnician: (technicianId: string) => Promise<void>;
  updateAttendance: (id: string, data: UpdateAttendance, date: string) => Promise<void>;
  createAttendance: (data: CreateAttendance) => Promise<void>; // ✅ Nuevo método
  clearError: () => void;
}

const SupAttendanceContext = createContext<SupAttendanceContextType | undefined>(undefined);

export const useSupAttendance = () => {
  const context = useContext(SupAttendanceContext);
  if (!context) {
    throw new Error("useSupAttendance debe ser usado dentro de un SupAttendanceProvider");
  }
  return context;
};

interface SupAttendanceProviderProps {
  children: React.ReactNode;
}

export const SupAttendanceProvider: React.FC<SupAttendanceProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dayAttendances, setDayAttendances] = useState<DayAttendance[]>([]);
  const [technicianHistory, setTechnicianHistory] = useState<HistoryAttendanceTech[]>([]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getAttendancesByDate = useCallback(async (date: string) => {
    setLoading(true);
    try {
      const data = await SupAttendanceApi.getAttendancesByDate(date);
      setDayAttendances(data);
    } catch (err) {
      setError("Error al obtener asistencias por fecha");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAttendanceHistory = useCallback(
    async (technicianId: string, month: number, year: number) => {
      setLoading(true);
      try {
        const data = await SupAttendanceApi.getAttendanceHistory(technicianId, month, year);
        setTechnicianHistory(data);
      } catch (err) {
        setError("Error al obtener historial de asistencia");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getAttendancesByTechnician = useCallback(async (technicianId: string) => {
    setLoading(true);
    try {
      const data = await SupAttendanceApi.getAttendancesByTechnician(technicianId);
      setTechnicianHistory(data);
    } catch (err) {
      setError("Error al obtener asistencias del técnico");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAttendance = useCallback(
    async (id: string, data: UpdateAttendance, date: string) => {
      setLoading(true);
      try {
        await SupAttendanceApi.updateAttendance(id, data);
        await getAttendancesByDate(date);
      } catch (err) {
        setError("Error al actualizar asistencia");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [getAttendancesByDate]
  );

  const createAttendance = useCallback(
    async (data: CreateAttendance) => {
      setLoading(true);
      try {
        await SupAttendanceApi.createAttendance(data);
      } catch (err) {
        setError("Error al crear asistencia");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const value: SupAttendanceContextType = {
    loading,
    error,
    dayAttendances,
    technicianHistory,
    getAttendancesByDate,
    getAttendanceHistory,
    getAttendancesByTechnician,
    updateAttendance,
    createAttendance, // ✅ expuesto aquí
    clearError
  };

  return (
    <SupAttendanceContext.Provider value={value}>
      {children}
    </SupAttendanceContext.Provider>
  );
};