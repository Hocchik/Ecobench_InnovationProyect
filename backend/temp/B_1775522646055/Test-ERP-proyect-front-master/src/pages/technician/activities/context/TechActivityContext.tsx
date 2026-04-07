import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ActivityGET } from '../data/interface/activityinterfaces';
import { getActivities, finishActivity } from '../api/TechActivityApi';
import { useAuth } from '../../../../contexts/AuthContext';

interface TechActivityContextProps {
  activities: ActivityGET[];
  currentActivity: ActivityGET | null;
  refreshActivities: () => Promise<void>;
  startActivity: (id_activity: string) => Promise<void>;
  finishCurrentActivity: (file: File) => Promise<void>;
}

export const TechActivityContext = createContext<TechActivityContextProps>({
  activities: [],
  currentActivity: null,
  refreshActivities: async () => {},
  startActivity: async () => {},
  finishCurrentActivity: async () => {},
});

export const TechActivityProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<ActivityGET[]>([]);
  const [currentActivity, setCurrentActivity] = useState<ActivityGET | null>(null);
  const { user } = useAuth();
  const userr = JSON.parse(localStorage.getItem("user") ?? "{}");
  const id_employee = user?.id || userr?.id || "";


  // Cargar actividades al montar
  useEffect(() => {
    refreshActivities();
    // eslint-disable-next-line
  }, []);

  const refreshActivities = async () => {
    const data = await getActivities(id_employee);
    setActivities(data);
    const inProgress = data.find(a => a.status === 'En curso');
    setCurrentActivity(inProgress || null);
  };

  const startActivity = async (id_activity: string) => {
    // Aquí deberías llamar a tu API para cambiar el estado a "En curso"
    // Simulación:
    setActivities(prev =>
      prev.map(a =>
        a.id_activity === id_activity
          ? { ...a, status: 'En curso' }
          : a
      )
    );
    setCurrentActivity(
      activities.find(a => a.id_activity === id_activity) || null
    );
    // Si tienes endpoint real, llama a la API y luego refreshActivities()
    // await apiStartActivity(id_activity);
    // await refreshActivities();
  };

  const finishCurrentActivity = async (file: File) => {
    if (!currentActivity) return;
    await finishActivity({ id_activity: currentActivity.id_activity, image_url: ""});
    await refreshActivities();
  };

  return (
    <TechActivityContext.Provider
      value={{
        activities,
        currentActivity,
        refreshActivities,
        startActivity,
        finishCurrentActivity,
      }}
    >
      {children}
    </TechActivityContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useTechActivity = () => useContext(TechActivityContext);