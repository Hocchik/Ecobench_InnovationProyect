type UUID = string;
export interface DashboardActivity {
  id_activity: UUID;
  type: 'Preventivo' | 'Correctivo';
  status: 'En curso' | 'Pendiente' | 'Finalizado';
  company: string;
  location: string;
  time: string;
  date: string;
  description?: string;
  image_url?: string;
}

export interface changeStatusActivity {
  id_activity: UUID;
  status: string;
}