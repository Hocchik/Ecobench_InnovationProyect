import { v4 as uuidv4 } from 'uuid';
import { MainPreventive, MainCorrective } from './interfaces/MaintenanceInterfaces';

export const testPreventiveData: MainPreventive[] = [
  {
    id_maintenance: uuidv4(),
    month: 'Junio',
    building_client: 'Edificio Lima Tower',
    period: 'Trimestral',
    ascensor_type: 'DISCAPACITADO',
    scheduled_date: '2025-06-20',
    scheduled_real_date: '2025-06-22',
    scheduled_time: '10:00',
    name_technician_assigned: 'Carlos Pérez',
    name_technician_selected: 'Luisa Martínez',
    name_technician_executor: 'Carlos Pérez',
    name_supervisor: 'Ana Torres',
    details: 'Revisión general del sistema hidráulico y lubricación.',
    notice: true,
    completed_status: true,
    checked: true
  },
  {
    id_maintenance: uuidv4(),
    month: 'Julio',
    building_client: 'Torre Central Miraflores',
    period: 'Mensual',
    ascensor_type: 'PASAJEROS_2',
    scheduled_date: '2025-07-10',
    scheduled_real_date: '2025-07-11',
    scheduled_time: '09:00',
    name_technician_assigned: 'Pedro Navarro',
    name_technician_selected: 'Lucía Fernández',
    name_technician_executor: 'Lucía Fernández',
    name_supervisor: 'César Guzmán',
    details: 'Limpieza de motor y verificación de sensores.',
    notice: false,
    completed_status: false,
    checked: false
  }
];

export const testCorrectiveData: MainCorrective[] = [
  {
    id_maintenance: uuidv4(),
    month: 'Junio',
    building_client: 'Residencial San Martín',
    type_maintenance: 'Reparación',
    ascensor_type: 'PASAJEROS',
    scheduled_date: '2025-06-18',
    scheduled_real_date: '2025-06-19',
    scheduled_time: '15:30',
    name_technician_assigned: 'María López',
    name_technician_selected: 'Juan Ramírez',
    name_technician_executor: 'María López',
    name_supervisor: 'Edgar Cárdenas',
    observations: 'Cambio de tarjeta electrónica de control de piso.',
    completed_status: false,
    checked: false
  },
  {
    id_maintenance: uuidv4(),
    month: 'Julio',
    building_client: 'Oficinas Corporativas Surco',
    type_maintenance: 'Correctivo',
    ascensor_type: 'MONTAVEHICULO',
    scheduled_date: '2025-07-15',
    scheduled_real_date: '2025-07-15',
    scheduled_time: '14:00',
    name_technician_assigned: 'Ricardo Salas',
    name_technician_selected: 'Gabriela Torres',
    name_technician_executor: 'Gabriela Torres',
    name_supervisor: 'Edgar Cárdenas',
    observations: 'Ajuste de freno de emergencia.',
    completed_status: true,
    checked: true
  }
];