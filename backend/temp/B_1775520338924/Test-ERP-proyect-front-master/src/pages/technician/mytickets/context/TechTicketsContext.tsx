import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Ticket } from '../data/interface/Tickets';
import { getTickets } from '../api/TechTicketsApi';

interface TechTicketsContextProps {
  tickets: Ticket[];
  refreshTickets: () => Promise<void>;
}

export const TechTicketsContext = createContext<TechTicketsContextProps>({
  tickets: [],
  refreshTickets: async () => {}
});

export const TechTicketsProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const refreshTickets = async () => {
    const data = await getTickets();
    setTickets(data);
  };

  useEffect(() => {
    refreshTickets();
  }, []);

  return (
    <TechTicketsContext.Provider value={{ tickets, refreshTickets }}>
      {children}
    </TechTicketsContext.Provider>
  );
};

export const useTechTickets = () => useContext(TechTicketsContext);