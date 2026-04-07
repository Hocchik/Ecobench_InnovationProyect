export interface Ticket {
  id: string;
  month: string;
  year: number;
  filename?: string; // si luego quieres integrar descargas
}