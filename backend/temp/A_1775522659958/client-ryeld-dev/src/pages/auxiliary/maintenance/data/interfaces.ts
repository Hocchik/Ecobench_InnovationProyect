export interface PreventiveMaintenance {
  id: number | string;
  cliente: string;
  contacto: string;
  tipoAscensor: string;
  horaPropuesta: string;
  fechaProgramacion: string;
  fechaProgramacionReal: string;
  aviso: 'Pending' | 'Avisado';
}

export interface CorrectiveMaintenance {
  id: number | string;
  cliente: string;
  tipo: string;
  tipoAscensor: string;
  horaPropuesta: string;
  fechaProgramacion: string;
  fechaProgramacionReal: string;
  acciones: string;
}

export interface MaintenanceDetail {
  id: number | string;
  mes: string;
  edificio: string;
  tipoMantenimiento: string;
  tipoAscensor: string;
  horaPropuesta: string;
  fechaProgramacion: string;
  fechaRealProgramacion: string;
  motivo?: string;
}

export interface Month {
  id: number;
  name: string;
}
