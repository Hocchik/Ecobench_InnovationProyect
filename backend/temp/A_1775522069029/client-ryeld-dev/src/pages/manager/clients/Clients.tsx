

import { useState, useMemo } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { ClientsHeader } from './components/ClientsHeader';
import { ClientsTable } from './components/ClientsTable';
import { ClientDetailModal } from './components/ClientDetailModal';
import { createClientsColumns } from './config/clientsColumns';
import { useManagerClients } from './hooks/useManagerClients';

function ManagerClients() {
  const { clients, loading, error, refetchClients } = useManagerClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Filter clients based on search term
  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients;
    
    return clients.filter(client =>
      client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.formattedAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.personInCharge.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const handleAddClient = () => {
    // TODO: Implementar funcionalidad para agregar cliente
    console.log('Agregar nuevo cliente');
  };

  const handleViewDetails = (clientId: string) => {
    setSelectedClientId(clientId);
    setDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedClientId(null);
  };

  const clientsColumns = useMemo(() => createClientsColumns(handleViewDetails), []);

  if (loading) {
    return (
      <Box sx={{ 
        p: 3, 
        height: '90%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          action={
            <button onClick={refetchClients}>
              Reintentar
            </button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, height: '90%' }}>
      <ClientsHeader
        totalClients={filteredClients.length}
        onSearchChange={handleSearchChange}
        onAddClient={handleAddClient}
      />
      <ClientsTable
        clients={filteredClients}
        columns={clientsColumns}
      />
      
      <ClientDetailModal
        open={detailModalOpen}
        onClose={handleCloseDetailModal}
        clientId={selectedClientId}
      />
    </Box>
  );
}

export default ManagerClients