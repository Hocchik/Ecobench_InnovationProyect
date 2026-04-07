// Tipos base
export type ActivityType = 'Preventivo' | 'Correctivo';
export type ActivityStatus = 'Pending' | 'Completed' | 'Scheduled';
export type SectionType = 'RYELD' | 'SUMMA' | '';

// Interfaces base
export interface Location {
  id: string;
  name: string;
  code: string;
  section: string;
  address: string;
  accessDoors: number;
  floorDoors: number;
  numberOfElevators?: number;
  numberOfFloors?: number;
}

export interface Technician {
  id: string;
  name: string;
  company?: string;
  code?: string;
  status?: 'active' | 'inactive' | 'on-leave';
  position: 'technician' | 'supervisor';
  dni?: string;
}

// Interfaces para detalles de mantenimiento
export interface MaintenanceTools {
  name: string;
  quantity: number;
}

export interface MaintenanceParts {
  description: string;
  quantity: number;
}

export interface MaintenanceSupplies {
  description: string;
  quantity: number;
}

// Interfaz principal de actividad
export interface CalendarActivity {
  id: string;
  title: string;
  orderNumber: string;
  section: SectionType;
  location: Location;
  date: Date;
  startTime: string;
  endTime: string;
  type: string;
  status: string;
  building: string;
  technician1: string;
  technician2?: string;
  executor?: string;
  executorPosition?: string;
  coordinator?: string;
  supervisor: string;
  clientName: string;
  activities: string[];
  tools: MaintenanceTools[];
  requiredParts: MaintenanceParts[];
  supplies: MaintenanceSupplies[];
  comments?: string;
  elevatorCondition?: string;
  imageUrl?: string;
}


// Interfaz para tipos de mantenimiento
export interface MaintenanceType {
    value: ActivityType;
    label: string;
    description: string;
  }