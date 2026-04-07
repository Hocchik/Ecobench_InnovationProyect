import { Technician, AttendanceRecord, TechnicianStats } from './assistance';

export const mockTechnicians: Technician[] = [
    {
      id: 1,
      name: "Juan Pérez",
      status: "active"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      status: "active"
    },
    {
      id: 3,
      name: "Miguel Ángel",
      status: "active"
    },
    {
      id: 4,
      name: "Luis García",
      status: "active"
    },
    {
      id: 5,
      name: "Roberto Sánchez",
      status: "active"
    }
  ];
  
  export const mockAttendanceRecords: AttendanceRecord[] = [
    {
      id: 1,
      technicianId: 1,
      date: "2024-02-20",
      day: "Martes",
      checkIn: "08:00",
      checkOut: "17:00",
      hoursWorked: "09:00",
      overtime: "01:00"
    },
    {
      id: 2,
      technicianId: 2,
      date: "2024-02-20",
      day: "Martes",
      checkIn: "07:45",
      checkOut: "16:45",
      hoursWorked: "09:00",
      overtime: "00:00"
    },
    {
      id: 3,
      technicianId: 3,
      date: "2024-02-20",
      day: "Martes",
      checkIn: "08:15",
      checkOut: "17:15",
      hoursWorked: "09:00",
      overtime: "00:00"
    }
  ];
  
  export const mockTechnicianStats: TechnicianStats[] = [
    {
      technicianId: 1,
      name: "Juan Pérez",
      hoursWorked: 160,
      daysWorked: 20,
      pendingHours: 0
    },
    {
      technicianId: 2,
      name: "Carlos Rodríguez",
      hoursWorked: 155,
      daysWorked: 19,
      pendingHours: 2
    },
    {
      technicianId: 3,
      name: "Miguel Ángel",
      hoursWorked: 165,
      daysWorked: 20,
      pendingHours: 5
    },
    {
      technicianId: 4,
      name: "Luis García",
      hoursWorked: 150,
      daysWorked: 18,
      pendingHours: 0
    },
    {
      technicianId: 5,
      name: "Roberto Sánchez",
      hoursWorked: 158,
      daysWorked: 19,
      pendingHours: 3
    }
  ];

  export const checkAttendance = (technicianId: number, date: string): boolean => {
    const record = mockAttendanceRecords.find(
      r => r.technicianId === technicianId && r.date === date
    );
    return record ? record.checkIn !== null && record.checkOut !== null : false;
  };