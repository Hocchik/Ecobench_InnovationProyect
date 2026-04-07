export interface MobilityExpense {
  id: number | string;
  fecha: string;
  semana: string;
  concepto: string;
  tecnico: string;
  motivo: string;
  origen: string;
  destino: string;
  monto: number;
  estado?: string;
}

export interface Month {
  id: number;
  name: string;
}

export interface ChartData {
  month: string;
  amount: number;
}
