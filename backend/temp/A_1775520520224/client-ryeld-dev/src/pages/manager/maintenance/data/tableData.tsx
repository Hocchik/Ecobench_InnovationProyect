export interface PreventiveMaintenance {
    id: number;
    month: string;
    building: string;
    period: 'Mensual' | 'Trimestral' | 'Semestral' | 'Anual';
    scheduledTime: string;
    scheduledDate: string;
    details?: string;
}

export interface CorrectiveMaintenance {
    id: number;
    month: string;
    building: string;
    type: 'Correctivo' | 'Reparación' | 'Modernización';
    scheduledTime: string;
    scheduledDate: string;
    details?: string;
}

export const preventiveMaintenances: PreventiveMaintenance[] = [
    {
        id: 1,
        month: "Enero",
        building: "Autoridad Nacional Del Agua",
        period: "Mensual",
        scheduledTime: "09:30 a 13:00",
        scheduledDate: "03/01/2025",
        details: "Mantenimiento preventivo general"
    },
    {
        id: 2,
        month: "Enero",
        building: "Autoridad Nacional Del Agua",
        period: "Trimestral",
        scheduledTime: "09:30 a 13:00",
        scheduledDate: "03/01/2025",
        details: "Revisión trimestral de sistemas"
    },
    {
        id: 3,
        month: "Febrero",
        building: "Autoridad Nacional Del Agua",
        period: "Mensual",
        scheduledTime: "09:30 a 13:00",
        scheduledDate: "03/01/2025",
        details: "Mantenimiento preventivo general"
    },
    {
        id: 4,
        month: "Marzo",
        building: "Autoridad Nacional Del Agua",
        period: "Mensual",
        scheduledTime: "09:30 a 13:00",
        scheduledDate: "03/01/2025",
        details: "Mantenimiento preventivo general"
    },
    {
        id: 5,
        month: "Marzo",
        building: "Autoridad Nacional Del Agua",
        period: "Mensual",
        scheduledTime: "09:30 a 13:00",
        scheduledDate: "03/01/2025",
        details: "Mantenimiento preventivo general"
    }
];



export const correctiveMaintenances: CorrectiveMaintenance[] = [
    {
        id: 1,
        month: "Enero",
        building: "Autoridad Nacional Del Agua",
        type: "Correctivo",
        scheduledTime: "09:30 a 13:00",
        scheduledDate: "03/01/2025",
        details: "Reparación de sistema de control"
    },
    {
        id: 2,
        month: "Enero",
        building: "Autoridad Nacional Del Agua",
        type: "Reparación",
        scheduledTime: "09:30 a 13:00",
        scheduledDate: "03/01/2025",
        details: "Cambio de componentes desgastados"
    },
    {
        id: 3,
        month: "Febrero",
        building: "Autoridad Nacional Del Agua",
        type: "Modernización",
        scheduledTime: "09:30 a 13:00",
        scheduledDate: "03/01/2025",
        details: "Actualización de sistema eléctrico"
    },
    {
        id: 4,
        month: "Marzo",
        building: "Autoridad Nacional Del Agua",
        type: "Reparación",
        scheduledTime: "09:30 a 13:00",
        scheduledDate: "03/01/2025",
        details: "Reparación de puertas automáticas"
    },
    {
        id: 5,
        month: "Marzo",
        building: "Autoridad Nacional Del Agua",
        type: "Correctivo",
        scheduledTime: "09:30 a 13:00",
        scheduledDate: "03/01/2025",
        details: "Corrección de sistema de nivelación"
    }
];