import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Paper,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Domain } from '@mui/icons-material';
import { useStaffContext } from '../context/StaffContext';
import { createAreasColumns } from '../data/areasData';
import { AreaModal } from './AreaModal';
import { Area } from '../types/areaTypes';

export const AreasTable: React.FC = () => {
  const {
    areasTableData: tableData,
    areasLoading: loading,
    areasError: error,
    getAreaById,
    createArea,
    updateArea,
    deleteArea,
  } = useStaffContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState<string | null>(null);

  const handleCreate = () => {
    setModalMode('create');
    setSelectedArea(null);
    setModalOpen(true);
  };

  const handleEdit = (areaId: string) => {
    const area = getAreaById(areaId);
    if (area) {
      setSelectedArea(area);
      setModalMode('edit');
      setModalOpen(true);
    }
  };

  const handleDelete = (areaId: string) => {
    setAreaToDelete(areaId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (areaToDelete) {
      await deleteArea(areaToDelete);
      setDeleteDialogOpen(false);
      setAreaToDelete(null);
    }
  };

  const handleModalSubmit = async (data: any) => {
    if (modalMode === 'create') {
      return await createArea(data);
    } else if (selectedArea) {
      return await updateArea(selectedArea.id, data);
    }
    return false;
  };

  const columns = createAreasColumns(handleEdit, handleDelete);

  return (
    <Box sx={{ flex: 1, minHeight: 0, width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Domain sx={{ color: '#476797', fontSize: 28 }} />
          <Typography variant="h5" fontWeight={600} color="#1B2559">
            Gestión de Áreas
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreate}
          sx={{
            bgcolor: '#476797',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              bgcolor: '#3A5478',
            },
          }}
        >
          Nueva Área
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
          {error}
        </Alert>
      )}

      {/* Tabla */}
      <Paper 
        elevation={0} 
        sx={{ 
          flex: 1,
          minHeight: 0,
          border: '1px solid #E2E8F0',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        }}
      >
        <DataGrid
          rows={tableData}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#F8F9FF',
              borderBottom: '2px solid #E2E8F0',
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
                color: '#476797',
              },
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #E2E8F0',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#F8F9FF',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '2px solid #E2E8F0',
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Paper>

      {/* Modal de crear/editar */}
      <AreaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        area={selectedArea}
        mode={modalMode}
      />

      {/* Dialog de confirmación de eliminar */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: '20px' }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Confirmar Eliminación
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar esta área? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
