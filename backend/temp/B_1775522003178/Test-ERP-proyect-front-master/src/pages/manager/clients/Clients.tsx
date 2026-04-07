

import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { ClientsHeader } from './components/ClientsHeader';
import { ClientsTable } from './components/ClientsTable';
import { clientsData, clientsColumns } from './data/clientsData';

function ManagerClients() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter clients based on search term
  const filteredClients = useMemo(() => {
    if (!searchTerm) return clientsData;
    
    return clientsData.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const handleAddClient = () => {
    // TODO: Implementar funcionalidad para agregar cliente
    console.log('Agregar nuevo cliente');
  };

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
    </Box>
  );
}

export default ManagerClients