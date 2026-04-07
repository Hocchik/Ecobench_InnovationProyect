import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

import Login from './pages/login/Login';
import ProtectedRoute from './pages/login/ProtectedRoute';

// Layouts
import SupervisorLayout from './layouts/SupervisorLayout';
import AuxiliaryLayout from './layouts/AuxiliaryLayout';
import HRLayout from './layouts/HRLayout';
import ManagerLayout from './layouts/ManagerLayout';
import TechnicianLayout from './layouts/TechnicianLayout';

// Supervisor Pages
import SupervisorDashboard from './pages/supervisor/dashboard/Dashboard';
import SupervisorClients from './pages/supervisor/clients/Clients';
import SupervisorActivities from './pages/supervisor/activities/Activities';
import SupervisorInventory from './pages/supervisor/inventory/Inventory';
import SupervisorMaintenance from './pages/supervisor/maintenance/Maintenance';
import SupervisorAssistance from './pages/supervisor/assistance/Attendance';

// Auxiliary Pages
import AuxiliaryDashboard from './pages/auxiliary/dashboard/Dashboard';
import AuxiliaryClients from './pages/auxiliary/clients/Clients';
import AuxiliarySales from './pages/auxiliary/sales/Sales';
import AuxiliaryMobility from './pages/auxiliary/mobility/Mobility';
import AuxiliaryInventory from './pages/auxiliary/inventory/Inventory';
import AuxiliaryMaintenance from './pages/auxiliary/maintenance/Maintenance';

// HR Pages
import HRDashboard from './pages/hr/dashboard/Dashboard';
import HREmployees from './pages/hr/employees/Employees';
import HRSales from './pages/hr/sales/Sales';
import HROutput from './pages/hr/output/Output'; 
import HRClients from './pages/hr/clients/Clients';

// General Manager Pages
import ManagerDashboard from './pages/manager/dashboard/Dashboard';
import ManagerMaintenance from './pages/manager/maintenance/Maintenance';
import ManagerInventory from './pages/manager/inventory/Inventory';
import ManagerClients from './pages/manager/clients/Clients';
import ManagerTechnicians from './pages/manager/technicians/Technicians';
import ManagerStaff from './pages/manager/staff/Staff';
import ManagerCashControl from './pages/manager/cashcontrol/CashControl';

import TechnicianActivities from './pages/technician/activities/Activities';
import TechnicianTools from './pages/technician/tools/Tools';
import TechnicianClients from './pages/technician/clients/Clients';
import TechnicianMyTickets from './pages/technician/mytickets/MyTickets';
import TechnicianMyExpenses from './pages/technician/myexpenses/MyExpenses';
import TechnicianDashboard from './pages/technician/dashboard/Dashboard';

import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { SupervisorProvider } from './contexts/SupervisorContext';
import { TechProvider } from './contexts/TechnicianContext';

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/supervisor",
      element: (
        <ProtectedRoute allowedRole="Supervisor">
          <SupervisorProvider>
          <SupervisorLayout>
            <Outlet />
          </SupervisorLayout>
          </SupervisorProvider>
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <SupervisorDashboard /> },
        { path: "clientes", element: <SupervisorClients /> },
        { path: "actividades", element: <SupervisorActivities /> },
        { path: "inventario", element: <SupervisorInventory /> },
        { path: "mantenimiento", element: <SupervisorMaintenance /> },
        { path: "asistencia", element: <SupervisorAssistance /> }
      ]
    },
    {
      path: "/auxiliar",
      element: (
        <ProtectedRoute allowedRole="Auxiliar">
          <AuxiliaryLayout>
            <Outlet />
          </AuxiliaryLayout>
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <AuxiliaryDashboard /> },
        { path: "clientes", element: <AuxiliaryClients /> },
        { path: "ventas", element: <AuxiliarySales /> },
        { path: "movilidad", element: <AuxiliaryMobility /> },
        { path: "inventario", element: <AuxiliaryInventory /> },
        { path: "mantenimiento", element: <AuxiliaryMaintenance /> }
      ]
    },
    {
      path: "/recursos-humanos",
      element: (
        <ProtectedRoute allowedRole="RecursosHumanos">
          <HRLayout>
            <Outlet />
          </HRLayout>
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <HRDashboard /> },
        { path: "clientes", element: <HRClients /> },
        { path: "ventas", element: <HRSales /> },
        { path: "empleados", element: <HREmployees /> },
        { path: "salidas", element: <HROutput /> }
      ]
    },
    {
      path: "/manager",
      element: (
        <ProtectedRoute allowedRole="Gerente">
          <ManagerLayout>
            <Outlet />
          </ManagerLayout>
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <ManagerDashboard /> },
        { path: "mantenimiento", element: <ManagerMaintenance /> },
        { path: "inventario", element: <ManagerInventory /> },
        { path: "clientes", element: <ManagerClients /> },
        { path: "tecnicos", element: <ManagerTechnicians /> },
        { path: "personal", element: <ManagerStaff /> },
        { path: "caja-chica", element: <ManagerCashControl /> }
      ]
    },
    {
      path: "/tecnico",
      element: (
        <ProtectedRoute allowedRole="Técnico">
          <TechProvider>
            <TechnicianLayout>
              <Outlet />
            </TechnicianLayout> 
          </TechProvider>
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <TechnicianDashboard /> },
        { path: "actividades", element: <TechnicianActivities /> },
        { path: "herramientas", element: <TechnicianTools /> },
        { path: "clientes", element: <TechnicianClients /> },
        { path: "MisBoletas", element: <TechnicianMyTickets /> },
        { path: "MisGastos", element: <TechnicianMyExpenses /> }
      ]
    },
    {
      path: "/",
      element: <Navigate to="/login" replace />
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />
    }
  ]);

  return (
    <AuthProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <RouterProvider router={router} />
    </LocalizationProvider>
    </AuthProvider>
);
}

export default App;