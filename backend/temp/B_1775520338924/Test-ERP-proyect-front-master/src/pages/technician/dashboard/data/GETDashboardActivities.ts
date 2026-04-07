import { DashboardActivity } from './interfaces/dashboardinterfaces';

export const mockDashboardActivities: DashboardActivity[] = [
  {
    id_activity: 'a1b2c3d4-0001-0000-0000-000000000001',
    type: 'Preventivo',
    status: 'En curso',
    company: 'Empresa 1',
    location: 'Lugar 1',
    time: '10:00',
    date: '2025-06-03',
    description: 'Revisión mensual de ascensor',
    image_url: ''
  },
  {
    id_activity: 'a1b2c3d4-0002-0000-0000-000000000002',
    type: 'Urgencia',
    status: 'Pendiente',
    company: 'Empresa 2',
    location: 'Lugar 2',
    time: '15:00',
    date: '2025-06-04',
    description: 'Fallo en puerta',
    image_url: ''
  }
];