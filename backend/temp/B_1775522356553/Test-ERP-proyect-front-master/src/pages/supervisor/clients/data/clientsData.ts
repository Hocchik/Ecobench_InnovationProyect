import { Client } from "../../../../api/types";

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'ALFA LEON',
    address: 'Calle Alfa Leon 151, Surquillo',
    section: 'RYELD',
    elevators: [
      {
        id: 1,
        elevatorType: 'Pasajeros',
        brand: 'Schindler',
        model: 'Standard',
        controlSystem: 'Electrónico',
        maintenanceFrequency: 'Mensual',
        machineRoom: true,
        floors: 6,
        access: 'Simple',
        characteristics: 'aaaa',
        observation: 'aaaaa',
      },
      {
        id: 2,
        elevatorType: 'Carga',
        brand: 'Schindler',
        model: 'Heavy Duty',
        controlSystem: 'Electrónico',
        maintenanceFrequency: 'Mensual',
        machineRoom: true,
        floors: 6,
        access: 'Doble',
        characteristics: 'Capacidad 1000kg',
        observation: '',
      }
    ]
  }
];