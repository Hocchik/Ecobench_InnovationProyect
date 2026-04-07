import { mockTickets } from '../data/GetTickets';
import { Ticket } from '../data/interface/Tickets';

export const getTickets = async (): Promise<Ticket[]> => {
  console.log('📄 Simulando carga de tickets');
  return mockTickets;
};