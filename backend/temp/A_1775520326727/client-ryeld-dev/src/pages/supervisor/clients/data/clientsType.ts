//Cliente Supervisor
export interface Elevator {
    id: number;
    elevatorType: string;
    brand: string;
    model: string;
    maintenanceFrequency: string;
    controlSystem: string;
    machineRoom: boolean;
    floors: number;
    access: string;
    characteristics?: string;
    observation?: string;
  }
  
  export interface Client {
    id: string;
    name: string;
    address: string;
    section: 'RYELD' | 'SUMMA';
    elevators: Elevator[];
  }

  export interface ClientBasicDTO {
    id: string;
    name: string;
    address: string;
    section: string;
    elevatorCount: number;
  }
  
  export interface ElevatorDTO {
    id: number;
    elevatorType: string;
    brand: string;
    model: string;
    controlSystem: string;
    machineRoom: boolean;
    floors: number;
    access: string;
    maintenanceFrequency: string;
    characteristics?: string;
    observation?: string;
  }
  
  export interface ClientElevatorsDTO {
    elevators: ElevatorDTO[];
  }