import { CalendarActivity, Location, Technician, MaintenanceType } from './activities';

// Datos de ejemplo para ubicaciones
export const locations: Location[] = [
  { 
    id: '1',
    name: 'Park Place',
    code: 'P8',
    section: 'RYELD',
    address: 'Av. Park Place 123',
    accessDoors: 2,
    floorDoors: 8
  },
  { 
    id: '2',
    name: 'Ramon Castilla',
    code: 'P6',
    section: 'RYELD',
    address: 'Av. Ramon Castilla 234',
    accessDoors: 2,
    floorDoors: 6
  }
];

// Datos de ejemplo para actividades
export const mockActivities: CalendarActivity[] = [
  {
    id: '1',
    title: 'Mantenimiento Preventivo',
    orderNumber: 'ORD-001',
    section: 'RYELD',
    building: 'plox',
    location: locations[0],
    date: new Date('2025-05-23T09:00:00'),
    startTime: '09:00',
    endTime: '11:00',
    type: 'preventive',
    status: 'pending',
    technician1: 'Juan Pérez',
    supervisor: 'Carlos Rodríguez',
    clientName: 'Park Place SA',
    activities: ['Revisión general', 'Lubricación de componentes'],
    tools: [{ name: 'Kit de herramientas básico', quantity: 1 }],
    requiredParts: [],
    supplies: [{ description: 'Aceite lubricante', quantity: 1 }]
  }
];

// Datos de técnicos
export const technicians: Technician[] = [
    { id: '1', name: 'Alex Cáceres', company: 'RYELD', position: 'technician', dni: '45678912' },
    { id: '2', name: 'Anderson Ataucusi', company: 'RYELD', position: 'technician', dni: '45678913' },
    { id: '3', name: 'Carlos Mendoza', company: 'RYELD', position: 'technician', dni: '45678914' },
    { id: '4', name: 'Diego Flores', company: 'RYELD', position: 'technician', dni: '45678915' },
    { id: '5', name: 'Juan Pérez', company: 'SUMMA', position: 'technician', dni: '45678916' },
    { id: '6', name: 'Miguel Torres', company: 'SUMMA', position: 'technician', dni: '45678917' }
  ];
  
  // Datos de supervisores
  export const supervisors: Technician[] = [
    { id: '1', name: 'Edgar Cárdenas', company: 'RYELD', position: 'supervisor', dni: '45678918' },
    { id: '2', name: 'Roberto Sánchez', company: 'SUMMA', position: 'supervisor', dni: '45678919' }
  ];
  
  // Tipos de mantenimiento
  export const maintenanceTypes: MaintenanceType[] = [
    { value: 'Preventivo', label: 'Preventivo', description: 'Mantenimiento programado regular' },
    { value: 'Correctivo', label: 'Correctivo', description: 'Reparaciones y correcciones' }
  ];