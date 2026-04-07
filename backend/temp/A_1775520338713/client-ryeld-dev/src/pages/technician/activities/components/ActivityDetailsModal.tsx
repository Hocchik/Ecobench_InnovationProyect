import {
  Modal,
  Paper,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  Button,
  Divider
} from '@mui/material';
import { Close, ImageOutlined } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { ActivityGET } from '../data/interface/activityinterfaces';

interface Props {
  open: boolean;
  onClose: () => void;
  activity: ActivityGET | null;
  onEditEvidence?: (file: File, activityId: string) => void;
}

const ActivityDetailsModal = ({ open, onClose, activity, onEditEvidence }: Props) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!activity) return null;

  const handleUpload = () => {
    if (selectedFile && onEditEvidence) {
      onEditEvidence(selectedFile, activity.id_activity);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const isWithinFourHours = (dateStr: string, timeRange: string): boolean => {
    const [, endTime] = timeRange.split(' - ');
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const [year, month, day] = dateStr.split('-').map(Number);
    const activityEnd = new Date(year, month - 1, day, endHour, endMinute, 0);

    const now = new Date('2025-08-16T15:00:00');

    const diffMs = now.getTime() - activityEnd.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    /* console.log('activityEnd local:', activityEnd.toLocaleString());
    console.log('now local:', now.toLocaleString());
    console.log('Diferencia en horas:', diffHours); */

    return diffHours >= 0 && diffHours <= 5;
  };


  const canEdit = activity.status !== 'Pendiente' && isWithinFourHours(activity.date, activity.time);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', px: 1 }}>
        <Paper
          sx={{
            p: 2.5,
            width: '100%',
            maxWidth: 440,
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            maxHeight: isMobile ? '85vh' : 540,
            overflowY: 'auto',
            bgcolor: '#fefefe',
            boxSizing: 'border-box',
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>📋 Detalle de Actividad</Typography>
            <IconButton onClick={onClose}><Close /></IconButton>
          </Box>

          {/* Información */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.3 }}>
            <InfoRow label="Tipo" value={activity.type} />
            <InfoRow label="Estado" value={activity.status} />
            <InfoRow label="Empresa" value={activity.company} />
            <InfoRow label="Lugar" value={activity.location} />
            <InfoRow label="Hora" value={activity.time} />
            <InfoRow label="Fecha" value={activity.date} />
            {activity.description && <InfoRow label="Descripción" value={activity.description} />}
          </Box>

          {/* Imagen actual */}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>📷 Evidencia Cargada</Typography>
          {activity.image_base64 ? (
            <img
              src={`data:image/jpeg;base64,${activity.image_base64}`}
              alt="Evidencia"
              style={{ width: '100%', borderRadius: 8 }}
            />
          ) : activity.image_url ? (
            <img
              src={activity.image_url}
              alt="Evidencia"
              style={{ width: '100%', borderRadius: 8 }}
            />
          ) : (
            <Box sx={{ color: '#A3AED0', display: 'flex', alignItems: 'center', gap: 1 }}>
              <ImageOutlined />
              <Typography variant="body2">Sin evidencia cargada.</Typography>
            </Box>
          )}
        </Box>


          {/* Sección para editar */}
          {canEdit ? (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                🛠️ Editar Evidencia
              </Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{ textTransform: 'none', justifyContent: 'flex-start', borderRadius: 2 }}
              >
                {selectedFile ? `Archivo: ${selectedFile.name}` : 'Seleccionar nueva imagen'}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={!selectedFile}
                onClick={handleUpload}
                sx={{ borderRadius: 2 }}
              >
                Guardar Evidencia
              </Button>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Solo puedes subir evidencia dentro de las 4 horas posteriores a la actividad.
            </Typography>
          )}
        </Paper>
      </Box>
    </Modal>
  );
};

// Componente auxiliar para los campos
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
    <Typography sx={{ fontWeight: 600 }}>{label}:</Typography>
    <Typography sx={{ fontWeight: 400 }}>{value}</Typography>
  </Box>
);

export default ActivityDetailsModal;