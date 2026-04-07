export interface AddBalanceData {
  amount: number;
  reason: string;
  date: string;
  evidenceImage?: File | null;
}

export interface AddBalanceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddBalanceData) => void;
  title: string;
}
