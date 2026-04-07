import { Client, DetailedClient } from './interfaces';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Alfa León',
    address: 'Calle Alfa Leon 151 Surquillo',
    elevators: 1,
    date: '16/11/2022',
    people: [
      {
        id: '1',
        name: 'Patricia Gonzales',
        position: 'dpt 403',
        phone: '999999999',
        email: 'abcdefghijk_olk@gmail.com',
        inCharge: true,
        type: 'MANTENIMIENTO'
      }
    ],
    status: 'Received'
  },
  {
    id: '2',
    name: 'Management Circular for HR Staffs',
    address: 'Admin, HR',
    elevators: 1,
    date: '16/11/2022',
    people: [],
    status: 'Sent'
  },
  {
    id: '3',
    name: 'Circular for Time Maintainance in the Office',
    address: 'Management',
    elevators: 2,
    date: '16/11/2022',
    people: [],
    status: 'Received'
  },
  {
    id: '4',
    name: 'HR Circular for Operations Department Staff',
    address: 'Admin, HR',
    elevators: 2,
    date: '16/11/2022',
    people: [],
    status: 'Sent'
  },
  {
    id: '5',
    name: 'HR Circular for Operations Department Staff',
    address: 'Admin, HR',
    elevators: 1,
    date: '16/11/2022',
    people: [],
    status: 'Received'
  },
  {
    id: '6',
    name: 'HR Circular for Operations Department Staff',
    address: 'Admin, HR',
    elevators: 2,
    date: '16/11/2022',
    people: [],
    status: 'Sent'
  },
  {
    id: '7',
    name: 'HR Circular for Operations Department Staff',
    address: 'Admin, HR',
    elevators: 1,
    date: '16/11/2022',
    people: [],
    status: 'Sent'
  },
  {
    id: '8',
    name: 'HR Circular for Operations Department Staff',
    address: 'Admin, HR',
    elevators: 2,
    date: '16/11/2022',
    people: [],
    status: 'Received'
  },
  {
    id: '9',
    name: 'HR Circular for Operations Department Staff',
    address: 'Admin, HR',
    elevators: 1,
    date: '16/11/2022',
    people: [],
    status: 'Received'
  },
  {
    id: '10',
    name: 'HR Circular for Operations Department Staff',
    address: 'Admin, HR',
    elevators: 1,
    date: '16/11/2022',
    people: [],
    status: 'Sent'
  },
  {
    id: '11',
    name: 'HR Circular for Operations Department Staff',
    address: 'Admin, HR',
    elevators: 1,
    date: '16/11/2022',
    people: [],
    status: 'Sent'
  },
  {
    id: '12',
    name: 'HR Circular for Operations Department Staff',
    address: 'Admin, HR',
    elevators: 2,
    date: '16/11/2022',
    people: [],
    status: 'Sent'
  },
  {
    id: '13',
    name: 'HR Circular for Operations Department Staff',
    address: 'Admin, HR',
    elevators: 2,
    date: '16/11/2022',
    people: [],
    status: 'Sent'
  }
];

export const getDetailedClient = (id: string): DetailedClient => {
  const basicClient = mockClients.find(client => client.id === id) || mockClients[0];

  return {
    id: basicClient.id,
    name: basicClient.name.toUpperCase(),
    address: basicClient.address,
    ruc: '20603254887',
    elevators: basicClient.elevators,
    period: 'MENSUAL',
    floors: basicClient.elevators === 1 ? '03 PARADAS / TRACCIÓN HIDRAULICA' : '05 PARADAS /ACCESO SIMPLE SCHINDLER',
    machineRoom: 'CON',
    elevatorDetails: Array(basicClient.elevators).fill(0).map((_, index) => ({
      id: `${basicClient.id}-${index + 1}`,
      number: index + 1,
      elevatorType: 'Eléctrico',
      brand: 'SCHINDLER',
      model: 'S001',
      controlSystem: 'Digital',
      floors: '3',
      maintenanceFrequency: 'Mensual',
      characteristics: 'Modelo estándar, acero inoxidable',
      observation: 'Revisión de cables requerida',
      pending: index === 0 ? 'Cambio de botón de emergencia' : ''
    })),
    people: basicClient.people.length > 0 ? basicClient.people : [
      {
        id: `${basicClient.id}-person-1`,
        name: 'Patricia Gonzales',
        position: 'dpt 403',
        phone: '999999999',
        email: 'abcdefghijk_olk@gmail.com',
        inCharge: true,
        type: 'MANTENIMIENTO'
      },
      {
        id: `${basicClient.id}-person-2`,
        name: 'Mariela Cardenas',
        position: 'Presidenta',
        phone: '999999999',
        email: 'abcdefghijk_olk@gmail.com',
        inCharge: false,
        type: 'MANTENIMIENTO'
      }
    ]
  };
};
