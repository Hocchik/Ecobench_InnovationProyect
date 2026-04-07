import { useState, useEffect } from 'react';
import { ManagerClient } from '../types/clientTypes';
import { managerClientsService } from '../api/clientsService';

export const useManagerClients = () => {
  const [clients, setClients] = useState<ManagerClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await managerClientsService.getClients();
      setClients(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar los clientes';
      setError(errorMessage);
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const refetchClients = () => {
    fetchClients();
  };

  return {
    clients,
    loading,
    error,
    refetchClients
  };
};
