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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Assignment, FilterList } from '@mui/icons-material';
import { useStaffContext } from '../context/StaffContext';
import { createRolesColumns } from '../data/rolesData';
import { RoleModal } from './RoleModal';
import { Role } from '../types/roleTypes';

export const RolesTable: React.FC = () => {
  const {
    areas,
    rolesTableData: tableData,
    rolesLoading: loading,
    rolesError: error,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    fetchRolesByArea,
    refetchRoles: refetch,
  } = useStaffContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('all');

  const handleCreate = () => {
    setModalMode('create');
    setSelectedRole(null);
    setModalOpen(true);
  };

  const handleEdit = (roleId: string) => {
    const role = getRoleById(roleId);
    if (role) {
      setSelectedRole(role);
      setModalMode('edit');
      setModalOpen(true);
    }
  };

  const handleDelete = (roleId: string) => {
    setRoleToDelete(roleId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (roleToDelete) {
      await deleteRole(roleToDelete);
      setDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleModalSubmit = async (data: any) => {
    if (modalMode === 'create') {
      return await createRole(data);
    } else if (selectedRole) {
      return await updateRole(selectedRole.id, data);
    }
    return false;
  };

  const handleAreaFilter = (areaId: string) => {
    setSelectedAreaFilter(areaId);
    if (areaId === 'all') {
      refetch();
    } else {
      fetchRolesByArea(areaId);
    }
  };

  const filteredData = selectedAreaFilter === 'all' 
    ? tableData 
    : tableData.filter(role => role.areaId === selectedAreaFilter);

  const columns = createRolesColumns(handleEdit, handleDelete);

  return (
    <Box sx={{ flex: 1, minHeight: 0, width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Assignment sx={{ color: '#476797', fontSize: 28 }} />
          <Typography variant="h5" fontWeight={600} color="#1B2559">
            Gestión de Roles
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Filtrar por Área</InputLabel>
            <Select
              value={selectedAreaFilter}
              onChange={(e) => handleAreaFilter(e.target.value)}
              label="Filtrar por Área"
              startAdornment={<FilterList sx={{ mr: 1, color: 'action.active' }} />}
            >
              <MenuItem value="all">Todas las áreas</MenuItem>
              {areas.map((area) => (
                <MenuItem key={area.id} value={area.id}>
                  {area.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreate}
            disabled={areas.length === 0}
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
            Nuevo Rol
          </Button>
        </Box>
      </Box>

      {areas.length === 0 && (
        <Alert severity="warning" sx={{ mb: 2, borderRadius: '8px' }}>
          Debes crear al menos un área antes de poder crear roles.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
          {error}
        </Alert>
      )}

      {/* Información del filtro activo */}
      {selectedAreaFilter !== 'all' && (
        <Box sx={{ mb: 2 }}>
          <Chip
            label={`Mostrando roles de: ${areas.find(a => a.id === selectedAreaFilter)?.name}`}
            onDelete={() => handleAreaFilter('all')}
            color="primary"
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          />
        </Box>
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
          rows={filteredData}
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
      <RoleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        role={selectedRole}
        areas={areas}
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
            ¿Estás seguro de que deseas eliminar este rol? Esta acción no se puede deshacer.
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
