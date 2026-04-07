import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";
import { DashboardActivity } from "../data/interfaces/dashboardinterfaces";
import TechDashboardApi from "../api/TechDashboardApi";
import { finishActivity } from "../../activities/api/TechActivityApi";
import { useAuth } from "../../../../contexts/AuthContext";

type UUID = string;


interface TechDashboardContextProps {
  todayActivities: DashboardActivity[];
  currentActivity: DashboardActivity | null;
  refreshTodayActivities: (id: UUID) => Promise<void>;
  refreshCurrentActivity: (id: UUID) => Promise<void>;
  finishCurrentActivity: (file: File, id_activity: UUID) => Promise<void>;
  handleStatusChange: (
  activity: DashboardActivity,
  newStatus: DashboardActivity['status'],
  file?: File
) => Promise<void>;

}

export const TechDashboardContext = createContext<TechDashboardContextProps>({
  todayActivities: [],
  currentActivity: null,
  refreshTodayActivities: async () => {},
  refreshCurrentActivity: async () => {},
  finishCurrentActivity: async () => {},
  handleStatusChange: async () => {} 
});

interface TechDashboardProviderProps {
  children: ReactNode;
  /* id_employee: string; */
}

export const TechDashboardProvider = ({
  children,
}: TechDashboardProviderProps) => {
  const [todayActivities, setTodayActivities] = useState<DashboardActivity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<DashboardActivity | null>(null);

  const { user } = useAuth();
  const userr = JSON.parse(localStorage.getItem("user") ?? "{}");
  const id_employee = user?.id || userr?.id || "";


  const refreshTodayActivities = async (id: UUID) => {
    /* console.log(id) */
    const data = await TechDashboardApi.getTodayActivities(id);
    setTodayActivities(data);
  };

  const refreshCurrentActivity = async (id: UUID) => {
  /* console.log(id) */
    const data = await TechDashboardApi.getCurrentActivity(id);
    setCurrentActivity(data);
  };

  const handleStatusChange = async (
    activity: DashboardActivity,
    newStatus: DashboardActivity['status'],
    file?: File
  ): Promise<void> => {
    const { id_activity, status: currentStatus } = activity;

    // Validación: Pendiente → En curso
    if (currentStatus === 'Pendiente' && newStatus === 'En curso') {
      if (currentActivity) {
        alert('Ya hay una actividad en curso. Finalízala antes de iniciar otra.');
        return;
      }
      await TechDashboardApi.changeStatusActivity(id_activity, 'En curso');
    }

    // Validación: Finalizado → Pendiente
    else if (currentStatus === 'Finalizado' && newStatus === 'Pendiente') {
      await TechDashboardApi.changeStatusActivity(id_activity, 'Pendiente');
    }

    // Validación: En curso → Finalizado (requiere imagen)
    else if (currentStatus === 'En curso' && newStatus === 'Finalizado') {
      if (!file) {
        alert('Debes adjuntar una imagen para finalizar la actividad.');
        return;
      }
      await TechDashboardApi.changeStatusActivity(id_activity, 'Finalizado');
      await finishCurrentActivity(file, id_activity);
    }

    // Refrescar datos
    /* console.log("id_employee:"+ id_employee) */
    await refreshTodayActivities(id_employee);
    await refreshCurrentActivity(id_employee);
  };

  const finishCurrentActivity = async (file: File, id_activity: UUID) => {
    const result = await finishActivity(id_activity, file);
    if (result.success) {
      await refreshTodayActivities(id_employee);
      await refreshCurrentActivity(id_employee);
    }
  };


  useEffect(() => {
    if (id_employee) {
      refreshTodayActivities(id_employee);
      refreshCurrentActivity(id_employee);
    }
  }, [id_employee]);

  return (
    <TechDashboardContext.Provider
      value={{
        todayActivities,
        currentActivity,
        refreshTodayActivities,
        refreshCurrentActivity,
        finishCurrentActivity,
        handleStatusChange

      }}
    >
      {children}
    </TechDashboardContext.Provider>
  );
};

export const useTechDashboard = () => useContext(TechDashboardContext);