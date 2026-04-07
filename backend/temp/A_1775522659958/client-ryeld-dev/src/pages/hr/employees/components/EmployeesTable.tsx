import { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid2 as Grid
} from '@mui/material';
import {
  Search as SearchIcon,
  FileDownload as FileDownloadIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { GridColDef } from '@mui/x-data-grid';
import { StyledDataGrid } from '../../../manager/inventory/components/StyledDataGrid';
import { Employee, EmployeeFilters, Area, Role } from '../data/interfaces';

interface EmployeesTableProps {
  employees: Employee[];
  areas: Area[];
  roles: Role[];
  onViewDetails: (employeeId: number) => void;
  onViewPayments: (employeeId: number) => void;
}

export function EmployeesTable({ 
  employees, 
  areas, 
  roles, 
  onViewDetails, 
  onViewPayments 
}: EmployeesTableProps) {
  const [filters, setFilters] = useState<EmployeeFilters>({
    search: '',
    area: undefined,
    role: undefined,
    status: 'all'
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: event.target.value }));
  };

  const handleAreaChange = (event: SelectChangeEvent<number>) => {
    setFilters(prev => ({ ...prev, area: event.target.value as number }));
  };

  const handleRoleChange = (event: SelectChangeEvent<number>) => {
    setFilters(prev => ({ ...prev, role: event.target.value as number }));
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setFilters(prev => ({ ...prev, status: event.target.value as 'active' | 'inactive' | 'all' }));
  };

  const handleExport = () => {
    // TODO: Implementar exportación
    console.log('Exportar empleados');
  };

  // Filtrar empleados
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         employee.personalEmail?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         employee.phoneNumber.includes(filters.search);
    
    const matchesArea = !filters.area || employee.areaId === filters.area;
    const matchesRole = !filters.role || employee.roleId === filters.role;
    const matchesStatus = filters.status === 'all' || 
                         (filters.status === 'active' && employee.active) ||
                         (filters.status === 'inactive' && !employee.active);

    return matchesSearch && matchesArea && matchesRole && matchesStatus;
  });

  const getStatusColor = (active: boolean) => {
    return active
      ? { bg: '#E6FAF5', color: '#476797' }
      : { bg: '#FEF2F2', color: '#EF4444' };
  };

  const getAreaColor = (areaName: string) => {
    const colors: Record<string, { bg: string; color: string }> = {
      'Operaciones': { bg: '#E6FAF5', color: '#476797' },
      'Administrativa': { bg: '#E3F2FD', color: '#476797' },
      'Gerencial': { bg: '#FFF6E5', color: '#F59E0B' },
      'Mantenimiento': { bg: '#F3E5F5', color: '#8B5CF6' },
      'Ventas': { bg: '#FFF0F3', color: '#EC4899' }
    };
    return colors[areaName] || { bg: '#F5F5F5', color: '#476797' };
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Nombre Completo',
      flex: 1.5,
      minWidth: 200,
      filterable: true
    },
    {
      field: 'areaName',
      headerName: 'Área',
      width: 140,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: getAreaColor(params.value).bg,
            color: getAreaColor(params.value).color,
            fontWeight: 500,
            fontSize: '0.75rem'
          }}
        />
      )
    },
    {
      field: 'roleName',
      headerName: 'Rol',
      width: 160,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'phoneNumber',
      headerName: 'Teléfono',
      width: 140,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'salary',
      headerName: 'Salario',
      width: 110,
      headerAlign: 'center',
      align: 'right',
      valueFormatter: (value: number) => value ? `S/ ${value.toLocaleString('es-PE')}` : 'N/A'
    },
    {
      field: 'active',
      headerName: 'Estado',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Activo' : 'Inactivo'}
          size="small"
          sx={{
            bgcolor: getStatusColor(params.value).bg,
            color: getStatusColor(params.value).color,
            fontWeight: 500,
            fontSize: '0.75rem'
          }}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 140,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onViewDetails(params.row.id)}
            sx={{
              minWidth: 'auto',
              p: 0.5,
              borderColor: '#476797',
              color: '#476797',
              '&:hover': {
                borderColor: '#3A5478',
                bgcolor: 'rgba(59, 130, 246, 0.04)'
              }
            }}
          >
            <VisibilityIcon sx={{ fontSize: 16 }} />
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onViewPayments(params.row.id)}
            sx={{
              minWidth: 'auto',
              p: 0.5,
              borderColor: '#476797',
              color: '#476797',
              '&:hover': {
                borderColor: '#059669',
                bgcolor: 'rgba(16, 185, 129, 0.04)'
              }
            }}
          >
            $
          </Button>
        </Box>
      )
    }
  ];

  return (
    <Paper sx={{
      p: 3,
      borderRadius: '20px',
      bgcolor: '#FFFFFF',
      border: '1px solid #F1F5F9',
      boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 3
      }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1B2559', mb: 0.5 }}>
            Lista de Empleados
          </Typography>
          <Typography variant="body2" sx={{ color: '#476797' }}>
            {filteredEmployees.length} empleado{filteredEmployees.length !== 1 ? 's' : ''} encontrado{filteredEmployees.length !== 1 ? 's' : ''}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={handleExport}
          sx={{
            bgcolor: '#476797',
            '&:hover': { bgcolor: '#475569' }
          }}
        >
          Exportar
        </Button>
      </Box>

      {/* Filtros */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar empleado..."
            value={filters.search}
            onChange={handleSearchChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#476797' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#FFFFFF',
                borderRadius: '8px'
              }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Área</InputLabel>
            <Select
              value={filters.area || ''}
              label="Área"
              onChange={handleAreaChange}
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '8px'
              }}
            >
              <MenuItem value="">Todas</MenuItem>
              {areas.map((area) => (
                <MenuItem key={area.id} value={area.id}>
                  {area.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Rol</InputLabel>
            <Select
              value={filters.role || ''}
              label="Rol"
              onChange={handleRoleChange}
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '8px'
              }}
            >
              <MenuItem value="">Todos</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Estado</InputLabel>
            <Select
              value={filters.status}
              label="Estado"
              onChange={handleStatusChange}
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '8px'
              }}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="active">Activos</MenuItem>
              <MenuItem value="inactive">Inactivos</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Data Grid */}
      <Box sx={{ height: 600 }}>
        <StyledDataGrid
          rows={filteredEmployees}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } }
          }}
          pageSizeOptions={[10, 15, 25, 50]}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell': {
              py: 1
            }
          }}
        />
      </Box>
    </Paper>
  );
}
