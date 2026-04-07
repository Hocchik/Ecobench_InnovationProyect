export interface CorrectiveMaintenance {
    ascensorType: string;
    building: string;
    client: number;
    elevatorNumber: number;
    scheduledDate: string;      // Formato: YYYY-MM-DD
    scheduledRealDate?: string; // Opcional
    scheduledTime: string;      // Formato: HH:mm
    type: string;               // Ej: "Correctivo", "Reparación", etc.
    details: string;            // Se usará como razón
    technician1: number;        // Nombre del técnico 1 (lo convertirás en ID antes de enviar)
    technician2?: number;       // Nombre del técnico 2 (opcional)
    supervisor: number;         // ID del supervisor
  }

  export interface PreventiveMaintenance {
    ascensorType: string;
    building: string;
    client: number;
    elevatorNumber: number;
    scheduledDate: string;      // Formato: YYYY-MM-DD
    scheduledRealDate?: string; // Opcional
    scheduledTime: string;      // Formato: HH:mm
    period: "Mensual" | "Trimestral" | "Semestral" | "Anual";
    reason: string;
    notice: boolean;
    technician1: number;
    technician2?: number;
    supervisor: number;
  }
  

export const mapMaintenanceToCorrectiveDTO = (maintenance: CorrectiveMaintenance) => {
    return {
      client: { id: maintenance.client }, // <-- debes determinar el cliente activo
      elevator_number: maintenance.elevatorNumber, // <-- también deberías tener este valor ya cargado
  
      technician1: { id: maintenance.technician1 },
      technician2: maintenance.technician2
        ? { id: maintenance.technician2 }
        : null,
  
      supervisor: { id: maintenance.supervisor },
  
      month: new Date(maintenance.scheduledDate).toLocaleString("es-PE", {
        month: "long"
      }).toUpperCase(), // ej. "JUNIO"
  
      maintenanceType: maintenance.type.toUpperCase(), // ej. "URGENCIA", "EMERGENCIA", etc.
  
      scheduledDate: maintenance.scheduledDate,
      scheduledRealDate: null, // puedes enviarlo si ya se conoce
  
      scheduledTime: maintenance.scheduledTime,
      reason: maintenance.details,
      status: false
    };
  };


export const mapMaintenanceToPreventiveDTO = (maintenance: PreventiveMaintenance) => {
    return {
        client: { id: maintenance.client },
        elevator_number: maintenance.elevatorNumber,
    
        technician1: { id: maintenance.technician1 },
        technician2: maintenance.technician2
          ? { id: maintenance.technician2 }
          : null,
    
        supervisor: { id: maintenance.supervisor },
    
        period: maintenance.period,
        notice: maintenance.notice,
    
        scheduledDate: maintenance.scheduledDate,
        scheduledRealDate: maintenance.scheduledRealDate || null,
        scheduledTime: maintenance.scheduledTime,
        observations: maintenance.reason,
        status: false
      };

}




