export interface Technician {
    id: number;
    name: string;
  }
  
  export interface Attendance {
    id?: number;
    technician: Technician;
    date: string; // Formato YYYY-MM-DD
    entryTime: string; // Formato HH:mm:ss
    exitTime: string; // Formato HH:mm:ss
    status: boolean;
  }
  
  
  export interface DayAttendanceDTO {
    id: Number,
    technicianId: string,
    technicianName: string,
    entryTime: string,
    exitTime: string,
    status: boolean,
  }
  
  
  export interface HistoryAttendaceTechDTO {
    id: Number,
    technicianId: string,
    technicianName: string,
    date: string,
    entryTime: string,
    exitTime: string,
    hoursWorked: string,
    overtime: string,
  }