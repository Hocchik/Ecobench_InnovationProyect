import { ClientsResponse, ClientDetail } from '../types/clientTypes';

export const MOCK_CLIENTS: ClientsResponse = [
  {
    id: '1',
    clientName: 'Edificio Las Flores',
    formattedAddress: 'Av. Larco 123, Miraflores, Lima',
    elevatorCount: 2,
    state: 'Lima',
    personInCharge: 'Juan Pérez',
    status: 'CONTRACTED'
  },
  {
    id: '2',
    clientName: 'Residencial San Isidro',
    formattedAddress: 'Calle Los Pinos 456, San Isidro, Lima',
    elevatorCount: 4,
    state: 'Lima',
    personInCharge: 'María Rodríguez',
    status: 'VISITED'
  },
  {
    id: '3',
    clientName: 'Torre Empresarial',
    formattedAddress: 'Av. Javier Prado 789, San Borja, Lima',
    elevatorCount: 6,
    state: 'Lima',
    personInCharge: 'Carlos Gómez',
    status: 'FIRST_CONTACT'
  }
];

export const MOCK_CLIENT_DETAIL: ClientDetail = {
  id: '1',
  clientName: 'Edificio Las Flores',
  section: 'Edificios Residenciales',
  address: {
    street: 'Av. Larco',
    number: '123',
    district: 'Miraflores',
    province: 'Lima',
    department: 'Lima',
    country: 'Perú',
    formattedAddress: 'Av. Larco 123, Miraflores, Lima'
  },
  elevatorCount: 2,
  state: 'Lima',
  identification: {
    ruc: '20123456789',
    dni: '',
    clientIdentification: '20123456789',
    isCompany: true
  },
  personsCharge: [
    {
      id: 'p1',
      name: 'Juan Pérez',
      phone: '987654321',
      contactType: 'ADMINISTRATOR',
      emailCopy: 'juan.perez@example.com',
      typeMaintenanceContact: 'PRIMARY',
      createdAt: '2023-01-01T10:00:00Z'
    }
  ],
  technicalVisits: [
    {
      id: 'v1',
      visitDate: '2023-06-15T09:00:00Z',
      visitDescription: 'Mantenimiento preventivo realizado',
      visitingEmployeeIds: ['e1'],
      visitingEmployees: [
        {
          id: 'e1',
          name: 'Pedro',
          lastName: 'Sánchez',
          fullName: 'Pedro Sánchez'
        }
      ],
      inspectionReportUrl: '#',
      solutionProposalUrl: '#',
      createdAt: '2023-06-15T09:00:00Z'
    }
  ],
  contract: {
    id: 'c1',
    signingDate: '2023-01-01',
    startDate: '2023-01-01',
    endDate: '2024-01-01',
    description: 'Contrato anual',
    contractUrl: '#',
    isActive: true,
    createdAt: '2023-01-01T10:00:00Z'
  },
  comments: [],
  createdAt: '2023-01-01T10:00:00Z'
};
