import axios from '../../../../api/axios';

import { ActivityGET/* , FinishActivityPOST  */} from '../data/interface/activityinterfaces';
type UUID = string;
const BASE_URL = "/technician/activity";

// Simulación de fetch a la API
export const getActivities = async (id_employee: UUID): Promise<ActivityGET[]> => {
  try {
    const response = await axios.post<ActivityGET[]>(`${BASE_URL}/allactivities`, id_employee, {
      headers: { 'Content-Type': 'application/json' }
    });

    const activities = response.data?.filter(act => act.id_activity && act.status) ?? [];

    return activities.map(act => ({
      ...act,
      image_base64: act.image_base64 || undefined,
      image_url: act.image_url || undefined
    }));
  } catch (error: any) {
    console.error('❌ Error al obtener actividades:', error.response?.data || error.message);
    return [];
  }
};


export const finishActivity = async (
  id_activity: UUID,
  file: File
): Promise<{ success: boolean }> => {
  try {

    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten archivos de imagen.");
      return { success: false };
    }

    const formData = new FormData();
    formData.append("id_activity", String(id_activity)); // Esto fuerza el tipo primitivo
    formData.append("file", file);

    const response = await axios.put(`${BASE_URL}/finishactivity`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('✅ Actividad finalizada:', response.data);
    return { success: response.data };
  } catch (error: any) {
    console.error('❌ Error al finalizar actividad:', error.response?.data || error.message);
    throw error;
  }

/* console.log('Finalizando actividad:', data);
  return { success: true }; */
};