import { useState, useEffect } from 'react';
import { ClientDetail } from '../types/clientTypes';
import { managerClientsService } from '../api/clientsService';

export const useClientDetail = (clientId: string | null) => {
  const [clientDetail, setClientDetail] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientDetail = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await managerClientsService.getClientDetail(id);
      setClientDetail(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar el detalle del cliente';
      setError(errorMessage);
      console.error('Error fetching client detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchClientDetail(clientId);
    } else {
      setClientDetail(null);
      setError(null);
    }
  }, [clientId]);

  const refetchClientDetail = () => {
    if (clientId) {
      fetchClientDetail(clientId);
    }
  };

  return {
    clientDetail,
    loading,
    error,
    refetchClientDetail
  };
};
