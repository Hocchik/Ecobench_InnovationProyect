export interface Client {
  id: string;
  name: string;
  address: string;
  elevators: number;
  date: string;
  people: PersonInCharge[];
  status: 'Sent' | 'Received';
}

export interface DetailedClient {
  id: string;
  name: string;
  address: string;
  ruc: string;
  elevators: number;
  period: 'MENSUAL' | 'BIMESTRAL' | 'TRIMESTRAL' | 'SEMESTRAL';
  floors: string;
  machineRoom: 'CON' | 'SIN';
  elevatorDetails: ElevatorDetail[];
  people: PersonInCharge[];
}

export interface ElevatorDetail {
  id: string;
  number: number;
  elevatorType: string;
  brand: string;
  model: string;
  controlSystem: string;
  floors: string;
  maintenanceFrequency: string;
  characteristics: string;
  observation: string;
  pending: string;
}

export interface PersonInCharge {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  inCharge: boolean;
  type: 'MANTENIMIENTO' | 'REPARACIÓN Y EMERGENCIAS';
}
