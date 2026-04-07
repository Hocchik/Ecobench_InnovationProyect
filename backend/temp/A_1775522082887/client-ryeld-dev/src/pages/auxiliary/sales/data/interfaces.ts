export type SaleStatus = 'Pagado' | 'Pendiente' | 'Anulado' | 'Por cobrar';

export interface Sale {
  id: string;
  date: string;
  client: string;
  concept: string;
  voucher: string;
  amount: number;
  dueDate: string;
  paymentDate: string | null;
  voucherNumber: string;
  status: SaleStatus;
  paymentProof?: string;
}

export interface SaleDetail extends Sale {
  description: string;
  paymentMethod?: string;
  notes?: string;
  paymentProof?: string;
  bankAccount?: string;
  operationNumber?: string;
}

export interface Month {
  id: number;
  name: string;
}

export interface SaleFormData {
  client: string;
  concept: string;
  voucher: string;
  amount: number;
  dueDate: string;
  description: string;
  notes?: string;
}
