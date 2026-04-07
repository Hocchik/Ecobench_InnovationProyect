interface Technician {
  id: number;
  name: string;
  assistance?: boolean;
  hoursWorked?: number;
  daysWorked?: number;
  pendingHours?: number;
}

interface AssistanceRecord {
  id: number;
  techId: number;
  date: string;
  day: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
  overtime: number;
}

export const technicians: Technician[] = [
  {
    id: 1,
    name: 'Manuel',
    assistance: true,
  },
  {
    id: 2,
    name: 'Jose',
    assistance: false,
  },
  {
    id: 3,
    name: 'Lucas',
    assistance: true,
  }
];

export const assistanceHistory: AssistanceRecord[] = [
  {
    id: 1,
    techId: 1,
    date: '01/02/2024',
    day: 'Lunes',
    checkIn: '08:00',
    checkOut: '18:00',
    hoursWorked: 10,
    overtime: 2
  },
  {
    id: 2,
    techId: 1,
    date: '02/02/2024',
    day: 'Martes',
    checkIn: '08:00',
    checkOut: '18:00',
    hoursWorked: 10,
    overtime: 2
  },
  // Add more records as needed
];