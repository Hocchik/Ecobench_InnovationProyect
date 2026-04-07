type UUID = string;

//Inventario
export interface InventoryItemGET {
    id_item: UUID;
    code_item: string;
    name_item: string;
    position_item: string;
    category: "Consumibles" | "Repuestos";
    total_quantity: number;
    status: "Available" | "Limited" | "OutOfStock";
  }
export interface ToolItemGET {
    id_item: UUID;
    code_item: string;
    name_item: string;
    request_quantity: number;
    available_quantity: number;
    status: "Available" | "Limited" | "OutOfStock";
  }
  
export interface ToolRequestGET {
    id_tool_request: UUID;
    request_number: string;
    technician: string;
    date: string;
    reason: string;
    items: ToolItemGET[];
    approved_by?: { id_employee: number; name_employee: string }; // Opcional, solo si está aprobado
    status: "Pending" | "Approved" | "Denied";
  }


export interface ToolRequestPOST {
    id_tool_request?: UUID; // Se genera automáticamente en el backend
    request_number: string; // Generado en el frontend antes de enviar
    technician: TechnicianPOST; // Técnico asignado
    reason: string; // Motivo de la solicitud
    date: string; // Fecha en formato YYYY-MM-DD
    status: "Pending" | "Approved" | "Denied"; // Estado de la solicitud
    items: ToolRequestItemPOST[]; // Lista de herramientas solicitadas
    approved_by?: { id_employee: number; name_employee: string }; // Opcional, solo si está aprobado
    approved_date?: string; // Fecha en formato YYYY-MM-DD
    comments?: string; // Comentarios sobre la solicitud
    /* createdAt?: string; // Fecha de creación (autogenerada)
    updatedAt?: string; // Última actualización (autogenerada) */
}

  export interface TechnicianPOST {
    id_employee: UUID;
    name_employee: string;
  }

  export interface ToolRequestItemPOST {
    id_item: UUID;
    code_item: string;
    name_item: string;
    request_quantity: number;
  }

export interface ToolRequestPUT{
    id_tool_request: UUID; // Se genera automáticamente en el backend
    status: "Pending" | "Approved" | "Denied"; // Estado de la solicitud
}