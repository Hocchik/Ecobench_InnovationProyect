import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add, PersonAdd, Edit, PersonOff, Group, Visibility, PersonAddAlt1 } from '@mui/icons-material';
import { useStaffContext } from '../context/StaffContext';
import { useEmployeeManagement } from '../hooks/useEmployeeManagement';
import { EmployeeModal } from './EmployeeModal';
import { UserAssignmentModal } from './UserAssignmentModal';
import { UserDetailsModal } from './UserDetailsModal';
import { EmployeeCreateResponse } from '../types/employeeTypes';
import { employeesManagementServices } from '../api/services/employeesManagementServices';

export const EmployeesManagementTable: React.FC = () => {
  const {
    employeesTableData: tableData,
    employees,
    employeesLoading,
    employeesError,
    refetchEmployees,
    roles,
  } = useStaffContext();
  const {
    loading: managementLoading,
    error: managementError,
    createEmployee,
    updateEmployee,
    deactivateEmployee,
    activateEmployee,
    deactivateUser,
    activateUser,
    createUser,
    clearError
  } = useEmployeeManagement();

  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeCreateResponse | null>(null);
  const [newEmployee, setNewEmployee] = useState<EmployeeCreateResponse | null>(null);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [employeeToDeactivate, setEmployeeToDeactivate] = useState<string | null>(null);
  const [employeeToActivate, setEmployeeToActivate] = useState<string | null>(null);
  const [userDetailsModalOpen, setUserDetailsModalOpen] = useState(false);
  const [selectedEmployeeForDetails, setSelectedEmployeeForDetails] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive' | 'all'>('active');

  // Filter employees based on status
  const filteredTableData = React.useMemo(() => {
    switch (statusFilter) {
      case 'active':
        return tableData.filter(emp => emp.status === true);
      case 'inactive':
        return tableData.filter(emp => emp.status === false);
      case 'all':
      default:
        return tableData;
    }
  }, [tableData, statusFilter]);

  const handleCreateEmployee = () => {
    setModalMode('create');
    setSelectedEmployee(null);
    setEmployeeModalOpen(true);
  };

  const handleEditEmployee = async (employeeId: string) => {
    setModalMode('edit');
    try {
      const data = await employeesManagementServices.getEmployeeById(employeeId);
      const mapped: EmployeeCreateResponse = {
        employeeId: data.id,
        fullName: data.fullName,
        dni: data.dni,
        phone: data.phone,
        personalEmail: data.personalEmail,
        workEmail: data.workEmail,
        address: data.address,
        birthDate: data.birthDate,
        hireDate: data.hireDate,
        status: data.status,
        profilePicture: data.profilePicture,
      };
      setSelectedEmployee(mapped);
      setEmployeeModalOpen(true);
    } catch (e) {
      console.error('Error fetching employee for edit', e);
    }
  };

  const handleDeactivateEmployee = (employeeId: string) => {
    setEmployeeToDeactivate(employeeId);
    setDeactivateDialogOpen(true);
  };

  const confirmDeactivate = async () => {
    if (employeeToDeactivate) {
      // Find employee data to check if has user
      const employee = filteredTableData.find((emp: any) => emp.id === employeeToDeactivate);
      
      const employeeSuccess = await deactivateEmployee(employeeToDeactivate);
      
      // If employee has user, also deactivate the user
      if (employeeSuccess && employee?.hasUser && employee?.userId) {
        await deactivateUser(employee.userId);
      }
      
      if (employeeSuccess) {
        refetchEmployees();
      }
      setDeactivateDialogOpen(false);
      setEmployeeToDeactivate(null);
    }
  };

  const handleActivateEmployee = (employeeId: string) => {
    setEmployeeToActivate(employeeId);
    setActivateDialogOpen(true);
  };

  const confirmActivate = async () => {
    if (employeeToActivate) {
      // Find employee data to check if has user
      const employee = filteredTableData.find((emp: any) => emp.id === employeeToActivate);
      
      const employeeSuccess = await activateEmployee(employeeToActivate);
      
      // If employee has user, also activate the user
      if (employeeSuccess && employee?.hasUser && employee?.userId) {
        await activateUser(employee.userId);
      }
      
      if (employeeSuccess) {
        refetchEmployees();
      }
      setActivateDialogOpen(false);
      setEmployeeToActivate(null);
    }
  };

  const handleEmployeeSubmit = async (data: any) => {
    if (modalMode === 'create') {
      const result = await createEmployee(data);
      if (result) {
        setNewEmployee(result);
        setEmployeeModalOpen(false);
        setUserModalOpen(true);
        refetchEmployees();
        return result;
      }
    } else if (selectedEmployee) {
      const result = await updateEmployee(selectedEmployee.employeeId, data);
      if (result) {
        refetchEmployees();
        return result;
      }
    }
    return null;
  };

  const handleUserSubmit = async (data: any) => {
    const result = await createUser(data);
    if (result) {
      refetchEmployees();
    }
    return result;
  };

  const handleShowUserDetails = (employeeId: string) => {
    const employee = filteredTableData.find((emp: any) => emp.id === employeeId);
    if (employee && employee.hasUser) {
      // Find full employee data from the employees array (EmployeeWithUser)
      const fullEmployee = employees.find((emp: any) => emp.id === employeeId);
      setSelectedEmployeeForDetails(fullEmployee);
      setUserDetailsModalOpen(true);
    }
  };

  const handleAssignUser = (employeeId: string) => {
    // Find employee data from the detailed employees list
    const employee = filteredTableData.find((emp: any) => emp.id === employeeId);
    if (employee) {
      const employeeForModal: EmployeeCreateResponse = {
        employeeId: employee.id,
        fullName: employee.fullName,
        dni: employee.dni,
        phone: employee.phone,
        personalEmail: employee.personalEmail,
        workEmail: employee.workEmail,
        address: '',
        birthDate: '',
        hireDate: employee.hireDate,
        status: employee.status ? 'ACTIVE' : 'INACTIVE',
        profilePicture: null,
      };
      setNewEmployee(employeeForModal);
      setUserModalOpen(true);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Nombre',
      flex: 1.3,
      filterable: true,
      headerAlign: 'center'
    },
    {
      field: 'dni',
      headerName: 'DNI',
      flex: 0.85,
      filterable: true,
      headerAlign: 'center'
    },
    {
      field: 'personalEmail',
      headerName: 'Email',
      flex: 1.0,
      filterable: true,
      headerAlign: 'center'
    },
    {
      field: 'workEmail',
      headerName: 'Email Corp.',
      flex: 1.0,
      filterable: true,
      headerAlign: 'center'
    },
    {
      field: 'phone',
      headerName: 'Teléfono',
      flex: 1.05,
      filterable: true,
      headerAlign: 'center'
    },
    {
      field: 'userCode',
      headerName: 'Usuario',
      flex: 0.7,
      filterable: true,
      headerAlign: 'center',
      renderCell: (params) => (
        params.row.hasUser ? (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              }
            }}
            onClick={() => handleShowUserDetails(params.row.id)}
          >
            <Typography variant="body2" fontWeight={600} color="primary.main">
              {params.row.userCode}
            </Typography>
            <Visibility sx={{ fontSize: 16, color: 'primary.main', mt: 0.5 }} />
          </Box>
        ) : (
          <Typography variant="caption" color="text.secondary">
            Sin usuario
          </Typography>
        )
      )
    },
    {
      field: 'roleName',
      headerName: 'Rol',
      flex: 0.9,
      filterable: true,
      headerAlign: 'center',
      renderCell: (params) => (
        params.row.roleName ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" fontWeight={600}>
              {params.row.roleName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.areaName}
            </Typography>
          </Box>
        ) : (
          <Typography variant="caption" color="text.secondary">
            Sin rol
          </Typography>
        )
      )
    },
    {
      field: 'hireDate',
      headerName: 'Ingreso',
      flex: 0.85,
      filterable: true,
      headerAlign: 'center',
      valueFormatter: (value: any) => {
        if (value) {
          return new Date(value).toLocaleDateString('es-ES');
        }
        return '';
      }
    },
    {
      field: 'status',
      headerName: 'Estado',
      flex: 0.75,
      filterable: true,
      headerAlign: 'center',
      renderCell: (params) => (
        <Chip
          label={params.row.status ? 'Activo' : 'Inactivo'}
          color={params.row.status ? 'success' : 'error'}
          size="small"
          variant="outlined"
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1.1,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
          <Tooltip title="Editar empleado">
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleEditEmployee(params.row.id.toString())}
              sx={{ minWidth: 'auto', width: 30, height: 30, p: 0 }}
            >
              <Edit sx={{ fontSize: 16 }} />
            </Button>
          </Tooltip>
          
          {!params.row.hasUser && (
            <Tooltip title="Asignar usuario">
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => handleAssignUser(params.row.id.toString())}
                sx={{ minWidth: 'auto', width: 30, height: 30, p: 0 }}
              >
                <PersonAdd sx={{ fontSize: 16 }} />
              </Button>
            </Tooltip>
          )}
          
          {params.row.status && (
            <Tooltip title="Desactivar">
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDeactivateEmployee(params.row.id.toString())}
                sx={{ minWidth: 'auto', width: 30, height: 30, p: 0 }}
              >
                <PersonOff sx={{ fontSize: 16 }} />
              </Button>
            </Tooltip>
          )}

          {!params.row.status && (
            <Tooltip title="Activar">
              <Button
                size="small"
                variant="outlined"
                color="success"
                onClick={() => handleActivateEmployee(params.row.id.toString())}
                sx={{ minWidth: 'auto', width: 30, height: 30, p: 0 }}
              >
                <PersonAddAlt1 sx={{ fontSize: 16 }} />
              </Button>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ flex: 1, minHeight: 0, width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Group sx={{ color: '#476797', fontSize: 28 }} />
          <Typography variant="h5" fontWeight={600} color="#1B2559">
            Gestión de Empleados
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={statusFilter}
              label="Estado"
              onChange={(e) => setStatusFilter(e.target.value as 'active' | 'inactive' | 'all')}
            >
              <MenuItem value="active">Activos</MenuItem>
              <MenuItem value="inactive">Inactivos</MenuItem>
              <MenuItem value="all">Todos</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateEmployee}
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
            Nuevo Empleado
          </Button>
        </Box>
      </Box>

      {(employeesError || managementError) && (
        <Alert 
          severity="error" 
          sx={{ mb: 2, borderRadius: '8px' }}
          onClose={clearError}
        >
          {employeesError || managementError}
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
          rows={filteredTableData}
          columns={columns}
          loading={employeesLoading || managementLoading}
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

      {/* Employee Modal */}
      <EmployeeModal
        open={employeeModalOpen}
        onClose={() => setEmployeeModalOpen(false)}
        onSubmit={handleEmployeeSubmit}
        employee={selectedEmployee}
        mode={modalMode}
      />

      {/* User Assignment Modal */}
      {newEmployee && (
        <UserAssignmentModal
          open={userModalOpen}
          onClose={() => {
            setUserModalOpen(false);
            setNewEmployee(null);
          }}
          onSubmit={handleUserSubmit}
          employee={newEmployee}
          roles={roles}
        />
      )}

      {/* Deactivate Confirmation Dialog */}
      <Dialog
        open={deactivateDialogOpen}
        onClose={() => setDeactivateDialogOpen(false)}
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: '20px' }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Confirmar Desactivación
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas desactivar este empleado? Esta acción afectará su acceso al sistema.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setDeactivateDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={confirmDeactivate}
            variant="contained"
            color="error"
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Desactivar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Activate Employee Dialog */}
      <Dialog
        open={activateDialogOpen}
        onClose={() => setActivateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '20px' }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Confirmar Activación
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas activar este empleado? Esto le dará acceso nuevamente al sistema.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setActivateDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={confirmActivate}
            variant="contained"
            color="success"
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Activar
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Details Modal */}
      {selectedEmployeeForDetails && (
        <UserDetailsModal
          open={userDetailsModalOpen}
          onClose={() => {
            setUserDetailsModalOpen(false);
            setSelectedEmployeeForDetails(null);
          }}
          employeeName={selectedEmployeeForDetails.fullName}
          workEmail={selectedEmployeeForDetails.workEmail}
          userCode={selectedEmployeeForDetails.userCode}
          userStatus={selectedEmployeeForDetails.userStatus}
          roleName={selectedEmployeeForDetails.userRoleName}
          areaName={selectedEmployeeForDetails.areaName}
        />
      )}

      {/* Removed floating + button as requested */}
    </Box>
  );
};