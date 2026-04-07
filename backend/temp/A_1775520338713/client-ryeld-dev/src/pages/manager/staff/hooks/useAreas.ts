import { useState, useEffect } from 'react';
import { Area, AreaTableRow, CreateAreaRequest, UpdateAreaRequest } from '../types/areaTypes';
import { areasServices } from '../api/services/areasServices';

export const useAreas = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Transformar datos para la tabla
  const transformToTableData = (areas: Area[]): AreaTableRow[] => {
    return areas.map(area => ({
      id: area.id,
      name: area.name,
      description: area.description || '',
      active: area.active,
    }));
  };

  // Obtener área por ID
  const getAreaById = (areaId: string): Area | undefined => {
    return areas.find(area => area.id === areaId);
  };

  // Obtener todas las áreas
  const fetchAreas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await areasServices.getAreas();
      setAreas(data);
    } catch (err) {
      setError('Error al cargar las áreas');
      console.error('Error fetching areas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear área
  const createArea = async (areaData: CreateAreaRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const newArea = await areasServices.createArea(areaData);
      setAreas(prev => [...prev, newArea]);
      return true;
    } catch (err) {
      setError('Error al crear el área');
      console.error('Error creating area:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar área
  const updateArea = async (areaId: string, areaData: UpdateAreaRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedArea = await areasServices.updateArea(areaId, areaData);
      setAreas(prev => prev.map(area => 
        area.id === areaId ? updatedArea : area
      ));
      return true;
    } catch (err) {
      setError('Error al actualizar el área');
      console.error('Error updating area:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar área
  const deleteArea = async (areaId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await areasServices.deleteArea(areaId);
      setAreas(prev => prev.filter(area => area.id !== areaId));
      return true;
    } catch (err) {
      setError('Error al eliminar el área');
      console.error('Error deleting area:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return {
    areas,
    loading,
    error,
    tableData: transformToTableData(areas),
    getAreaById,
    createArea,
    updateArea,
    deleteArea,
    refetch: fetchAreas
  };
};
