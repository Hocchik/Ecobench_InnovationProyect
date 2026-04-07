export interface ActivityGET {
  id_activity: string;
  type: 'Preventivo' | 'Correctivo';
  status: 'En curso' | 'Pendiente' | 'Finalizado';
  company: string;
  location: string;
  time: string;
  date: string;
  description?: string;
  image_url?: string;
  image_base64?: string;
}

export interface FinishActivityPOST {
  id_activity: string;
  image_url: string;
  image?: File;
}