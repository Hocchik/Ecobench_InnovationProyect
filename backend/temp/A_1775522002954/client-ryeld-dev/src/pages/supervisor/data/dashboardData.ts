export const maintenanceStats = {
  scheduled: 15,
  pending: 15,
  completed: 15
};

export const technicians = [
  {
    id: 1,
    name: "Erick Díaz Pacheco",
    status: "Disponible"
  },
  {
    id: 2,
    name: "Erick Díaz Pacheco",
    status: "En trabajo"
  },
  {
    id: 3,
    name: "Erick Díaz Pacheco",
    status: "Disponible"
  }
];

export const notifications = [
  {
    id: 1,
    type: "tool_request",
    technician: "Erick Díaz Pacheco",
    status: "pending"
  },
  {
    id: 2,
    type: "completed_activity",
    technician: "Erick Díaz Pacheco",
    company: "Empresa",
    status: "completed"
  }
];

export const monthlyActivities = [
  { date: '2024-01-03', status: 'Programado', technician: 'Erick Díaz Pacheco' },
  { date: '2024-01-16', status: 'Pendiente', technician: 'Erick Díaz Pacheco' },
  // Añade más actividades según necesites
];