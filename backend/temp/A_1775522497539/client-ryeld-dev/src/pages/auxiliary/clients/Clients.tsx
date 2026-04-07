import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { ClientsTable } from './components/ClientsTable';
import { ClientDetails } from './components/ClientDetails';
import { Client, DetailedClient } from './data/interfaces';
import { mockClients, getDetailedClient } from './data/clientsData';

function AuxiliaryClients() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<DetailedClient | null>(null);

  const handleViewDetails = (client: Client) => {
    const detailedClient = getDetailedClient(client.id);
    setSelectedClient(detailedClient);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  return (
    <Box sx={{ height: '100%', p: { xs: 1, sm: 2 } }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <ClientsTable 
          clients={mockClients} 
          onViewDetails={handleViewDetails} 
        />

        <ClientDetails 
          open={detailsOpen} 
          onClose={handleCloseDetails} 
          client={selectedClient} 
        />
      </Container>
    </Box>
  );
}

export default AuxiliaryClients;