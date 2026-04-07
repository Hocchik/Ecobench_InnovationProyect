import { useState, useEffect, useCallback, useMemo } from 'react';
import { Maintenance, MaintenanceFormData } from '../types/maintenanceTypes';
import { 
  getMaintenancesFromStorage, 
  saveMaintenancesToStorage, 
  generateMaintenanceId 
} from '../data/maintenanceData';

export const useMaintenances = () => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  // Cargar mantenimientos al inicializar
  useEffect(() => {
    const loadMaintenances = () => {
      setLoading(true);
      try {
        const data = getMaintenancesFromStorage();
        setMaintenances(data);
      } catch (error) {
        console.error('Error loading maintenances:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMaintenances();
  }, []);
  // Filtered maintenances based on search term, status, and type
  const filteredMaintenances = useMemo(() => {
    return maintenances.filter(maintenance => {
      const matchesSearch = searchTerm === '' || 
        maintenance.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        maintenance.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
        maintenance.ascensorType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        maintenance.technician1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        maintenance.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || maintenance.status === statusFilter;
      const matchesType = typeFilter === 'all' || maintenance.maintenanceType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [maintenances, searchTerm, statusFilter, typeFilter]);

  // Statistics
  const maintenanceStats = useMemo(() => {
    const total = maintenances.length;
    const pending = maintenances.filter(m => m.status === 'Pendiente').length;
    const inProgress = maintenances.filter(m => m.status === 'En Progreso').length;
    const completed = maintenances.filter(m => m.status === 'Completado').length;
    const cancelled = maintenances.filter(m => m.status === 'Cancelado').length;

    return {
      total,
      pending,
      inProgress,
      completed,
      cancelled
    };
  }, [maintenances]);
  // Crear nuevo mantenimiento (rename to match expected API)
  const addMaintenance = useCallback((formData: MaintenanceFormData): Maintenance => {
    const newMaintenance: Maintenance = {
      id: generateMaintenanceId(),
      ...formData
    };

    const updatedMaintenances = [...maintenances, newMaintenance];
    setMaintenances(updatedMaintenances);
    saveMaintenancesToStorage(updatedMaintenances);
    
    return newMaintenance;
  }, [maintenances]);

  // Actualizar mantenimiento existente
  const updateMaintenance = useCallback((id: string, formData: MaintenanceFormData): Maintenance | null => {
    const maintenanceIndex = maintenances.findIndex(m => m.id === id);
    if (maintenanceIndex === -1) return null;

    const updatedMaintenance: Maintenance = {
      id,
      ...formData
    };

    const updatedMaintenances = [...maintenances];
    updatedMaintenances[maintenanceIndex] = updatedMaintenance;
    
    setMaintenances(updatedMaintenances);
    saveMaintenancesToStorage(updatedMaintenances);
    
    return updatedMaintenance;
  }, [maintenances]);

  // Eliminar mantenimiento
  const deleteMaintenance = useCallback((id: string): boolean => {
    const updatedMaintenances = maintenances.filter(m => m.id !== id);
    setMaintenances(updatedMaintenances);
    saveMaintenancesToStorage(updatedMaintenances);
    return true;
  }, [maintenances]);

  // Obtener mantenimiento por ID
  const getMaintenanceById = useCallback((id: string): Maintenance | null => {
    return maintenances.find(m => m.id === id) || null;
  }, [maintenances]);

  // Filtrar mantenimientos por tipo
  const getMaintenancesByType = useCallback((type: string) => {
    if (type === 'all') return maintenances;
    return maintenances.filter(m => m.maintenanceType === type);
  }, [maintenances]);

  // Filtrar mantenimientos por estado
  const getMaintenancesByStatus = useCallback((status: string) => {
    if (status === 'all') return maintenances;
    return maintenances.filter(m => m.status === status);
  }, [maintenances]);

  // Estadísticas de mantenimientos
  const getMaintenanceStats = useCallback(() => {
    const total = maintenances.length;
    const completed = maintenances.filter(m => m.status === 'Completado').length;
    const inProgress = maintenances.filter(m => m.status === 'En Progreso').length;
    const scheduled = maintenances.filter(m => m.status === 'Programado').length;
    const pending = maintenances.filter(m => m.status === 'Pendiente').length;
    
    const preventive = maintenances.filter(m => m.maintenanceType === 'Preventivo').length;
    const corrective = maintenances.filter(m => m.maintenanceType === 'Correctivo').length;
    const urgency = maintenances.filter(m => m.maintenanceType === 'Urgencia').length;
    const emergency = maintenances.filter(m => m.maintenanceType === 'Emergencia').length;

    return {
      total,
      byStatus: { completed, inProgress, scheduled, pending },
      byType: { preventive, corrective, urgency, emergency }
    };
  }, [maintenances]);
  return {
    maintenances,
    filteredMaintenances,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    addMaintenance,
    updateMaintenance,
    deleteMaintenance,
    getMaintenanceById,
    getMaintenancesByType,
    getMaintenancesByStatus,
    getMaintenanceStats,
    maintenanceStats
  };
};
