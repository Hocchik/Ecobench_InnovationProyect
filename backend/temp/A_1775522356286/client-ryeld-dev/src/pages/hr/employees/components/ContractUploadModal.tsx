import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  TextField,
  Grid2 as Grid,
  Paper,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Description as DocumentIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { Employee } from '../data/interfaces';

interface ContractUploadModalProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export function ContractUploadModal({ 
  open, 
  onClose, 
  employee 
}: ContractUploadModalProps) {
  const [uploadData, setUploadData] = useState({
    file: null as File | null,
    description: ''
  });

  if (!employee) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUploadData(prev => ({ ...prev, file }));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadData(prev => ({ ...prev, description: event.target.value }));
  };

  const handleUploadSubmit = () => {
    // TODO: Implementar subida de contrato
    console.log('Subir contrato:', uploadData);
    onClose();
    setUploadData({
      file: null,
      description: ''
    });
  };

  const handleClose = () => {
    setUploadData({
      file: null,
      description: ''
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px'
        }
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#F8FAFC',
        borderBottom: '1px solid #F1F5F9'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <DocumentIcon sx={{ color: '#476797' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559' }}>
              Subir Contrato
            </Typography>
            <Typography variant="body2" sx={{ color: '#476797' }}>
              {employee.name}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: '#476797' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Información del empleado */}
          <Grid size={12}>
            <Paper sx={{ p: 2, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1B2559', mb: 1 }}>
                Información del Empleado
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#476797' }}>
                  Nombre:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {employee.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#476797' }}>
                  Área:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {employee.areaName}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#476797' }}>
                  Rol:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {employee.roleName}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Subida de archivo */}
          <Grid size={12}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1B2559', mb: 2 }}>
              Seleccionar Archivo del Contrato
            </Typography>
            
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                border: '2px dashed #E2E8F0',
                bgcolor: uploadData.file ? '#F0FDF4' : '#FAFAFA',
                borderColor: uploadData.file ? '#476797' : '#E2E8F0',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#476797',
                  bgcolor: '#F8FAFC'
                }
              }}
              component="label"
            >
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              
              <CloudUploadIcon 
                sx={{ 
                  fontSize: 48, 
                  color: uploadData.file ? '#476797' : '#94A3B8', 
                  mb: 2 
                }} 
              />
              
              {uploadData.file ? (
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#476797', mb: 1 }}>
                    Archivo seleccionado:
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#476797', mb: 2 }}>
                    {uploadData.file.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#476797' }}>
                    Tamaño: {(uploadData.file.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#1B2559', mb: 1 }}>
                    Haz clic para seleccionar un archivo
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#476797' }}>
                    Formatos aceptados: PDF, DOC, DOCX
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Descripción */}
          <Grid size={12}>
            <TextField
              fullWidth
              label="Descripción del Contrato (opcional)"
              multiline
              rows={3}
              value={uploadData.description}
              onChange={handleDescriptionChange}
              placeholder="Ej: Contrato inicial de trabajo, Renovación de contrato, etc."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
            />
          </Grid>

          {/* Información adicional */}
          <Grid size={12}>
            <Alert severity="info" sx={{ borderRadius: '8px' }}>
              <Typography variant="body2">
                <strong>Importante:</strong> El archivo se guardará de forma segura y solo será 
                accesible por el personal autorizado de Recursos Humanos.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: '#F8FAFC' }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: '#476797',
            color: '#476797',
            '&:hover': {
              borderColor: '#475569',
              bgcolor: 'rgba(100, 116, 139, 0.04)'
            }
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleUploadSubmit}
          variant="contained"
          disabled={!uploadData.file}
          sx={{
            bgcolor: '#476797',
            '&:hover': { bgcolor: '#3A5478' },
            '&:disabled': {
              bgcolor: '#E2E8F0',
              color: '#94A3B8'
            }
          }}
        >
          Subir Contrato
        </Button>
      </DialogActions>
    </Dialog>
  );
}
