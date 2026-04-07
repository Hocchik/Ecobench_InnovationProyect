export type UUID = string;

export interface CreateTechnicianExpenseDTO {
  technicianId: UUID;
  type: string;
  amount: number;
  date: string; // formato ISO (ej. "2025-08-30")
}

export interface TechnicianExpenseDTO {
  id: UUID;
  type: string;
  amount: number;
  date: string;
}