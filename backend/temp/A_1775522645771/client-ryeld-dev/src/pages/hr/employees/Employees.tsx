import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid2 as Grid,
  Paper
} from '@mui/material';
import {
  Upload as UploadIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import { EmployeesTable } from './components/EmployeesTable';
import { EmployeeDetailsModal } from './components/EmployeeDetailsModal';
import { PaymentHistoryModal } from './components/PaymentHistoryModal';
import { ContractUploadModal } from './components/ContractUploadModal';
import { 
  employeesData, 
  areas, 
  roles, 
  paymentHistoryData, 
  employeeDocumentsData,
  employeeStats,
  monthOptions,
  availableYears
} from './data/employeesData';
import { Employee } from './data/interfaces';

function Employees() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [paymentsModalOpen, setPaymentsModalOpen] = useState(false);
  const [contractModalOpen, setContractModalOpen] = useState(false);

  const handleViewDetails = (employeeId: number) => {
    const employee = employeesData.find(emp => emp.id === employeeId) || null;
    setSelectedEmployee(employee);
    setDetailsModalOpen(true);
  };

  const handleViewPayments = (employeeId: number) => {
    const employee = employeesData.find(emp => emp.id === employeeId) || null;
    setSelectedEmployee(employee);
    setPaymentsModalOpen(true);
  };

  const handleUploadContract = () => {
    setContractModalOpen(true);
  };

  const handleCloseModals = () => {
    setDetailsModalOpen(false);
    setPaymentsModalOpen(false);
    setContractModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <Container maxWidth={false} sx={{
      py: 3,
      px: { xs: 2, sm: 3 },
      height: '100%',
      overflow: 'auto',
      backgroundColor: '#F8FAFC',
      '&::-webkit-scrollbar': {
        width: '4px',
        backgroundColor: 'transparent'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '4px'
      }
    }}>
      {/* Header */}
      <Box mb={3}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: '#1B2559', mb: 1 }}>
              Gestión de Empleados
            </Typography>
            <Typography variant="body2" sx={{ color: '#476797' }}>
              Administra la información del personal, pagos y documentos
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={handleUploadContract}
              sx={{
                borderColor: '#476797',
                color: '#476797',
                '&:hover': {
                  borderColor: '#3A5478',
                  bgcolor: 'rgba(59, 130, 246, 0.04)'
                }
              }}
            >
              Subir Contrato
            </Button>
            <Button
              variant="contained"
              startIcon={<AssessmentIcon />}
              sx={{
                bgcolor: '#476797',
                '&:hover': { bgcolor: '#059669' }
              }}
            >
              Generar Reporte
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{
            p: 3,
            borderRadius: '20px',
            bgcolor: '#FFFFFF',
            border: '1px solid #F1F5F9',
            boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
          }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#476797', mb: 1 }}>
              {employeeStats.totalEmployees}
            </Typography>
            <Typography variant="body2" sx={{ color: '#476797' }}>
              Total Empleados
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{
            p: 3,
            borderRadius: '20px',
            bgcolor: '#FFFFFF',
            border: '1px solid #F1F5F9',
            boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
          }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#476797', mb: 1 }}>
              {employeeStats.activeEmployees}
            </Typography>
            <Typography variant="body2" sx={{ color: '#476797' }}>
              Empleados Activos
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{
            p: 3,
            borderRadius: '20px',
            bgcolor: '#FFFFFF',
            border: '1px solid #F1F5F9',
            boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
          }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#F59E0B', mb: 1 }}>
              S/ {employeeStats.averageSalary.toLocaleString('es-PE')}
            </Typography>
            <Typography variant="body2" sx={{ color: '#476797' }}>
              Salario Promedio
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{
            p: 3,
            borderRadius: '20px',
            bgcolor: '#FFFFFF',
            border: '1px solid #F1F5F9',
            boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
          }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#EF4444', mb: 1 }}>
              {employeeStats.pendingPayments}
            </Typography>
            <Typography variant="body2" sx={{ color: '#476797' }}>
              Pagos Pendientes
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabla de Empleados */}
      <EmployeesTable
        employees={employeesData}
        areas={areas}
        roles={roles}
        onViewDetails={handleViewDetails}
        onViewPayments={handleViewPayments}
      />

      {/* Modales */}
      <EmployeeDetailsModal
        open={detailsModalOpen}
        onClose={handleCloseModals}
        employee={selectedEmployee}
        documents={employeeDocumentsData}
      />

      <PaymentHistoryModal
        open={paymentsModalOpen}
        onClose={handleCloseModals}
        employee={selectedEmployee}
        payments={paymentHistoryData}
        monthOptions={monthOptions}
        availableYears={availableYears}
      />

      <ContractUploadModal
        open={contractModalOpen}
        onClose={handleCloseModals}
        employee={selectedEmployee}
      />
    </Container>
  );
}

export default Employees;