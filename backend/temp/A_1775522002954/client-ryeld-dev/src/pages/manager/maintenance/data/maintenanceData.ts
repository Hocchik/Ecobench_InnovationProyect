import { Maintenance } from '../types/maintenanceTypes';

export const mockMaintenances: Maintenance[] = [
  {
    id: '1',
    clientName: 'Torre Empresarial San Isidro',
    building: 'Torre Principal',
    ascensorType: 'PASAJEROS',
    maintenanceType: 'Preventivo',
    status: 'Completado',
    scheduledDate: '2025-06-15',
    completedDate: '2025-06-15',
    technician1: 'Alfonso Espinal',
    technician2: 'Alex Cáceres',
    supervisor: 'Edgar Cárdenas',
    startTime: '08:00',
    endTime: '12:30',
    activitiesPerformed: 'Revisión completa del sistema de tracción, lubricación de rieles, inspección de cables, ajuste de frenos, verificación de sistemas de seguridad',
    observations: 'Ascensor en óptimas condiciones. Se recomienda cambio de aceite en 3 meses.',
    cost: 850,
    priority: 'Media',
    location: 'Piso 1-15',
    nextMaintenanceDate: '2025-09-15'
  },
  {
    id: '2',
    clientName: 'Residencial Los Jardines',
    building: 'Edificio A',
    ascensorType: 'MONTACARGA',
    maintenanceType: 'Correctivo',
    status: 'En Progreso',
    scheduledDate: '2025-06-16',
    technician1: 'Dany Diaz',
    supervisor: 'Edgar Cárdenas',
    startTime: '09:00',
    activitiesPerformed: 'Reparación de sistema de puertas automáticas, reemplazo de sensores defectuosos',
    observations: 'Se detectó falla en sensores de piso 3 y 7. Pendiente instalación de repuestos.',
    cost: 1200,
    priority: 'Alta',
    location: 'Sótano - Piso 8'
  },
  {
    id: '3',
    clientName: 'Centro Comercial Plaza Norte',
    building: 'Mall Principal',
    ascensorType: 'PASAJEROS',
    maintenanceType: 'Urgencia',
    status: 'Programado',
    scheduledDate: '2025-06-17',
    technician1: 'Alex Cáceres',
    technician2: 'Alfonso Espinal',
    supervisor: 'Edgar Cárdenas',
    startTime: '07:00',
    activitiesPerformed: '',
    observations: 'Ascensor reportado con ruidos extraños y vibración excesiva',
    cost: 950,
    priority: 'Alta',
    location: 'Piso 1-4'
  },
  {
    id: '4',
    clientName: 'Hospital Nacional',
    building: 'Torre Médica',
    ascensorType: 'DISCAPACITADO',
    maintenanceType: 'Preventivo',
    status: 'Completado',
    scheduledDate: '2025-06-14',
    completedDate: '2025-06-14',
    technician1: 'Alfonso Espinal',
    supervisor: 'Edgar Cárdenas',
    startTime: '14:00',
    endTime: '17:00',
    activitiesPerformed: 'Mantenimiento completo de ascensor adaptado, verificación de sistemas de emergencia, calibración de botones braille',
    observations: 'Todos los sistemas funcionando correctamente. Certificación de seguridad renovada.',
    cost: 750,
    priority: 'Alta',
    location: 'Piso 1-6',
    nextMaintenanceDate: '2025-12-14'
  },
  {
    id: '5',
    clientName: 'Oficinas Corporativas Lima',
    building: 'Torre Ejecutiva',
    ascensorType: 'PASAJEROS',
    maintenanceType: 'Correctivo',
    status: 'Pendiente',
    scheduledDate: '2025-06-18',
    technician1: 'Dany Diaz',
    technician2: 'Alex Cáceres',
    supervisor: 'Edgar Cárdenas',
    startTime: '08:30',
    activitiesPerformed: '',
    observations: 'Problemas intermitentes en el sistema de llamada. Ascensor se detiene entre pisos ocasionalmente.',
    cost: 1100,
    priority: 'Media',
    location: 'Piso 1-20'
  },
  {
    id: '6',
    clientName: 'Condominio Las Flores',
    building: 'Edificio Central',
    ascensorType: 'PASAESCALERAS',
    maintenanceType: 'Preventivo',
    status: 'Programado',
    scheduledDate: '2025-06-19',
    technician1: 'Alfonso Espinal',
    supervisor: 'Edgar Cárdenas',
    startTime: '10:00',
    activitiesPerformed: '',
    observations: 'Mantenimiento trimestral programado',
    cost: 600,
    priority: 'Baja',
    location: 'Escalera Principal'
  },
  {
    id: '7',
    clientName: 'Banco Central',
    building: 'Sede Principal',
    ascensorType: 'MONTAVEHICULO',
    maintenanceType: 'Emergencia',
    status: 'En Progreso',
    scheduledDate: '2025-06-16',
    technician1: 'Dany Diaz',
    technician2: 'Alfonso Espinal',
    supervisor: 'Edgar Cárdenas',
    startTime: '06:00',
    activitiesPerformed: 'Reparación urgente de sistema hidráulico, reemplazo de válvulas de seguridad',
    observations: 'Falla crítica en sistema hidráulico. Ascensor fuera de servicio hasta completar reparaciones.',
    cost: 2500,
    priority: 'Alta',
    location: 'Garage Subterráneo'
  },
  {
    id: '8',
    clientName: 'Universidad Tecnológica',
    building: 'Biblioteca Central',
    ascensorType: 'PASAJEROS',
    maintenanceType: 'Preventivo',
    status: 'Completado',
    scheduledDate: '2025-06-13',
    completedDate: '2025-06-13',
    technician1: 'Alex Cáceres',
    supervisor: 'Edgar Cárdenas',
    startTime: '16:00',
    endTime: '19:30',
    activitiesPerformed: 'Inspección general, limpieza de contactos eléctricos, ajuste de puertas, verificación de iluminación',
    observations: 'Ascensor en buen estado general. Se recomienda reemplazo de iluminación LED en 2 meses.',
    cost: 450,
    priority: 'Baja',
    location: 'Piso 1-8',
    nextMaintenanceDate: '2025-09-13'
  }
];

// Función para cargar datos desde localStorage o usar datos mock
export const getMaintenancesFromStorage = (): Maintenance[] => {
  const stored = localStorage.getItem('maintenances');
  if (stored) {
    return JSON.parse(stored);
  }
  // Si no hay datos en localStorage, guardar los datos mock y retornarlos
  localStorage.setItem('maintenances', JSON.stringify(mockMaintenances));
  return mockMaintenances;
};

// Función para guardar mantenimientos en localStorage
export const saveMaintenancesToStorage = (maintenances: Maintenance[]): void => {
  localStorage.setItem('maintenances', JSON.stringify(maintenances));
};

// Función para generar un nuevo ID
export const generateMaintenanceId = (): string => {
  const maintenances = getMaintenancesFromStorage();
  const maxId = Math.max(...maintenances.map(m => parseInt(m.id)));
  return (maxId + 1).toString();
};
