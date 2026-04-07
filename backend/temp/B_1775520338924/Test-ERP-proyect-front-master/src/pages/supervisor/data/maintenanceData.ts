export type AscensorType = 'PASAJEROS' | 'PASAJEROS 1' | 'PASAJEROS 2' | 'MONTACARGA' | 'PASAESCALERAS' | 'MONTACARGA' | 'MONTAVEHICULO' | 'DISCAPACITADO' | 'DISCAPACITADOS' | 'DISCAPACITADOS 1' | 'DISCAPACITADOS 2' | '';


export interface Maintenance {
  id: string;
  clientId: string;
  date: string;
  startTime: string;
  endTime: string;
  technician1: string;
  technician2?: string;
  supervisor: string;
  maintenanceType: 'Preventivo' | 'Urgencia';
  AscensorType: AscensorType;
  operational: boolean;
  activitiesPerformed: string;
  observations?: string;
}

export const mockMaintenance: Maintenance[] = [
  {
    id: '1',
    clientId: '1',
    date: '2024-01-10',
    startTime: '09:00',
    endTime: '18:40',
    technician1: 'Anderson Ataucusi',
    technician2: 'Alex Cáceres',
    supervisor: 'Edgar Cárdenas',
    maintenanceType: 'Preventivo',
    AscensorType: 'PASAJEROS',
    operational: true,
    activitiesPerformed: 'Se reporta ruido fuerte en cuarto de máquinas. Se confirma que el ruido proviene del frenado en subida. Se realizan los ajustes de freno. Inspección y lubricación de puertas de piso y de cabina.',
    observations: 'Se observa ruido al cerrar las puertas de piso debido a que las amortiguaciones están vencidas o ausentes. Se observan cables de puertas y contrapeso de piso con daño.'
  },
  {
    id: '2',
    clientId: '1',
    date: '2024-01-05',
    startTime: '09:30',
    endTime: '11:30',
    technician1: 'Alex Cáceres',
    supervisor: 'Edgar Cárdenas',
    maintenanceType: 'Urgencia',
    AscensorType: 'PASAJEROS',
    operational: true,
    activitiesPerformed: 'Se reporta ascensor inoperativo. Se confirma que está bloqueado y parado entre pisos. Se resetea el sistema y se realiza ajuste de frenos para nivelar las paradas en pisos.',
    observations: ''
  }
  // Puedes agregar más registros de mantenimiento aquí
];

export interface PreventiveMaintenance {
  id?: string;
  month: string;
  building: string;
  period: 'Mensual' | 'Trimestral' | 'Semestral' | 'Anual';
  ascensorType: AscensorType;
  scheduledDate: string;
  scheduledRealDate?: string;
  scheduledTime: string;
  technician1?: { id: number; name: string } | null;
  technician2?: { id: number; name: string } | null;
  supervisor?: { id: number; name: string } | null;
  details?: string;
  status: 'Pending' | 'Scheduled' | 'Completed';
  notice: boolean;
  client: { id: number };
  elevator_number: number;
}


export interface CorrectiveMaintenance {
  id?: string;
  month: string;
  building: string;
  type: 'Correctivo' | 'Urgencia' | 'Emergencia' | 'Reparación';
  ascensorType: AscensorType;
  scheduledDate: string;
  scheduledRealDate?: string;
  scheduledTime: string;
  technician1?: { id: number; name: string } | null;
  technician2?: { id: number; name: string } | null;
  supervisor?: { id: number; name: string } | null;
  details?: string;
  status: boolean;
  client: { id: number };
  elevator_number: number;
}


export const preventiveMaintenances: PreventiveMaintenance[] = [
  {
    id: '1',
    month: 'Enero',
    building: 'ALFA LEON',
    period: 'Mensual',
    ascensorType: 'PASAJEROS 1',
    scheduledDate: '2024-01-10',
    scheduledRealDate: '2024-01-10',
    scheduledTime: '09:00',
    technician1: 'Anderson Ataucusi',
    technician2: 'Alex Cáceres',
    supervisor: 'Edgar Cárdenas',
    details: 'Mantenimiento preventivo mensual',
    status: 'completed',
    notice: true
  },
  {
    id: '2',
    month: 'Enero',
    building: 'ALFA LEON',
    period: 'Mensual',
    ascensorType: 'PASAJEROS 2',
    scheduledDate: '2024-01-07',
    scheduledRealDate: '2024-01-07',
    scheduledTime: '09:30',
    technician1: 'Anderson Ataucusi',
    supervisor: 'Edgar Cárdenas',
    details: 'Limpieza y lubricación de puertas',
    status: 'completed',
    notice: false
  }
];

export const correctiveMaintenances: CorrectiveMaintenance[] = [
  {
    id: '1',
    month: 'Enero',
    building: 'ALFA LEON',
    type: 'Urgencia',
    ascensorType: 'PASAJEROS 1',
    scheduledDate: '2024-01-05',
    scheduledRealDate: '2024-01-05',
    scheduledTime: '09:30',
    technician1: 'Alex Cáceres',
    supervisor: 'Edgar Cárdenas',
    details: 'Ascensor bloqueado entre pisos',
    status: 'completed'
  },
  {
    id: '2',
    month: 'Enero',
    building: 'ALFA LEON',
    type: 'Urgencia',
    ascensorType: 'PASAJEROS 2',
    scheduledDate: '2024-01-24',
    scheduledRealDate: '2024-01-24',
    scheduledTime: '14:20',
    technician1: 'Edgar Cárdenas',
    technician2: 'Luis Guido',
    details: 'Error en tarjeta principal',
    status: 'completed'
  }
];