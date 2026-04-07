
//Dashboard
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
    requiredParts: any[];
    supplies: any[];
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
  
  //Inventario
  export interface InventoryItem {
    id: number;
    code: string;
    name: string;
    category: "Consumibles" | "Repuestos";
    totalQuantity: number;
    status: "Available" | "Limited" | "OutOfStock";
  }
  export interface ToolItem {
    itemId: number;
    code: string;
    name: string;
    requestQuantity: number;
    availableQuantity: number;
    status: "Available" | "Limited" | "OutOfStock";
  }
  
  export interface ToolRequest {
    id: number;
    requestNumber: string;
    technician: string;
    date: string;
    reason: string;
    items: ToolItem[];
    status: "Pending" | "Approved" | "Denied";
  }