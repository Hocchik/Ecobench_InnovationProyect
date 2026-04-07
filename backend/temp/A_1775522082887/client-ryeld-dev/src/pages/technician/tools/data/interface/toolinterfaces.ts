export type UUID = string;

export interface ToolPosesion {
  name_tool: string;
  quantity: number;
}

export interface ToolItemGET {
    /* id_item: UUID; */
    code_item: string;
    name_item: string;
    request_quantity: number;
    /* status: "Available" | "Limited" | "OutOfStock"; */
  }

export interface ToolRequestGET {
    /* id_tool_request: UUID; */
    request_number: string;
    /* technician: string; */
    date: string;
    reason: string;
    items: ToolItemGET[];
/*     approved_by?: { id_employee: number; name_employee: string }; // Opcional, solo si está aprobado
 */    status: "Pending" | "Approved" | "Denied";
  }

export interface ToolRequestPOST {
  /* id_tool_request?: UUID; */
  request_number: string; // Nose si generarlo aca o generarlo en el back
  technician: TechnicianPOST;
  reason: string;
  date: string;
  status: "Pending";
  items: ToolRequestItemPOST[];
}


export interface ToolRequestItemPOST {
  id_item: UUID;
  code_item: string;
  name_item: string;
  request_quantity: number;
}

export interface TechnicianPOST {
  id_employee: UUID;
  name_employee: string;
}

