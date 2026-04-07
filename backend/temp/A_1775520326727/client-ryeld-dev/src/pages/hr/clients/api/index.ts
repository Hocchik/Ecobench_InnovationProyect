/**
 * API del módulo de Clientes para HR
 * Endpoints relacionados con la gestión de clientes
 */

import { Client } from '../data/clientsData';

// TODO: Implementar cuando el backend esté disponible
// Por ahora simula operaciones con datos mock

export const getClients = async (): Promise<Client[]> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { clientsData } = await import('../data/clientsData');
  return clientsData;
};

export const createClient = async (clientData: Omit<Client, 'id'>): Promise<Client> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newClient: Client = {
    ...clientData,
    id: `CL${String(Date.now()).slice(-3).padStart(3, '0')}`
  };
  
  // TODO: Enviar al backend
  console.log('Creating client:', newClient);
  
  return newClient;
};

export const updateClient = async (id: string, clientData: Partial<Client>): Promise<Client> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // TODO: Actualizar en el backend
  console.log('Updating client:', id, clientData);
  
  const { clientsData } = await import('../data/clientsData');
  const existingClient = clientsData.find(client => client.id === id);
  
  if (!existingClient) {
    throw new Error('Cliente no encontrado');
  }
  
  const updatedClient = { ...existingClient, ...clientData };
  return updatedClient;
};

export const deleteClient = async (id: string): Promise<void> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // TODO: Eliminar del backend
  console.log('Deleting client:', id);
};

export const getClientById = async (id: string): Promise<Client | null> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const { clientsData } = await import('../data/clientsData');
  return clientsData.find(client => client.id === id) || null;
};
