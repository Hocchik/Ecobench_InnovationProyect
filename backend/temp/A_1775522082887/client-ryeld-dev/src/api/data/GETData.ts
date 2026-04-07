import { v4 as uuidv4 } from 'uuid';
import { Techs, Supervisors, MaintenanceType, ElevatorsType } from '../interfaces/DataInterfaces';

export const testTechnicians: Techs[] = [
    {
        id_technician: uuidv4(),
        name_technician: 'Carlos Pérez'
    },
    {
        id_technician: uuidv4(),
        name_technician: 'Luisa Martínez'
    },
    {
        id_technician: uuidv4(),
        name_technician: 'Pedro Navarro'
    },
    {
        id_technician: uuidv4(),
        name_technician: 'Lucía Fernández'
    },
    {
        id_technician: uuidv4(),
        name_technician: 'María López'
    },
    {
        id_technician: uuidv4(),
        name_technician: 'Juan Ramírez'
    }
];

export const testSupervisors: Supervisors[] = [
    {
        id_supervisor: uuidv4(),
        name_supervisor: 'Edgar Cárdenas'
    },
    {
        id_supervisor: uuidv4(),
        name_supervisor: 'Ana Torres'
    },
    {
        id_supervisor: uuidv4(),
        name_supervisor: 'César Guzmán'
    }
];

export const testMaintenanceTypes: MaintenanceType[] = [
    { index:1, maintenance_type: 'Correctivo' }, 
    { index:2, maintenance_type: 'Reparación' },
    { index:3, maintenance_type: 'Urgencia' },
    { index:4, maintenance_type: 'Emergencia' },
    { index:5, maintenance_type: 'Admin' }
];

export const testElevatorTypes: ElevatorsType[] = [
    { index: 1, elevator_type: 'PASAJEROS' },
    { index: 2, elevator_type: 'PASAJEROS_1' },
    { index: 3, elevator_type: 'PASAJEROS_2' },
    { index: 4, elevator_type: 'MONTACARGAS' },
    { index: 5, elevator_type: 'PASAESCALERAS' },
    { index: 6, elevator_type: 'MONTAVEHICULO' },
    { index: 7, elevator_type: 'DISCAPACITADO' },
    { index: 8, elevator_type: 'DISCAPACITADOS' },
    { index: 9, elevator_type: 'DISCAPACITADOS_1' },
    { index: 10, elevator_type: 'DISCAPACITADOS_2' }
];

export const testElevators: ElevatorsType[] = [
    { index: 1, elevator_type: 'PASAJEROS' },
    { index: 2, elevator_type: 'MONTACARGAS' },
    { index: 3, elevator_type: 'DISCAPACITADOS' }
];

export const testClients = [
  {
    id_client: uuidv4(),
    building_client: 'Edificio Lima Tower',
    elevator_number: 1,
    brand: 'Otis'
  },
  {
    id_client: uuidv4(),
    building_client: 'Torre Central Miraflores',
    elevator_number: 1,
    brand: 'Schindler'
  },
  {
    id_client: uuidv4(),
    building_client: 'Residencial San Martín',
    elevator_number: 1,
    brand: 'Thyssenkrupp'
  },
  {
    id_client: uuidv4(),
    building_client: 'Oficinas Corporativas Surco',
    elevator_number: 1,
    brand: 'Kone'
  }
];