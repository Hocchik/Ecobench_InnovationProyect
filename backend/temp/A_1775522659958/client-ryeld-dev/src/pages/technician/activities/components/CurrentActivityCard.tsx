import {
  Box,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';
import { useContext, useRef, useState } from 'react';
import { TechActivityContext } from '../context/TechActivityContext';
import { ActivityGET } from '../data/interface/activityinterfaces';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

interface CurrentActivityCardProps {
  activity: ActivityGET;
  onFinish: (file: File, activityId: string) => void;
  refresh: () => void;
}

const CurrentActivityCard = ({ activity, onFinish, refresh }: CurrentActivityCardProps) => {
  const { startActivity } = useContext(TechActivityContext);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleStart = () => {
    startActivity(activity.id_activity);
    setFeedbackMsg('Actividad iniciada');
    refresh();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleFinish = () => {
    if (selectedFile) {
      onFinish(selectedFile, activity.id_activity);
      setFeedbackMsg('Actividad finalizada');
      setSelectedFile(null);
      setPreviewURL(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      refresh();
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid #E0E0E0',
        borderRadius: 3,
        bgcolor: '#F6FFF4',
        boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
        p: 2.5,
        mb: 2.5
      }}
    >
      {/* Encabezado */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          🏢 {activity.company}
        </Typography>
        <Box
          sx={{
            bgcolor: activity.type === 'Preventivo' ? '#A9F2A3' : '#F2BCA3',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontWeight: 500,
            fontSize: '0.85rem',
            color: '#1B2559'
          }}
        >
          {activity.type}
        </Box>
      </Stack>

      {/* Detalles técnicos */}
      <Stack spacing={1}>
        <Typography sx={{ fontSize: '0.95rem', color: '#1B2559' }}>
          📍 <strong>Lugar:</strong> {activity.location}
        </Typography>
        <Typography sx={{ fontSize: '0.95rem', color: '#1B2559' }}>
          🕒 <strong>Hora:</strong> {activity.time}
        </Typography>
      </Stack>

      {/* Estado dinámico */}
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {activity.status === 'Pendiente' && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            sx={{ borderRadius: 2 }}
          >
            Iniciar Actividad
          </Button>
        )}

        {activity.status === 'En curso' && (
          <>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCameraIcon />}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              {selectedFile ? `Archivo: ${selectedFile.name}` : 'Seleccionar evidencia'}
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </Button>

            {previewURL && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={previewURL}
                  alt="Vista previa"
                  style={{
                    maxWidth: '100%',
                    borderRadius: 8,
                    boxShadow: '0 2px 6px #0002'
                  }}
                />
              </Box>
            )}

            <Button
              variant="contained"
              color="success"
              onClick={handleFinish}
              disabled={!selectedFile}
              sx={{ borderRadius: 2 }}
            >
              Finalizar Actividad
            </Button>
          </>
        )}

        {activity.status === 'Finalizado' && (
          <Typography color="success.main" sx={{ fontWeight: 500 }}>
            ✅ Actividad finalizada
          </Typography>
        )}
      </Box>

      {/* Snackbar de feedback */}
      <Snackbar
        open={!!feedbackMsg}
        autoHideDuration={3000}
        onClose={() => setFeedbackMsg(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" onClose={() => setFeedbackMsg(null)} sx={{ width: '100%' }}>
          {feedbackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CurrentActivityCard;