import { ToolRequest, ToolRequestItem } from '../../data/inventoryData';

// Interfaz para notificaciones de actividades completadas
export interface CompletedActivity {
  id: string;
  title: string;
  company: string;
  location: { 
    id: string; 
    name: string; 
    code: string; 
    company: string 
  };
  type: 'preventive' | 'corrective' | 'repair';
  status: 'completed';
  date: Date;
  startTime: string;
  endTime: string;
  executor: string;
  activities: string[];
  tools: { name: string; quantity: number }[];
  requiredParts: { description: string; quantity: number }[];
  supplies: { description: string; quantity: number }[];
  orderNumber: string;
}

// Interfaz para notificaciones
export interface Notification {
  id: string;
  type: 'tool_request' | 'completed_activity';
  technician: string;
  company?: string;
  date: string;
  details?: ToolRequest | CompletedActivity;
}

// Datos de solicitudes de herramientas
export const toolRequests: ToolRequest[] = [ 
  { 
    id: "TR001", 
    requestNumber: "CAS-001", 
    technician: "Erick Díaz Pacheco", 
    date: "2025-05-20", 
    reason: "Mantenimiento preventivo programado", 
    items: [ 
      { 
        itemId: "1", 
        code: "KMP-001", 
        name: "Kit de Mantenimiento Preventivo", 
        requestedQuantity: 1, 
        availableQuantity: 5, 
        status: "Available" 
      } 
    ], 
    status: "Approved" 
  }, 
  { 
    id: "TR002", 
    requestNumber: "CAS-002", 
    technician: "Carlos Rodríguez", 
    date: "2025-05-19", 
    reason: "Reparación de emergencia", 
    items: [ 
      { 
        itemId: "4", 
        code: "KHB-004", 
        name: "Kit de Herramientas Básicas", 
        requestedQuantity: 1, 
        availableQuantity: 1, 
        status: "Limited" 
      } 
    ], 
    status: "Pending" 
  }, 
  { 
    id: "TR003", 
    requestNumber: "CAS-003", 
    technician: "Luis Mendoza", 
    date: "2025-05-18", 
    reason: "Mantenimiento correctivo", 
    items: [ 
      { 
        itemId: "2", 
        code: "SPI-002", 
        name: "Sensor de Proximidad Industrial", 
        requestedQuantity: 2, 
        availableQuantity: 8, 
        status: "Available" 
      } 
    ], 
    status: "Denied" 
  } 
];

// Datos de actividades completadas
export const completedActivities: CompletedActivity[] = [
  {
    id: 'ACT-001',
    title: 'Mantenimiento Preventivo',
    company: 'Empresa',
    location: { 
      id: 'LOC-001', 
      name: 'Edificio Central', 
      code: 'EC-001', 
      company: 'Empresa' 
    },
    type: 'preventive',
    status: 'completed',
    date: new Date('2025-05-21'),
    startTime: '09:00',
    endTime: '11:00',
    executor: 'Erick Díaz Pacheco',
    activities: ['Revisión de cables', 'Limpieza de cabina'],
    tools: [{ name: 'Destornillador', quantity: 1 }],
    requiredParts: [],
    supplies: [],
    orderNumber: 'ORD-001'
  }
];

// Convertir los datos a notificaciones
export const notifications: Notification[] = [
  // Solicitud de herramienta pendiente
  {
    id: toolRequests[1].id,
    type: 'tool_request',
    technician: toolRequests[1].technician,
    date: toolRequests[1].date,
    details: toolRequests[1]
  },
  // Actividad completada
  {
    id: 'NOTIF-001',
    type: 'completed_activity',
    technician: completedActivities[0].executor,
    company: completedActivities[0].company,
    date: completedActivities[0].date.toISOString().split('T')[0],
    details: completedActivities[0]
  }
];

// Función para obtener el color según el estado
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Available':
      return { bg: '#E6FAF5', color: '#05CD99' };
    case 'Limited':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Out of Stock':
      return { bg: '#FFE4E4', color: '#D32F2F' };
    case 'Pendiente':
    case 'Pending':
      return { bg: '#FFF6E5', color: '#FFB547' };
    case 'Approved':
      return { bg: '#E6FAF5', color: '#05CD99' };
    case 'Denied':
      return { bg: '#FFE5E5', color: '#FF4842' };
    default:
      return { bg: '#F5F5F5', color: '#666666' };
  }
};