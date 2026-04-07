/* import { ToolRequestItem } from "./ToolRequestItem";
import { Technician } from "./Technician";

export interface ToolRequest {
  id?: number; // Se genera automáticamente en el backend
  requestNumber: string; // Generado en el frontend antes de enviar
  technician: Technician; // Técnico asignado
  motivo: string; // Motivo de la solicitud
  fecha: string; // Fecha en formato YYYY-MM-DD
  estado: "Pending" | "Approved" | "Denied"; // Estado de la solicitud
  items: ToolRequestItem[]; // Lista de herramientas solicitadas
  aprobadoPor?: { id: number; nombre: string }; // Opcional, solo si está aprobado
  fechaAprobacion?: string; // Fecha en formato YYYY-MM-DD
  comentarios?: string; // Comentarios sobre la solicitud
  createdAt?: string; // Fecha de creación (autogenerada)
  updatedAt?: string; // Última actualización (autogenerada)
} */