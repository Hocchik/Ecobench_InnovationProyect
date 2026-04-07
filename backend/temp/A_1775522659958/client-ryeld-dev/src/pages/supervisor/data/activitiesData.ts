// Tipos base
export type ActivityType = 'preventive' | 'corrective' | 'repair';
export type ActivityStatus = 'pending' | 'completed' | 'in-progress';
export type CompanyType = 'RYELD' | 'SUMMA' | '';

// Interfaces base
export interface Location {
  id: string;
  name: string;
  code: string;
  company: CompanyType;
  address: string;
  accessDoors: number;
  floorDoors: number;
  numberOfElevators?: number;
  numberOfFloors?: number;
}

export interface Technician {
  id: string;
  name: string;
  company: CompanyType;
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

// Interfaz extendida para detalles de mantenimiento
export interface CalendarActivity {
  id: string;
  title: string;
  orderNumber: string;
  company: CompanyType;
  location: Location;
  date: Date;
  startTime: string;
  endTime: string;
  type: ActivityType;
  status: ActivityStatus;
  
  // Información del edificio
  buildingType?: string;
  
  // Personal asignado
  technician1: string;
  technician2?: string;
  executor?: string;
  executorPosition?: string;
  coordinator?: string;
  supervisor: string;
  clientName: string;
  
  // Detalles de mantenimiento
  activities: string[];
  tools: MaintenanceTools[];
  requiredParts: MaintenanceParts[];
  supplies: MaintenanceSupplies[];
  
  // Campos adicionales
  comments?: string;
  elevatorCondition?: string;
  imageUrl?: string;
}

// Datos de ejemplo
export const locations: Location[] = [
  { 
    id: '1',
    name: 'Park Place',
    code: 'P8',
    company: 'RYELD',
    address: 'Av. Park Place 123',
    accessDoors: 2,
    floorDoors: 8
  },
  { 
    id: '2',
    name: 'Ramon Castilla',
    code: 'P6',
    company: 'RYELD',
    address: 'Av. Ramon Castilla 234',
    accessDoors: 2,
    floorDoors: 6
  },
  { 
    id: '3',
    name: 'Las Acacias',
    code: 'P7',
    company: 'RYELD',
    address: 'Jr. Las Acacias 567',
    accessDoors: 2,
    floorDoors: 7
  },
  { 
    id: '4',
    name: 'Alfa León',
    code: 'P6',
    company: 'RYELD',
    address: 'Calle Alfa Leon 151, Surquillo',
    accessDoors: 4,
    floorDoors: 6
  },
  { 
    id: '5',
    name: 'Sor Mate',
    code: 'D',
    company: 'RYELD',
    address: 'Jr. Sor Mate 890',
    accessDoors: 2,
    floorDoors: 4
  },
  { 
    id: '6',
    name: 'Corzo',
    code: 'P4+D',
    company: 'RYELD',
    address: 'Av. Corzo 432',
    accessDoors: 3,
    floorDoors: 4
  },
  { 
    id: '7',
    name: 'Anchorena',
    code: 'MP',
    company: 'RYELD',
    address: 'Jr. Anchorena 765',
    accessDoors: 2,
    floorDoors: 5
  },
  { 
    id: '8',
    name: 'Torre SUMMA',
    code: 'TS1',
    company: 'SUMMA',
    address: 'Av. SUMMA 123',
    accessDoors: 4,
    floorDoors: 12
  },
  { 
    id: '9',
    name: 'Edificio Central',
    code: 'EC1',
    company: 'SUMMA',
    address: 'Av. Central 456',
    accessDoors: 3,
    floorDoors: 8
  },
  { 
    id: '10',
    name: 'Plaza SUMMA',
    code: 'PS1',
    company: 'SUMMA',
    address: 'Jr. Plaza 789',
    accessDoors: 2,
    floorDoors: 6
  }
];

export const technicians: Technician[] = [
  { id: '1', name: 'Alex Cáceres', company: 'RYELD', position: 'technician', dni: '45678912' },
  { id: '2', name: 'Anderson Ataucusi', company: 'RYELD', position: 'technician', dni: '45678913' },
  { id: '3', name: 'Carlos Mendoza', company: 'RYELD', position: 'technician', dni: '45678914' },
  { id: '4', name: 'Diego Flores', company: 'RYELD', position: 'technician', dni: '45678915' },
  { id: '5', name: 'Juan Pérez', company: 'SUMMA', position: 'technician', dni: '45678916' },
  { id: '6', name: 'Miguel Torres', company: 'SUMMA', position: 'technician', dni: '45678917' }
];

export const supervisors: Technician[] = [
  { id: '1', name: 'Edgar Cárdenas', company: 'RYELD', position: 'supervisor', dni: '45678918' },
  { id: '2', name: 'Roberto Sánchez', company: 'SUMMA', position: 'supervisor', dni: '45678919' }
];

export const maintenanceTypes = [
  { value: 'preventive', label: 'Preventivo', description: 'Mantenimiento programado regular' },
  { value: 'corrective', label: 'Correctivo', description: 'Reparaciones y correcciones' },
  { value: 'repair', label: 'Reparación', description: 'Reparaciones mayores' }
];

export const calendarActivities: CalendarActivity[] = [
  {
    id: '1',
    title: 'Mantenimiento Preventivo Alfa León',
    orderNumber: '000596',
    company: 'RYELD',
    location: locations[3], // Alfa León
    date: new Date('2025-05-18T09:30:00'),
    startTime: '09:30',
    endTime: '13:00',
    type: 'preventive',
    status: 'pending',
    buildingType: 'Pasajeros',
    technician1: 'Anderson Ataucusi',
    executor: 'Anderson Ataucusi',
    executorPosition: 'Técnico',
    coordinator: 'Edgar Cárdenas',
    supervisor: 'Edgar Cárdenas',
    clientName: 'Alfa León',
    activities: [
      'Inspección, limpieza y lubricación de puertas de piso',
      'Limpieza de foso',
      'Inspección y limpieza de accesorios electromecánicos'
    ],
    tools: [
      { name: 'Destornillador', quantity: 1 },
      { name: 'Llave Allen', quantity: 1 },
      { name: 'Multímetro', quantity: 1 }
    ],
    requiredParts: [
      { description: 'Tarjeta de piso', quantity: 1 },
      { description: 'Pulsador', quantity: 1 },
      { description: 'Cable de pen', quantity: 1 }
    ],
    supplies: [
      { description: 'Trapos', quantity: 1 },
      { description: 'Brocha', quantity: 1 },
      { description: 'Solvente', quantity: 1 }
    ],
    elevatorCondition: '',
    imageUrl: '/imgs/RyeldAscensoresLogo.png'
  }
];