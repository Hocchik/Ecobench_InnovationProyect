import { Client } from './interface/clientinterfaces';

export const mockClients: Client[] = [
  {
    id: '1',
    name: "Alba",
    address: "Av. Arequipa 1234, Lima",
    lastMaintenance: "2024-06-01",
    location: "Lima"
  },
  {
    id: '2',
    name: "Beta",
    address: "Calle Progreso 87, Chincha Alta",
    lastMaintenance: "2024-05-15",
    location: "Chincha"
  },
  {
    id: '3',
    name: "Gamma",
    address: "Jr. Los Nísperos 102, Trujillo",
    lastMaintenance: "2024-07-08",
    location: "Trujillo"
  }
];