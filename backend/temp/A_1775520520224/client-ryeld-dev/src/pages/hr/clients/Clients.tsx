/**
 * Módulo de Clientes para HR
 * Gestiona la información de clientes y sus configuraciones
 */

import { useState, useMemo } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';
import { ClientsHeader } from './components/ClientsHeader';
import { ClientsTable } from './components/ClientsTable';
import { ClientDetailsModal } from './components/ClientDetailsModal';
import { AddClientModal } from './components/AddClientModal';
import { Client, clientsData } from './data/clientsData';
import { createClient, updateClient, deleteClient } from './api';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

function HRClients() {
  // Estados principales
  const [clients, setClients] = useState<Client[]>(clientsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Estados de modales
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);

  // Estado de notificaciones
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });

  // Filtrado de clientes
  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients;
    
    const term = searchTerm.toLowerCase();
    return clients.filter(client =>
      client.name.toLowerCase().includes(term) ||
      client.contactPerson.toLowerCase().includes(term) ||
      client.district.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.status.toLowerCase().includes(term) ||
      client.contractType.toLowerCase().includes(term)
    );
  }, [clients, searchTerm]);

  // Estadísticas
  const activeClients = useMemo(() => 
    clients.filter(client => client.status === 'Activo').length,
    [clients]
  );

  // Handlers
  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const handleAddClient = () => {
    setEditingClient(null);
    setIsAddModalOpen(true);
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsDetailsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsAddModalOpen(true);
    setIsDetailsModalOpen(false);
  };

  const handleDeleteClient = (client: Client) => {
    setDeletingClient(client);
  };

  const handleSaveClient = async (clientData: Omit<Client, 'id'>) => {
    try {
      setIsLoading(true);
      
      if (editingClient) {
        // Actualizar cliente existente
        const updatedClient = await updateClient(editingClient.id, clientData);
        setClients(prev => 
          prev.map(client => 
            client.id === editingClient.id ? updatedClient : client
          )
        );
        
        setSnackbar({
          open: true,
          message: 'Cliente actualizado exitosamente',
          severity: 'success'
        });
      } else {
        // Crear nuevo cliente
        const newClient = await createClient(clientData);
        setClients(prev => [...prev, newClient]);
        
        setSnackbar({
          open: true,
          message: 'Cliente creado exitosamente',
          severity: 'success'
        });
      }
      
      setIsAddModalOpen(false);
      setEditingClient(null);
    } catch (error) {
      console.error('Error saving client:', error);
      setSnackbar({
        open: true,
        message: 'Error al guardar el cliente',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteClient = async () => {
    if (!deletingClient) return;
    
    try {
      setIsLoading(true);
      await deleteClient(deletingClient.id);
      
      setClients(prev => 
        prev.filter(client => client.id !== deletingClient.id)
      );
      
      setSnackbar({
        open: true,
        message: 'Cliente eliminado exitosamente',
        severity: 'success'
      });
      
      setDeletingClient(null);
    } catch (error) {
      console.error('Error deleting client:', error);
      setSnackbar({
        open: true,
        message: 'Error al eliminar el cliente',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 3, height: '100%', bgcolor: '#F7FAFC' }}>
      {/* Header */}
      <ClientsHeader
        totalClients={filteredClients.length}
        activeClients={activeClients}
        onSearchChange={handleSearchChange}
        onAddClient={handleAddClient}
      />

      {/* Tabla de clientes */}
      <ClientsTable
        clients={filteredClients}
        isLoading={isLoading}
        onViewClient={handleViewClient}
        onEditClient={handleEditClient}
        onDeleteClient={handleDeleteClient}
      />

      {/* Modal de detalles */}
      <ClientDetailsModal
        open={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedClient(null);
        }}
        client={selectedClient}
        onEdit={handleEditClient}
      />

      {/* Modal de agregar/editar */}
      <AddClientModal
        open={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingClient(null);
        }}
        onSave={handleSaveClient}
        editClient={editingClient}
      />

      {/* Modal de confirmación de eliminación */}
      <Dialog
        open={!!deletingClient}
        onClose={() => setDeletingClient(null)}
        PaperProps={{
          sx: { borderRadius: '20px' }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={700}>
            Confirmar Eliminación
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el cliente "{deletingClient?.name}"?
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setDeletingClient(null)}
            variant="outlined"
            sx={{
              borderColor: '#E2E8F0',
              color: '#4A5568'
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={confirmDeleteClient}
            variant="contained"
            color="error"
            disabled={isLoading}
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default HRClients;