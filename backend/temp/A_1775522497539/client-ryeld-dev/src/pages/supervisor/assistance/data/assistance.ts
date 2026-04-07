// Técnico base
export interface Technician {
    id: number;
    name: string;
    status: "active" | "inactive";
  }
  
  // Asistencia
export interface AttendanceRecord {
    id: number;
    technicianId: number;
    date: string;
    day: string;
    checkIn: string | null;
    checkOut: string | null;
    hoursWorked: string;
    overtime: string;
  }
  
export interface TechnicianStats {
    technicianId: number;
    name: string;
    hoursWorked: number;
    daysWorked: number;
    pendingHours: number;
  }