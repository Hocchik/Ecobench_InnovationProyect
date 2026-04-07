export interface Technician {
  id: number;
  name: string;
  status: 'En actividad' | 'Disponible';
  location: 'Lima' | 'Provincia';
  province?: string; // Solo para técnicos de provincia
  maintenanceStats: {
    preventivos: number;
    reparaciones: number;
    correctivos: number;
    emergencias: number;
  };
}

export interface MaintenanceData {
//Aquí tmb se peude colocar el atributo label si se desea mostrar un texto descriptivo
  value: number;
  color: string;
}

// Función para calcular porcentajes y crear data para gráficos
export const getMaintenanceChartData = (stats: Technician['maintenanceStats']): MaintenanceData[] => {
  const total = stats.preventivos + stats.reparaciones + stats.correctivos + stats.emergencias;
  
//   if (total === 0) {
//     return [
//       { label: 'Sin datos', value: 100, color: '#E0E0E0' }
//     ];
//   }

  return [
    {
      
      value: Math.round((stats.preventivos / total) * 100),
      color: '#05CD99'
    },
    {
      
      value: Math.round((stats.reparaciones / total) * 100),
      color: '#1976D2'
    },
    {
      
      value: Math.round((stats.correctivos / total) * 100),
      color: '#FFB547'
    },
    {
      
      value: Math.round((stats.emergencias / total) * 100),
      color: '#FF4842'
    }
  ].filter(item => item.value > 0);
};

export const techniciansData: Technician[] = [
  {
    id: 1,
    name: "Carlos Mendoza Ruiz",
    status: "En actividad",
    location: "Lima",
    maintenanceStats: {
      preventivos: 15,
      reparaciones: 8,
      correctivos: 5,
      emergencias: 2
    }
  },
  {
    id: 2,
    name: "Ana García López",
    status: "En actividad",
    location: "Lima",
    maintenanceStats: {
      preventivos: 12,
      reparaciones: 10,
      correctivos: 3,
      emergencias: 4
    }
  },
  {
    id: 3,
    name: "Roberto Silva Herrera",
    status: "En actividad",
    location: "Provincia",
    province: "Arequipa",
    maintenanceStats: {
      preventivos: 18,
      reparaciones: 6,
      correctivos: 7,
      emergencias: 1
    }
  },
  {
    id: 4,
    name: "María Fernández Castro",
    status: "Disponible",
    location: "Lima",
    maintenanceStats: {
      preventivos: 20,
      reparaciones: 12,
      correctivos: 4,
      emergencias: 3
    }
  },
  {
    id: 5,
    name: "José Rodríguez Vega",
    status: "En actividad",
    location: "Provincia",
    province: "Cusco",
    maintenanceStats: {
      preventivos: 14,
      reparaciones: 9,
      correctivos: 6,
      emergencias: 2
    }
  },
  {
    id: 6,
    name: "Patricia López Morales",
    status: "Disponible",
    location: "Lima",
    maintenanceStats: {
      preventivos: 16,
      reparaciones: 7,
      correctivos: 8,
      emergencias: 1
    }
  },
  {
    id: 7,
    name: "Alberto Vásquez Díaz",
    status: "En actividad",
    location: "Lima",
    maintenanceStats: {
      preventivos: 11,
      reparaciones: 13,
      correctivos: 2,
      emergencias: 5
    }
  },
  {
    id: 8,
    name: "Carmen Ruiz Paredes",
    status: "En actividad",
    location: "Provincia",
    province: "Trujillo",
    maintenanceStats: {
      preventivos: 19,
      reparaciones: 5,
      correctivos: 9,
      emergencias: 1
    }
  },
  {
    id: 9,
    name: "Luis Herrera Campos",
    status: "Disponible",
    location: "Lima",
    maintenanceStats: {
      preventivos: 13,
      reparaciones: 11,
      correctivos: 3,
      emergencias: 4
    }
  },
  {
    id: 10,
    name: "Sandra Morales Torres",
    status: "En actividad",
    location: "Provincia",
    province: "Chiclayo",
    maintenanceStats: {
      preventivos: 17,
      reparaciones: 8,
      correctivos: 5,
      emergencias: 2
    }
  }
];

// Funciones para filtrar técnicos por categoría
export const getTechniciansInLima = () => 
  techniciansData.filter(tech => tech.location === 'Lima' && tech.status === 'En actividad');

export const getTechniciansInProvince = () => 
  techniciansData.filter(tech => tech.location === 'Provincia' && tech.status === 'En actividad');

export const getAvailableTechnicians = () => 
  techniciansData.filter(tech => tech.status === 'Disponible');

export const getAllTechnicians = () => techniciansData;
