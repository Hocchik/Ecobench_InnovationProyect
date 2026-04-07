export type MaintenanceStatus = 'Programado' | 'En Progreso' | 'Completado' | 'Cancelado' | 'Pendiente';
export type MaintenanceType = 'Preventivo' | 'Correctivo' | 'Urgencia' | 'Emergencia';
export type AscensorType = 'PASAJEROS' | 'MONTACARGA' | 'PASAESCALERAS' | 'MONTAVEHICULO' | 'DISCAPACITADO';

export interface Maintenance {
  id: string;
  clientName: string;
  building: string;
  ascensorType: AscensorType;
  maintenanceType: MaintenanceType;
  status: MaintenanceStatus;
  scheduledDate: string;
  completedDate?: string;
  technician1: string;
  technician2?: string;
  supervisor: string;
  startTime: string;
  endTime?: string;
  activitiesPerformed?: string;
  observations?: string;
  cost?: number;
  priority: 'Alta' | 'Media' | 'Baja';
  location: string;
  nextMaintenanceDate?: string;
}

export interface MaintenanceFormData {
  clientName: string;
  building: string;
  ascensorType: AscensorType;
  maintenanceType: MaintenanceType;
  status: MaintenanceStatus;
  scheduledDate: string;
  completedDate?: string;
  technician1: string;
  technician2?: string;
  supervisor: string;
  startTime: string;
  endTime?: string;
  activitiesPerformed?: string;
  observations?: string;
  cost?: number;
  priority: 'Alta' | 'Media' | 'Baja';
  location: string;
  nextMaintenanceDate?: string;
}
