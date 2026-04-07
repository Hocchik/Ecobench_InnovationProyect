import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton, 
  Paper, 
  TextField, 
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { InventoryStatsCards } from './components/InventoryStatsCards';
import { CurrentInventoryTable } from './components/CurrentInventoryTable';
import { InventoryAuditTable } from './components/InventoryAuditTable';
import { InventoryAuditDialogs } from './components/InventoryAuditDialogs';
import { InventoryExitsTable } from './components/InventoryExitsTable';
import { InventoryEntriesTable } from './components/InventoryEntriesTable';
import { InventoryPurchasesTable } from './components/InventoryPurchasesTable';
import { Kardex } from './components/Kardex';
import CargosSolicitados from '../dashboard/components/CargosSolicitados';
import { 
  inventoryStats, 
  inventoryItems, 
  inventoryExits, 
  inventoryEntries, 
  inventoryPurchases,
  months 
} from './data/inventoryData';
import { InventoryItemAudit } from './data/interfaces';

type InventoryView = 'current' | 'exits' | 'entries' | 'purchases' | 'kardex';

const viewOrder: InventoryView[] = ['current', 'exits', 'entries', 'purchases', 'kardex'];

function AuxiliaryInventory() {
  const [currentView, setCurrentView] = useState<InventoryView>('current');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number>(7); // Julio por defecto
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditItems, setAuditItems] = useState<InventoryItemAudit[]>([]);
  const [startDialogOpen, setStartDialogOpen] = useState<boolean>(false);
  const [endDialogOpen, setEndDialogOpen] = useState<boolean>(false);

  const handlePreviousView = () => {
    const currentIndex = viewOrder.indexOf(currentView);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : viewOrder.length - 1;
    setCurrentView(viewOrder[previousIndex]);
  };

  const handleNextView = () => {
    const currentIndex = viewOrder.indexOf(currentView);
    const nextIndex = currentIndex < viewOrder.length - 1 ? currentIndex + 1 : 0;
    setCurrentView(viewOrder[nextIndex]);
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleStartAudit = () => {
    setStartDialogOpen(true);
  };

  const handleConfirmStartAudit = () => {
    setIsAuditing(true);
    setAuditItems(inventoryItems.map(item => ({ ...item })));
    setStartDialogOpen(false);
  };

  const handleFinishAudit = () => {
    setEndDialogOpen(true);
  };

  const handleConfirmFinishAudit = () => {
    setIsAuditing(false);
    setAuditItems([]);
    setEndDialogOpen(false);
    // Aquí podrías enviar los datos del cuadre al backend
  };

  const handleUpdatePhysicalCount = (id: number | string, physicalCount: number) => {
    setAuditItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              cantFisica: physicalCount,
              diferencia: physicalCount - item.cantAlmacen
            }
          : item
      )
    );
  };

  const handleVerifyItem = (id: number | string) => {
    setAuditItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, verificado: !item.verificado } : item
      )
    );
  };

  const verifiedItems = auditItems.filter(item => item.verificado).length;
  const itemsWithDifferences = auditItems.filter(item => item.diferencia !== undefined && item.diferencia !== 0).length;

  const getViewTitle = () => {
    switch (currentView) {
      case 'current':
        return 'Inventario actual';
      case 'exits':
        return 'Salidas de inventario';
      case 'entries':
        return 'Entradas inventario';
      case 'purchases':
        return 'Compras de Inventario';
      case 'kardex':
        return 'Kardex de Inventario';
      default:
        return 'Inventario';
    }
  };

  const getTableContent = () => {
    if (isAuditing && currentView === 'current') {
      return (
        <InventoryAuditTable 
          items={auditItems}
          onUpdatePhysicalCount={handleUpdatePhysicalCount}
          onVerifyItem={handleVerifyItem}
        />
      );
    }

    switch (currentView) {
      case 'current':
        return <CurrentInventoryTable items={inventoryItems} />;
      case 'exits':
        return <InventoryExitsTable exits={inventoryExits} />;
      case 'entries':
        return <InventoryEntriesTable entries={inventoryEntries} />;
      case 'purchases':
        return <InventoryPurchasesTable purchases={inventoryPurchases} />;
      case 'kardex':
        return <Kardex />;
      default:
        return <CurrentInventoryTable items={inventoryItems} />;
    }
  };

  const getSearchPlaceholder = () => {
    switch (currentView) {
      case 'current':
        return 'Buscar código de producto, posición, categoría, descripción...';
      case 'exits':
        return 'Buscar por Técnico o Artículo...';
      case 'entries':
        return 'Buscar por Técnico o Artículo...';
      case 'purchases':
        return 'Buscar por Técnico o Artículo...';
      case 'kardex':
        return 'Buscar por documento, técnico, cliente o artículo...';
      default:
        return 'Buscar...';
    }
  };

  const getListTitle = () => {
    switch (currentView) {
      case 'current':
        return 'Stock actual';
      case 'exits':
        return 'Lista de CAS';
      case 'entries':
        return 'Lista de CAE';
      case 'purchases':
        return 'Lista de COM';
      case 'kardex':
        return 'Movimientos de Kardex';
      default:
        return 'Lista';
    }
  };

  const getActionButtonText = () => {
    if (isAuditing && currentView === 'current') {
      return 'Finalizar cuadre';
    }
    
    switch (currentView) {
      case 'exits':
        return 'Agregar salida';
      case 'entries':
        return 'Agregar entrada';
      case 'purchases':
        return 'Agregar compra';
      default:
        return 'Realizar cuadre de inventario';
    }
  };

  const handleActionButtonClick = () => {
    if (isAuditing && currentView === 'current') {
      handleFinishAudit();
    } else if (currentView === 'current') {
      handleStartAudit();
    }
    // Aquí podrías agregar lógica para otros tipos de acciones
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      p: { xs: 1, sm: 2 },
      backgroundColor: isAuditing && currentView === 'current' ? '#FFF8F8' : 'inherit',
      transition: 'background-color 0.3s ease'
    }}>
      <Container maxWidth="xl">
        {/* Estadísticas superiores */}
        <InventoryStatsCards stats={inventoryStats} />

        {/* Contenido principal */}
        <Grid container spacing={3}>
          {/* Sección principal */}
          <Grid item xs={12} lg={currentView === 'current' || currentView === 'kardex' ? 12 : 8}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: '20px',
              boxShadow: isAuditing && currentView === 'current' 
                ? '0px 4px 20px rgba(255, 72, 66, 0.15)' 
                : '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
              border: isAuditing && currentView === 'current' ? '2px solid #FF4842' : 'none',
              backgroundColor: isAuditing && currentView === 'current' ? '#FFF8F8' : 'inherit',
              transition: 'all 0.3s ease'
            }}>
              {/* Controles solo si NO es vista de Kardex */}
              {currentView !== 'kardex' && (
                <>
                  {/* Header con navegación y controles */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconButton 
                        onClick={handlePreviousView}
                        disabled={isAuditing}
                        sx={{ 
                          bgcolor: isAuditing && currentView === 'current' ? '#FFE4E4' : '#F4F7FE', 
                          width: 40, 
                          height: 40,
                          '&:hover': { 
                            bgcolor: isAuditing && currentView === 'current' ? '#FFD6D6' : '#E2E8F0' 
                          },
                          '&.Mui-disabled': {
                            bgcolor: '#F5F5F5',
                            color: '#E0E0E0'
                          }
                        }}
                      >
                        <ChevronLeftIcon />
                      </IconButton>
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h5" 
                      fontWeight="bold"
                      sx={{ 
                        color: isAuditing && currentView === 'current' ? '#DC2626' : 'inherit' 
                      }}
                    >
                      {isAuditing && currentView === 'current' ? 'CUADRE DE INVENTARIO' : getViewTitle()}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: 'center' }}>
                      {viewOrder.map((view) => (
                        <Box
                          key={view}
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: view === currentView 
                              ? (isAuditing && currentView === 'current' ? '#FF4842' : '#476797') 
                              : '#E2E8F0',
                            transition: 'background-color 0.2s'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <IconButton 
                    onClick={handleNextView}
                    disabled={isAuditing}
                    sx={{ 
                      bgcolor: isAuditing && currentView === 'current' ? '#FFE4E4' : '#F4F7FE', 
                      width: 40, 
                      height: 40,
                      '&:hover': { 
                        bgcolor: isAuditing && currentView === 'current' ? '#FFD6D6' : '#E2E8F0' 
                      },
                      '&.Mui-disabled': {
                        bgcolor: '#F5F5F5',
                        color: '#E0E0E0'
                      }
                    }}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Mes</InputLabel>
                    <Select
                      value={selectedMonth.toString()}
                      label="Mes"
                      onChange={handleMonthChange}
                      sx={{ bgcolor: '#FEF3C7', borderRadius: '8px' }}
                    >
                      {months.map((month) => (
                        <MenuItem key={month.id} value={month.id.toString()}>
                          {month.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    sx={{ 
                      bgcolor: '#476797', 
                      borderRadius: '8px',
                      '&:hover': { bgcolor: '#475569' }
                    }}
                  >
                    Exportar
                  </Button>

                  {currentView === 'current' && (
                    <Button
                      variant="contained"
                      onClick={handleActionButtonClick}
                      startIcon={isAuditing ? <CheckCircleIcon /> : undefined}
                      sx={{ 
                        bgcolor: isAuditing ? '#DC2626' : '#476797', 
                        borderRadius: '8px',
                        '&:hover': { 
                          bgcolor: isAuditing ? '#B91C1C' : '#3A5478' 
                        }
                      }}
                    >
                      {getActionButtonText()}
                    </Button>
                  )}
                </Box>
              </Box>

              {/* Controles de vista y búsqueda */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6" fontWeight="medium">
                    {getListTitle()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TextField
                    variant="outlined"
                    placeholder={getSearchPlaceholder()}
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: { xs: '100%', sm: '400px' }, bgcolor: '#F4F7FE', borderRadius: '8px' }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color="action" />
                          </InputAdornment>
                        ),
                        sx: { borderRadius: '8px' }
                      },
                    }}
                  />

                  {currentView !== 'current' && (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{ 
                        bgcolor: '#476797', 
                        borderRadius: '8px',
                        '&:hover': { bgcolor: '#3A5478' }
                      }}
                    >
                      {getActionButtonText()}
                    </Button>
                  )}
                </Box>
              </Box>
                </>
              )}

              {/* Tabla o Kardex */}
              {getTableContent()}
            </Paper>
          </Grid>

          {/* Panel lateral - solo para vistas que no sean inventario actual ni kardex */}
          {currentView !== 'current' && currentView !== 'kardex' && (
            <Grid item xs={12} lg={4}>
              <CargosSolicitados />
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Diálogos de confirmación */}
      <InventoryAuditDialogs
        startDialogOpen={startDialogOpen}
        endDialogOpen={endDialogOpen}
        onStartConfirm={handleConfirmStartAudit}
        onEndConfirm={handleConfirmFinishAudit}
        onStartCancel={() => setStartDialogOpen(false)}
        onEndCancel={() => setEndDialogOpen(false)}
        verifiedItems={verifiedItems}
        totalItems={auditItems.length}
        itemsWithDifferences={itemsWithDifferences}
      />
    </Box>
  );
}

export default AuxiliaryInventory;