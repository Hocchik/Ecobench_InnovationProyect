import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import SupActivityApi from "../api/SupActivityApi";
import {
  UpdateActivity,
  CalendarActivity,
} from "../api/SupActivityInterfaces";

interface SupActivityContextProps {
  activities: CalendarActivity[];
  loading: boolean;
  reload: () => Promise<void>;
  updateActivity: (activity: UpdateActivity) => Promise<string>; // ← corregido
  registerActivityImage: (id_activity: string, file: File) => Promise<string>;
}


const SupActivityContext = createContext<SupActivityContextProps | undefined>(
  undefined
);

export const SupActivityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activities, setActivities] = useState<CalendarActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await SupActivityApi.getCalendarActivities();
      setActivities(data);
    } catch (error) {
      console.error("Error loading calendar activities:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateActivity = useCallback(
    async (activity: UpdateActivity): Promise<string> => {
      try {
        const message = await SupActivityApi.updateActivity(activity);
        await reload(); // Refresca la lista completa
        return message;
      } catch (error) {
        console.error("Error updating activity:", error);
        throw error;
      }
    },
    [reload]
  );

  const registerActivityImage = useCallback(
    async (id_activity: string, file: File): Promise<string> => {
      try {
        const result = await SupActivityApi.registerActivityImage(id_activity, file);
        setActivities((prev) =>
          prev.map((a) =>
            a.id_activity === id_activity ? { ...a, image_url: result } : a
          )
        );
        return result;
      } catch (error) {
        console.error("Error uploading activity image:", error);
        throw error;
      }
    },
    []
  );

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <SupActivityContext.Provider
      value={{ activities, loading, reload, updateActivity, registerActivityImage }}
    >
      {children}
    </SupActivityContext.Provider>
  );
};

export const useSupActivity = (): SupActivityContextProps => {
  const context = useContext(SupActivityContext);
  if (!context) {
    throw new Error("useSupActivity must be used within a SupActivityProvider");
  }
  return context;
};