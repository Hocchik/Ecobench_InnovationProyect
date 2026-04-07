import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useMaintenances } from './hooks/useMaintenances';
import { MaintenanceHeader } from './components/MaintenanceHeader';
import { MaintenanceTable } from './components/MaintenanceTable';
import { MaintenanceDetailsModal } from './components/MaintenanceDetailsModal';
import { MaintenanceFormModal } from './components/MaintenanceFormModal';
import { Maintenance, MaintenanceFormData } from './types/maintenanceTypes';
import { stats } from './data/statsData';

function ManagerMaintenance() {  const {
    filteredMaintenances,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    addMaintenance,
    updateMaintenance,
    deleteMaintenance
  } = useMaintenances();

  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState<Maintenance | null>(null);

  const handleViewDetails = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (maintenance: Maintenance) => {
    setEditingMaintenance(maintenance);
    setIsFormModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMaintenance(id);
  };

  const handleAddNew = () => {
    setEditingMaintenance(null);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (formData: MaintenanceFormData) => {
    if (editingMaintenance) {
      updateMaintenance(editingMaintenance.id, formData);
    } else {
      addMaintenance(formData);
    }
    setIsFormModalOpen(false);
    setEditingMaintenance(null);
  };

  const handleFormCancel = () => {
    setIsFormModalOpen(false);
    setEditingMaintenance(null);
  };

  const handleDetailsClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedMaintenance(null);
  };

  return (
    <Box sx={{
      height: '100%',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '4px',
        backgroundColor: 'transparent'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '4px'
      },
      '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.2)'
      },
      paddingBottom: '10px'
    }}>      {/* Stats Cards */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          overflowX: 'auto',
          gap: 2,
          pb: 1,
        }}
      >
        {stats.map((stat, index) => (
          <Paper
            key={index}
            sx={{
              minWidth: 250,
              flexShrink: 0,
              p: 2,
              borderRadius: '20px',
              boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
              position: 'relative',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              {stat.title}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {stat.total}
            </Typography>
          </Paper>
        ))}
      </Box>
      
      <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, p: 1 }}>
        {stats.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: '20px',
                boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
                position: 'relative',
                height: '100%',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {stat.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {stat.total}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid size={12} sx={{ p: 3 }}>
        <MaintenanceHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          onAddNew={handleAddNew}
        />
        
        <MaintenanceTable
          maintenances={filteredMaintenances}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Grid>

      {/* Modals */}
      <MaintenanceDetailsModal
        open={isDetailsModalOpen}
        maintenance={selectedMaintenance}
        onClose={handleDetailsClose}
      />
      
      <MaintenanceFormModal
        open={isFormModalOpen}
        maintenance={editingMaintenance}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    </Box>
  );
}

export default ManagerMaintenance;