import { createContext, useContext } from "react";
import { DataApiProvider } from "./DataContext";
import { TechActivityProvider, useTechActivity } from "../pages/technician/activities/context/TechActivityContext";
import { TechClientsProvider, useTechClients } from "../pages/technician/clients/context/TechClientContext";
import { TechDashboardProvider, useTechDashboard } from "../pages/technician/dashboard/context/TechDashboardContext";
import { TechToolsProvider, useTechTools } from "../pages/technician/tools/context/TechToolsContext";
import { TechTicketsProvider } from "../pages/technician/mytickets/context/TechTicketsContext";
/* import { TechMyExpensesProvider, useTechMyExpenses } from "../pages/technician/myexpenses/context/TechMyExpensesContext";
 */
const TechContext = createContext<any>(null);

export const TechProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataApiProvider>
      <TechActivityProvider>
        <TechClientsProvider>
          <TechDashboardProvider>
            <TechToolsProvider>
            <TechTicketsProvider>
              {/* <TechMyExpensesProvider> */}

              <InternalTechProvider>{children}</InternalTechProvider>
            
{/*             </TechMyExpensesProvider> */}
            </TechTicketsProvider>
            </TechToolsProvider>
          </TechDashboardProvider>
        </TechClientsProvider>
      </TechActivityProvider>
    </DataApiProvider>
  );
};

const InternalTechProvider = ({ children }: { children: React.ReactNode }) => {

const activities = useTechActivity();
const clients = useTechClients();
const dashboard = useTechDashboard();
const tools = useTechTools();
/* const myExpenses = useTechMyExpenses(); */

  const value = {
    // Aquí puedes agregar los valores que deseas proporcionar a través del contexto
    activities,
    clients,
    dashboard,
    tools,
    /* myExpenses */
};

  return (
    <TechContext.Provider value={value}>
      {children}
    </TechContext.Provider>
  );
};

export const useTech = () => {
  const context = useContext(TechContext);
  if (!context) throw new Error("useTech debe usarse dentro de TechProvider");
  return context;
};