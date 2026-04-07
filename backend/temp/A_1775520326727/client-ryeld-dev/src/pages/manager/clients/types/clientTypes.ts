export interface ManagerClient {
  id: string;
  clientName: string;
  formattedAddress: string;
  elevatorCount: number;
  state: string;
  personInCharge: string;
  status: 'FIRST_CONTACT' | 'VISITED' | 'CONTRACTED';
}

export interface ClientsResponse extends Array<ManagerClient> {}

// Types for client detail
export interface ClientAddress {
  street: string;
  number: string;
  district: string;
  province: string;
  department: string;
  country: string;
  formattedAddress: string;
}

export interface ClientIdentification {
  ruc: string | null;
  dni: string;
  clientIdentification: string;
  isCompany: boolean;
}

export interface PersonInCharge {
  id: string;
  name: string;
  phone: string;
  contactType: string;
  emailCopy: string;
  typeMaintenanceContact: string;
  createdAt: string;
}

export interface VisitingEmployee {
  id: string;
  name: string;
  lastName: string;
  fullName: string;
}

export interface TechnicalVisit {
  id: string;
  visitDate: string;
  visitDescription: string;
  visitingEmployeeIds: string[];
  visitingEmployees: VisitingEmployee[];
  inspectionReportUrl: string;
  solutionProposalUrl: string;
  createdAt: string;
}

export interface ClientContract {
  id: string;
  signingDate: string;
  startDate: string;
  endDate: string;
  description: string;
  contractUrl: string;
  isActive: boolean;
  createdAt: string;
}

export interface ClientDetail {
  id: string;
  clientName: string;
  section: string;
  address: ClientAddress;
  elevatorCount: number;
  state: string;
  identification: ClientIdentification;
  personsCharge: PersonInCharge[];
  technicalVisits: TechnicalVisit[];
  contract: ClientContract | null;
  comments: any[];
  createdAt: string | null;
}
