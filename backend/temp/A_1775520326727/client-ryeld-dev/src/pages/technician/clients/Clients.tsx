import { useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { useTechClients } from './context/TechClientContext';
import ClientCard from './components/ClientCard';
import ClientDetailsModal from './components/ClientDetailsModal';
import { Client } from './data/interface/clientinterfaces';

const Clients = () => {
  const { clients } = useTechClients();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  return (
    <Container sx={{ py: 3, px: { xs: 1, sm: 3 } }}>
      <Paper elevation={0} sx={{ bgcolor: 'white', p: 2, mb: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ color: '#1B2559', fontWeight: 600, mb: 3 }}>
          Mis clientes
        </Typography>
        <Box sx={{ mb: 4 }}>
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onDetails={() => setSelectedClient(client)}
            />
          ))}
        </Box>
      </Paper>
      <ClientDetailsModal
        open={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        client={selectedClient}
      />
    </Container>
  );
};

export default Clients;