import { PreventiveMaintenance, CorrectiveMaintenance, MaintenanceDetail, Month } from './interfaces';

export const months: Month[] = [
  { id: 1, name: 'Enero' },
  { id: 2, name: 'Febrero' },
  { id: 3, name: 'Marzo' },
  { id: 4, name: 'Abril' },
  { id: 5, name: 'Mayo' },
  { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' },
  { id: 8, name: 'Agosto' },
  { id: 9, name: 'Septiembre' },
  { id: 10, name: 'Octubre' },
  { id: 11, name: 'Noviembre' },
  { id: 12, name: 'Diciembre' },
];

// Datos de mantenimientos preventivos
export const preventiveMaintenanceData: PreventiveMaintenance[] = [
  {
    id: 1,
    cliente: 'Alba',
    contacto: 'Ana Trigoso',
    tipoAscensor: 'PSI 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '03/01/2025',
    fechaProgramacionReal: '23/01/2025',
    aviso: 'Pending'
  },
  {
    id: 2,
    cliente: 'Alba',
    contacto: 'Ana Trigoso',
    tipoAscensor: 'PSI 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '03/01/2025',
    fechaProgramacionReal: '23/01/2025',
    aviso: 'Pending'
  },
  {
    id: 3,
    cliente: 'Alba',
    contacto: 'Ana Trigoso',
    tipoAscensor: 'PSI 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '03/01/2025',
    fechaProgramacionReal: '23/01/2025',
    aviso: 'Pending'
  },
  {
    id: 4,
    cliente: 'Alba',
    contacto: 'Ana Trigoso',
    tipoAscensor: 'PSI 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '03/01/2025',
    fechaProgramacionReal: '23/01/2025',
    aviso: 'Pending'
  },
  {
    id: 5,
    cliente: 'Torres del Sol',
    contacto: 'Carlos Mendoza',
    tipoAscensor: 'PSI 2',
    horaPropuesta: '14:00 - 17:00',
    fechaProgramacion: '05/01/2025',
    fechaProgramacionReal: '25/01/2025',
    aviso: 'Avisado'
  },
];

// Datos de mantenimientos correctivos, reparación y modernización
export const correctiveMaintenanceData: CorrectiveMaintenance[] = [
  {
    id: 1,
    cliente: 'Alba',
    tipo: 'Correctivo',
    tipoAscensor: 'PSI 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '03/01/2025',
    fechaProgramacionReal: '23/01/2025',
    acciones: 'Ver más'
  },
  {
    id: 2,
    cliente: 'Alba',
    tipo: 'Reparación',
    tipoAscensor: 'PSI 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '03/01/2025',
    fechaProgramacionReal: '23/01/2025',
    acciones: 'Ver más'
  },
  {
    id: 3,
    cliente: 'Alba',
    tipo: 'Modernización',
    tipoAscensor: 'PSI 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '03/01/2025',
    fechaProgramacionReal: '23/01/2025',
    acciones: 'Ver más'
  },
  {
    id: 4,
    cliente: 'Alba',
    tipo: 'Reparación',
    tipoAscensor: 'PSI 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '03/01/2025',
    fechaProgramacionReal: '23/01/2025',
    acciones: 'Ver más'
  },
  {
    id: 5,
    cliente: 'Torre Empresarial',
    tipo: 'Correctivo',
    tipoAscensor: 'PSI 3',
    horaPropuesta: '8:00 - 12:00',
    fechaProgramacion: '07/01/2025',
    fechaProgramacionReal: '27/01/2025',
    acciones: 'Ver más'
  },
];

// Datos de detalle de mantenimiento para el modal
export const maintenanceDetails: { [key: string]: MaintenanceDetail } = {
  '1': {
    id: 1,
    mes: 'Enero',
    edificio: 'Alba',
    tipoMantenimiento: 'Correctivo',
    tipoAscensor: 'Pasajeros 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '13/02/2025',
    fechaRealProgramacion: '14/02/2025',
    motivo: 'Mantenimiento correctivo programado para revisar sistema de frenado'
  },
  '2': {
    id: 2,
    mes: 'Enero',
    edificio: 'Alba',
    tipoMantenimiento: 'Reparación',
    tipoAscensor: 'Pasajeros 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '15/02/2025',
    fechaRealProgramacion: '16/02/2025',
    motivo: 'Reparación de sistema de control de puertas'
  },
  '3': {
    id: 3,
    mes: 'Enero',
    edificio: 'Alba',
    tipoMantenimiento: 'Modernización',
    tipoAscensor: 'Pasajeros 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '20/02/2025',
    fechaRealProgramacion: '21/02/2025',
    motivo: 'Modernización del sistema de control y actualización de software'
  },
  '4': {
    id: 4,
    mes: 'Enero',
    edificio: 'Alba',
    tipoMantenimiento: 'Reparación',
    tipoAscensor: 'Pasajeros 1',
    horaPropuesta: '9:30 - 13:00',
    fechaProgramacion: '25/02/2025',
    fechaRealProgramacion: '26/02/2025',
    motivo: 'Reparación del sistema de iluminación interior'
  },
  '5': {
    id: 5,
    mes: 'Enero',
    edificio: 'Torre Empresarial',
    tipoMantenimiento: 'Correctivo',
    tipoAscensor: 'Pasajeros 3',
    horaPropuesta: '8:00 - 12:00',
    fechaProgramacion: '28/02/2025',
    fechaRealProgramacion: '01/03/2025',
    motivo: 'Correctivo urgente por falla en el sistema de tracción'
  },
};
