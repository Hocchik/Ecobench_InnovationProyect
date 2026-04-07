import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import SupDashboardApi from "../api/SupDashboardApi";
import {
  Notification,
  MaintenanceStats,
  TechStatusWork,
} from "../api/SupDashboardInterfaces";
import { CalendarActivity } from "../../activities/api/SupActivityInterfaces";

interface DashboardContextType {
  loading: {
    notifications: boolean;
    maintenanceStats: boolean;
    technicians: boolean;
    calendar: boolean;
  };
  error: string | null;
  notifications: Notification[];
  maintenanceStats: MaintenanceStats | null;
  technicians: TechStatusWork[];
  calendarActivities: CalendarActivity[];
  getNotifications: () => Promise<void>;
  getMaintenanceStats: () => Promise<void>;
  getTechnicians: () => Promise<void>;
  getCalendarActivities: () => Promise<void>;
  clearError: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard debe usarse dentro de un DashboardProvider");
  }
  return context;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [maintenanceStats, setMaintenanceStats] =
    useState<MaintenanceStats | null>(null);
  const [technicians, setTechnicians] = useState<TechStatusWork[]>([]);
  const [calendarActivities, setCalendarActivities] = useState<
    CalendarActivity[]
  >([]);

  const [loading, setLoading] = useState({
    notifications: false,
    maintenanceStats: false,
    technicians: false,
    calendar: false,
  });

  const getNotifications = useCallback(async () => {
    setLoading((prev) => ({ ...prev, notifications: true }));
    try {
      const data = await SupDashboardApi.getNotifications();
      setNotifications(data);
    } catch (err) {
      setError("Error al obtener las notificaciones");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, notifications: false }));
    }
  }, []);

  const getMaintenanceStats = useCallback(async () => {
    setLoading((prev) => ({ ...prev, maintenanceStats: true }));
    try {
      const data = await SupDashboardApi.getMaintenanceStats();
      setMaintenanceStats(data);
    } catch (err) {
      setError("Error al obtener las estadísticas de mantenimiento");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, maintenanceStats: false }));
    }
  }, []);

  const getTechnicians = useCallback(async () => {
    setLoading((prev) => ({ ...prev, technicians: true }));
    try {
      const data = await SupDashboardApi.getTechnicianData();
      setTechnicians(data);
    } catch (err) {
      setError("Error al obtener los datos de técnicos");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, technicians: false }));
    }
  }, []);

  const getCalendarActivities = useCallback(async () => {
    setLoading((prev) => ({ ...prev, calendar: true }));
    try {
      const data = await SupDashboardApi.getCalendarActivities();
      setCalendarActivities(data);
    } catch (err) {
      setError("Error al obtener las actividades del calendario");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, calendar: false }));
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      loading,
      error,
      notifications,
      maintenanceStats,
      technicians,
      calendarActivities,
      getNotifications,
      getMaintenanceStats,
      getTechnicians,
      getCalendarActivities,
      clearError,
    }),
    [
      loading,
      error,
      notifications,
      maintenanceStats,
      technicians,
      calendarActivities,
      getNotifications,
      getMaintenanceStats,
      getTechnicians,
      getCalendarActivities,
      clearError,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};