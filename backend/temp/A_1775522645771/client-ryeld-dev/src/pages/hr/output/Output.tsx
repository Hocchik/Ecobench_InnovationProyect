/**
 * Componente principal del módulo Output para HR
 * Gestiona compras y servicios de la empresa
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  TextField,
  Grid2 as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FileDownload as ExportIcon,
  ShoppingCart as PurchaseIcon,
  Build as ServiceIcon,
} from '@mui/icons-material';

// Componentes
import PurchasesTable from './components/PurchasesTable';
import ServicesTable from './components/ServicesTable';
import AddPurchaseModal from './components/AddPurchaseModal';
import AddServiceModal from './components/AddServiceModal';

// Datos y tipos
import type { 
  PurchaseFilters, 
  ServiceFilters, 
  OutputStats
} from './data/interfaces';
import type {
  PaymentType,
  PurchaseCategory,
  OutputStatus
} from './data/interfaces';
import { getOutputStats } from './api';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`output-tabpanel-${index}`}
    aria-labelledby={`output-tab-${index}`}
    style={{ flex: 1, minHeight: 0, display: value === index ? 'flex' : 'none', flexDirection: 'column' }}
    {...other}
  >
    {value === index && <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>{children}</Box>}
  </div>
);

const HROutput: React.FC = () => {
  // Estados principales
  const [currentTab, setCurrentTab] = useState(0);
  const [stats, setStats] = useState<OutputStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Estados de modales
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Estados de filtros
  const [purchaseFilters, setPurchaseFilters] = useState<PurchaseFilters>({
    search: '',
    paymentType: undefined,
    category: undefined,
    status: undefined,
    dateFrom: undefined,
    dateTo: undefined
  });

  const [serviceFilters, setServiceFilters] = useState<ServiceFilters>({
    search: '',
    serviceType: undefined,
    status: undefined,
    dateFrom: undefined,
    dateTo: undefined
  });

  // Cargar estadísticas
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await getOutputStats();
      setStats(data);
    } catch (err) {
      setError('Error al cargar las estadísticas');
      console.error('Error loading stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejo de pestañas
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Limpiar filtros
  const clearPurchaseFilters = () => {
    setPurchaseFilters({
      search: '',
      paymentType: undefined,
      category: undefined,
      status: undefined,
      dateFrom: undefined,
      dateTo: undefined
    });
  };

  const clearServiceFilters = () => {
    setServiceFilters({
      search: '',
      serviceType: undefined,
      status: undefined,
      dateFrom: undefined,
      dateTo: undefined
    });
  };

  // Manejo de errores
  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      height: 'calc(100vh - 180px)', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box sx={{ mb: 3, flexShrink: 0 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: '#1B2559',
            mb: 1
          }}
        >
          Gestión de Salidas
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#476797',
            fontSize: '1.1rem'
          }}
        >
          Administra compras y servicios de la empresa
        </Typography>
      </Box>

      {/* Alertas de error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Pestañas y contenido */}
      <Paper sx={{ bgcolor: 'background.paper', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500
              }
            }}
          >
            <Tab 
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  <PurchaseIcon />
                  Compras
                  {stats && stats.pendingPurchases > 0 && (
                    <Chip 
                      label={stats.pendingPurchases} 
                      size="small" 
                      color="warning"
                      sx={{ ml: 1 }} 
                    />
                  )}
                </Box>
              }
            />
            <Tab 
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  <ServiceIcon />
                  Servicios
                  {stats && stats.pendingServices > 0 && (
                    <Chip 
                      label={stats.pendingServices} 
                      size="small" 
                      color="warning"
                      sx={{ ml: 1 }} 
                    />
                  )}
                </Box>
              }
            />
          </Tabs>
        </Box>

        {/* Panel de Compras */}
        <TabPanel value={currentTab} index={0}>
          <Box sx={{ p: 3, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            {/* Filtros y acciones para Compras */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Gestión de Compras
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsPurchaseModalOpen(true)}
                sx={{
                  bgcolor: '#3A5578',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#2E4460',
                  }
                }}
              >
                Nueva Compra
              </Button>
            </Box>

            {/* Filtros de Compras */}
            <Paper sx={{ p: 2, mb: 3, bgcolor: '#F8F9FF' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Buscar compras..."
                    value={purchaseFilters.search}
                    onChange={(e) => setPurchaseFilters(prev => ({ ...prev, search: e.target.value }))}
                    slotProps={{
                      input: {
                        startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Tipo de Pago</InputLabel>
                    <Select
                      value={purchaseFilters.paymentType || ''}
                      onChange={(e) => setPurchaseFilters(prev => ({ 
                        ...prev, 
                        paymentType: (e.target.value as PaymentType) || undefined 
                      }))}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="Al contado">Al contado</MenuItem>
                      <MenuItem value="A crédito">A crédito</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Categoría</InputLabel>
                    <Select
                      value={purchaseFilters.category || ''}
                      onChange={(e) => setPurchaseFilters(prev => ({ 
                        ...prev, 
                        category: (e.target.value as PurchaseCategory) || undefined 
                      }))}
                    >
                      <MenuItem value="">Todas</MenuItem>
                      <MenuItem value="Pasaje">Pasaje</MenuItem>
                      <MenuItem value="Tecnología">Tecnología</MenuItem>
                      <MenuItem value="Muebles">Muebles</MenuItem>
                      <MenuItem value="Oficina">Oficina</MenuItem>
                      <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
                      <MenuItem value="Alimentación">Alimentación</MenuItem>
                      <MenuItem value="Capacitación">Capacitación</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={purchaseFilters.status || ''}
                      onChange={(e) => setPurchaseFilters(prev => ({ 
                        ...prev, 
                        status: (e.target.value as OutputStatus) || undefined 
                      }))}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="Pagado">Pagado</MenuItem>
                      <MenuItem value="Pendiente">Pendiente</MenuItem>
                      <MenuItem value="Anulado">Anulado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={clearPurchaseFilters}
                    sx={{ mr: 1 }}
                  >
                    Limpiar
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ExportIcon />}
                    onClick={() => {/* TODO: Exportar compras */}}
                  >
                    Exportar
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Tabla de Compras */}
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <PurchasesTable 
                filters={purchaseFilters}
                onError={handleError}
              />
            </Box>
          </Box>
        </TabPanel>

        {/* Panel de Servicios */}
        <TabPanel value={currentTab} index={1}>
          <Box sx={{ p: 3, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            {/* Filtros y acciones para Servicios */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Gestión de Servicios
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsServiceModalOpen(true)}
                sx={{
                  bgcolor: '#3A5578',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#2E4460',
                  }
                }}
              >
                Nuevo Servicio
              </Button>
            </Box>

            {/* Filtros de Servicios */}
            <Paper sx={{ p: 2, mb: 3, bgcolor: '#F8F9FF' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Buscar servicios..."
                    value={serviceFilters.search}
                    onChange={(e) => setServiceFilters(prev => ({ ...prev, search: e.target.value }))}
                    slotProps={{
                      input: {
                        startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Tipo</InputLabel>
                    <Select
                      value={serviceFilters.serviceType || ''}
                      onChange={(e) => setServiceFilters(prev => ({ 
                        ...prev, 
                        serviceType: e.target.value || undefined 
                      }))}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="Luz">Luz</MenuItem>
                      <MenuItem value="Agua">Agua</MenuItem>
                      <MenuItem value="Internet">Internet</MenuItem>
                      <MenuItem value="Teléfono">Teléfono</MenuItem>
                      <MenuItem value="Gas">Gas</MenuItem>
                      <MenuItem value="Seguridad">Seguridad</MenuItem>
                      <MenuItem value="Limpieza">Limpieza</MenuItem>
                      <MenuItem value="Otros">Otros</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={serviceFilters.status || ''}
                      onChange={(e) => setServiceFilters(prev => ({ 
                        ...prev, 
                        status: (e.target.value as OutputStatus) || undefined 
                      }))}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="Pagado">Pagado</MenuItem>
                      <MenuItem value="Pendiente">Pendiente</MenuItem>
                      <MenuItem value="Anulado">Anulado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={clearServiceFilters}
                    sx={{ mr: 1 }}
                  >
                    Limpiar
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ExportIcon />}
                    onClick={() => {/* TODO: Exportar servicios */}}
                  >
                    Exportar
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Tabla de Servicios */}
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <ServicesTable 
                filters={serviceFilters}
                onError={handleError}
              />
            </Box>
          </Box>
        </TabPanel>
      </Paper>

      {/* Modales */}
      <AddPurchaseModal
        open={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        onSuccess={() => {
          setIsPurchaseModalOpen(false);
          loadStats();
        }}
        onError={handleError}
      />

      <AddServiceModal
        open={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSuccess={() => {
          setIsServiceModalOpen(false);
          loadStats();
        }}
        onError={handleError}
      />
    </Box>
  );
};

export default HROutput;