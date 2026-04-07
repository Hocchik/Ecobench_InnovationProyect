import {
  Modal,
  Paper,
  Typography,
  Box,
  IconButton,
  Divider,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
import {
  ToolRequestGET,
  InventoryItem,
  ToolRequestStatus
} from '../api/SupInventoryInterfaces';
import { useSupInventory } from '../context/SupInventoryContext';

interface ItemDetailsModalProps {
  open: boolean;
  onClose: () => void;
  item: InventoryItem | ToolRequestGET | null;
  isRequest: boolean;
  getStatusColor: (status: string) => { bg: string; color: string };
}

export const ItemDetailsModal = ({
  open,
  onClose,
  item,
  isRequest,
  getStatusColor
}: ItemDetailsModalProps) => {
  const [status, setStatus] = useState(item?.status ?? 'Pending');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { updateToolRequest, deleteToolRequest } = useSupInventory();

  if (!item) return null;

  const isToolRequest = (data: InventoryItem | ToolRequestGET): data is ToolRequestGET =>
    'id_tool_request' in data;

  const handleUpdate = async () => {
    if (isToolRequest(item)) {
      try {
        await updateToolRequest({
          idToolRequest: item.id_tool_request,
          status: status as ToolRequestStatus
        });
        onClose();
      } catch (error: any) {
        setErrorMessage(error?.message || 'Error al actualizar la solicitud');
      }
    }
  };

  const handleDelete = async () => {
    if (isToolRequest(item)) {
      try {
        await deleteToolRequest(item.id_tool_request);
        setShowDeleteModal(false);
        onClose();
      } catch (error: any) {
        setShowDeleteModal(false);
        setErrorMessage(error?.message || 'Error al eliminar la solicitud');
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        sx={{
          width: '90%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflow: 'auto',
          p: 3,
          borderRadius: '20px'
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#1B2559', fontWeight: 600 }}>
            {isRequest ? 'Detalles de la Solicitud' : 'Detalles del Artículo'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Solicitud */}
        {isToolRequest(item) ? (
          <>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Número de Cargo</Typography>
                <Typography variant="body1">{item.request_number}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Fecha</Typography>
                <Typography variant="body1">{item.date}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Técnico</Typography>
                <Typography variant="body1">{typeof item.technician === 'string' ? item.technician : 'Sin nombre'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Estado</Typography>
                {item.status === 'Pending' ? (
                  <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                    <Select value={status} onChange={e => setStatus(e.target.value)}>
                      <MenuItem value="Pending">Pendiente</MenuItem>
                      <MenuItem value="Approved">Aprobado</MenuItem>
                      <MenuItem value="Denied">Denegado</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Chip
                    label={item.status}
                    sx={{
                      mt: 1,
                      bgcolor: getStatusColor(item.status).bg,
                      color: getStatusColor(item.status).color
                    }}
                  />
                )}
              </Grid>
            </Grid>

            {/* Items Solicitados */}
            {item.items && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Items Solicitados
                </Typography>
                {item.items.map((toolItem, index) => (
                  <Box key={index} sx={{ mb: 1, pl: 1, borderLeft: '2px solid #E0E3E7' }}>
                    <Typography variant="body2">
                      {toolItem.name_item} - Cantidad: {toolItem.request_quantity}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Acciones */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button onClick={() => setShowDeleteModal(true)} color="error" variant="outlined">
                Eliminar
              </Button>
              {item.status === 'Pending' && (
                <Button
                  onClick={handleUpdate}
                  variant="contained"
                  sx={{
                    bgcolor: '#476797',
                    borderRadius: '8px',
                    px: 3,
                    '&:hover': { bgcolor: '#3A5478' }
                  }}
                >
                  Actualizar Estado
                </Button>
              )}
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{
                  color: '#476797',
                  borderColor: '#476797',
                  borderRadius: '8px',
                  px: 3,
                  '&:hover': {
                    borderColor: '#476797',
                    bgcolor: 'rgba(71, 103, 151, 0.04)'
                  }
                }}
              >
                Cerrar
              </Button>
            </Box>

            {/* Modal de confirmación */}
            <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
              <DialogTitle>¿Seguro que deseas eliminar esta solicitud?</DialogTitle>
              <DialogContent>Esta acción no se puede deshacer.</DialogContent>
              <DialogActions>
                <Button onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
                <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
              </DialogActions>
            </Dialog>

            {/* Modal de error */}
            <Dialog open={!!errorMessage} onClose={() => setErrorMessage(null)}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <Typography>{errorMessage}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setErrorMessage(null)} autoFocus>
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          // Artículo
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Nombre del Artículo</Typography>
              <Typography variant="body1">{item.name_item}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Código</Typography>
              <Typography variant="body1">{item.code_item}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Categoría</Typography>
              <Typography variant="body1">{item.category}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Cantidad</Typography>
              <Typography variant="body1">{item.total_quantity}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Estado</Typography>
              <Chip
                label={item.status === 'OutOfStock' ? 'Sin stock' : item.status}
                sx={{
                  mt: 1,
                  bgcolor: getStatusColor(item.status).bg,
                  color: getStatusColor(item.status).color
                }}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
    </Modal>
  );
};