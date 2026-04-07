import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import UserDataService from "../../api/UserData"; // Ajusta la ruta según tu estructura

interface Supervisor {
  id: number;
  name: string;
}

interface UserDataContextProps {
  supervisors: Supervisor[];
  refreshSupervisors: () => Promise<void>;
}

const UserDataContext = createContext<UserDataContextProps | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

  const fetchSupervisors = async () => {
    try {
      const data = await UserDataService.getSupervisors();
      setSupervisors(data);
    } catch (error) {
      console.error("Error al cargar supervisores:", error);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, []);

  return (
    <UserDataContext.Provider value={{ supervisors, refreshSupervisors: fetchSupervisors }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserDataContextProps => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData debe usarse dentro de un UserDataProvider");
  }
  return context;
};