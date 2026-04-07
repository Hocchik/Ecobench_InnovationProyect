import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  Divider,
  Grid
} from '@mui/material';
import {
  ViewList as ViewListIcon,
  Timeline as TimelineIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Article as ArticleIcon,
  CalendarToday as CalendarIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';
import { KardexMovement } from '../data/kardexInterfaces';
import { kardexMovements, availableProducts } from '../data/kardexData';
import { KardexDetailModal } from './KardexDetailModal';

type ViewMode = 'table' | 'timeline';

export const Kardex = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovement, setSelectedMovement] = useState<KardexMovement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('all');

  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: ViewMode | null) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const handleProductChange = (event: SelectChangeEvent) => {
    setSelectedProduct(event.target.value);
  };

  const handleMovementClick = (movement: KardexMovement) => {
    setSelectedMovement(movement);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMovement(null);
  };

  // Filtrar movimientos según el producto seleccionado
  const getFilteredMovements = (): KardexMovement[] => {
    if (selectedProduct === 'all') {
      return kardexMovements;
    }
    
    return kardexMovements.filter(movement => 
      movement.articulos.some(articulo => articulo.codigo === selectedProduct)
    );
  };

  const filteredMovements = getFilteredMovements();

  // Calcular saldo acumulado para el producto seleccionado
  const getProductBalance = () => {
    if (selectedProduct === 'all') return null;
    
    const product = availableProducts.find(p => p.codigo === selectedProduct);
    if (!product) return null;

    let saldoInicial = product.saldoActual;
    let totalEntradas = 0;
    let totalSalidas = 0;

    filteredMovements.forEach(movement => {
      const articulo = movement.articulos.find(a => a.codigo === selectedProduct);
      if (articulo) {
        if (movement.tipo === 'entrada') {
          totalEntradas += articulo.cantidad;
        } else {
          totalSalidas += articulo.cantidad;
        }
      }
    });

    // Calcular saldo inicial basado en movimientos
    const saldoCalculado = saldoInicial - totalEntradas + totalSalidas;

    return {
      producto: product,
      saldoInicial: saldoCalculado,
      totalEntradas,
      totalSalidas,
      saldoFinal: product.saldoActual
    };
  };

  const productBalance = getProductBalance();

  const getMovementIcon = (tipo: string) => {
    return tipo === 'entrada' ? (
      <TrendingUpIcon sx={{ color: '#476797', fontSize: 20 }} />
    ) : (
      <TrendingDownIcon sx={{ color: '#EF4444', fontSize: 20 }} />
    );
  };

  const getMovementColor = (tipo: string) => {
    return tipo === 'entrada' 
      ? { bg: '#F0FDF4', color: '#476797', border: '#476797' }
      : { bg: '#FEF2F2', color: '#EF4444', border: '#EF4444' };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Vista de Tabla
  const TableView = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F8FAFC' }}>
            <TableCell sx={{ fontWeight: 600, color: '#476797' }}>Tipo</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#476797' }}>N° Documento</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#476797' }}>Fecha</TableCell>
            {selectedProduct !== 'all' && (
              <>
                <TableCell sx={{ fontWeight: 600, color: '#476797' }}>Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#476797' }}>Saldo</TableCell>
              </>
            )}
            <TableCell sx={{ fontWeight: 600, color: '#476797' }}>Técnico</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#476797' }}>Cliente</TableCell>
            {selectedProduct === 'all' && (
              <>
                <TableCell sx={{ fontWeight: 600, color: '#476797' }}>Artículos</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#476797', textAlign: 'right' }}>Valor Total</TableCell>
              </>
            )}
            <TableCell sx={{ fontWeight: 600, color: '#476797' }}>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMovements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                <Typography variant="body2" color="#94A3B8">
                  No se encontraron movimientos para este producto
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            filteredMovements.map((movement, index) => {
              const colors = getMovementColor(movement.tipo);
              const articulo = selectedProduct !== 'all' 
                ? movement.articulos.find(a => a.codigo === selectedProduct)
                : null;
              
              // Calcular saldo acumulado para el producto seleccionado
              let saldoAcumulado = 0;
              if (selectedProduct !== 'all' && productBalance) {
                saldoAcumulado = productBalance.saldoInicial;
                for (let i = 0; i <= index; i++) {
                  const mov = filteredMovements[i];
                  const art = mov.articulos.find(a => a.codigo === selectedProduct);
                  if (art) {
                    if (mov.tipo === 'entrada') {
                      saldoAcumulado += art.cantidad;
                    } else {
                      saldoAcumulado -= art.cantidad;
                    }
                  }
                }
              }
              
              return (
                <TableRow
                  key={movement.id}
                  onClick={() => handleMovementClick(movement)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: '#F8FAFC',
                      transform: 'scale(1.01)'
                    }
                  }}
                >
                  <TableCell>
                    <Chip
                      icon={getMovementIcon(movement.tipo)}
                      label={movement.tipo.toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: colors.bg,
                        color: colors.color,
                        border: `1px solid ${colors.border}`,
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ArticleIcon sx={{ fontSize: 18, color: '#476797' }} />
                      <Typography variant="body2" fontWeight={600} color="#1B2559">
                        {movement.numeroDocumento}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="#476797">
                      {formatDate(movement.fecha)}
                    </Typography>
                    <Typography variant="caption" color="#94A3B8">
                      {movement.hora}
                    </Typography>
                  </TableCell>
                  
                  {/* Columnas específicas para producto seleccionado */}
                  {selectedProduct !== 'all' && articulo && (
                    <>
                      <TableCell>
                        <Chip
                          label={`${movement.tipo === 'entrada' ? '+' : '-'} ${articulo.cantidad} ${articulo.unidad}`}
                          size="small"
                          sx={{
                            bgcolor: colors.bg,
                            color: colors.color,
                            fontWeight: 700,
                            fontSize: '0.875rem'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={700} color="#1B2559">
                          {saldoAcumulado} {articulo.unidad}
                        </Typography>
                      </TableCell>
                    </>
                  )}
                  
                  {/* Columnas para vista de todos los productos */}
                  {selectedProduct === 'all' && (
                    <>
                      <TableCell>
                        <Chip
                          label={`${movement.totalArticulos} artículos`}
                          size="small"
                          sx={{
                            bgcolor: '#EFF6FF',
                            color: '#476797',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight={600} color="#1B2559">
                          {formatCurrency(movement.valorTotal || 0)}
                        </Typography>
                      </TableCell>
                    </>
                  )}
                  
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#476797', fontSize: '0.875rem' }}>
                        {movement.tecnico.nombre[0]}{movement.tecnico.apellido[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500} color="#1B2559">
                          {movement.tecnico.nombre} {movement.tecnico.apellido}
                        </Typography>
                        <Typography variant="caption" color="#94A3B8">
                          {movement.tecnico.especialidad}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {movement.cliente ? (
                      <Box>
                        <Typography variant="body2" fontWeight={500} color="#1B2559">
                          {movement.cliente.nombre}
                        </Typography>
                        <Typography variant="caption" color="#94A3B8">
                          {movement.cliente.distrito}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="#94A3B8">
                        -
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={movement.estado}
                      size="small"
                      sx={{
                        bgcolor: '#F0FDF4',
                        color: '#476797',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        textTransform: 'capitalize'
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
          </TableBody>
        </Table>
      </TableContainer>
    );

  // Vista de Timeline/Roadmap
  const TimelineView = () => (
    <Box sx={{ p: 3 }}>
      {filteredMovements.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Alert severity="info" sx={{ maxWidth: 500, mx: 'auto' }}>
            <Typography variant="body2">
              {selectedProduct !== 'all' 
                ? `No hay movimientos registrados para el producto seleccionado`
                : 'No hay movimientos registrados'}
            </Typography>
          </Alert>
        </Box>
      ) : (
        filteredMovements.map((movement, index) => {
          const colors = getMovementColor(movement.tipo);
          const isLeft = index % 2 === 0;
          
          return (
            <Box
              key={movement.id}
              sx={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                mb: 4,
                position: 'relative'
              }}
            >
              {/* Línea vertical del timeline */}
              {index < filteredMovements.length - 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: 60,
                    width: 2,
                    height: 'calc(100% + 32px)',
                    bgcolor: '#E2E8F0',
                    transform: 'translateX(-50%)',
                    zIndex: 0
                  }}
                />
              )}

              {/* Card del movimiento */}
            <Box sx={{ width: '45%', position: 'relative', zIndex: 1 }}>
              <Paper
                onClick={() => handleMovementClick(movement)}
                sx={{
                  p: 3,
                  borderRadius: '20px',
                  border: `2px solid ${colors.border}`,
                  bgcolor: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${colors.border}40`
                  }
                }}
              >
                {/* Header del card */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Chip
                    icon={getMovementIcon(movement.tipo)}
                    label={movement.tipo.toUpperCase()}
                    sx={{
                      bgcolor: colors.bg,
                      color: colors.color,
                      border: `1px solid ${colors.border}`,
                      fontWeight: 700,
                      fontSize: '0.8rem'
                    }}
                  />
                  <Typography variant="h6" fontWeight={700} color="#1B2559">
                    {movement.numeroDocumento}
                  </Typography>
                </Stack>

                {/* Fecha */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CalendarIcon sx={{ fontSize: 18, color: '#476797' }} />
                  <Typography variant="body2" color="#476797">
                    {formatDate(movement.fecha)} - {movement.hora}
                  </Typography>
                </Box>

                {/* Técnico */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: '#476797' }}>
                    {movement.tecnico.nombre[0]}{movement.tecnico.apellido[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600} color="#1B2559">
                      {movement.tecnico.nombre} {movement.tecnico.apellido}
                    </Typography>
                    <Typography variant="caption" color="#94A3B8">
                      {movement.tecnico.especialidad}
                    </Typography>
                  </Box>
                </Box>

                {/* Cliente */}
                {movement.cliente && (
                  <Box sx={{ mb: 2, p: 2, bgcolor: '#F8FAFC', borderRadius: '8px' }}>
                    <Typography variant="caption" color="#476797" fontWeight={600}>
                      Cliente
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="#1B2559">
                      {movement.cliente.nombre}
                    </Typography>
                    <Typography variant="caption" color="#94A3B8">
                      {movement.cliente.distrito}
                    </Typography>
                  </Box>
                )}

                {/* Footer del card */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Chip
                    label={`${movement.totalArticulos} artículos`}
                    size="small"
                    sx={{
                      bgcolor: '#EFF6FF',
                      color: '#476797',
                      fontWeight: 600
                    }}
                  />
                  <Typography variant="h6" fontWeight={700} color={colors.color}>
                    {formatCurrency(movement.valorTotal || 0)}
                  </Typography>
                </Stack>
              </Paper>

              {/* Punto central del timeline */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  [isLeft ? 'right' : 'left']: -30,
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: colors.bg,
                  border: `4px solid ${colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translateY(-50%)',
                  zIndex: 2
                }}
              >
                {getMovementIcon(movement.tipo)}
              </Box>
            </Box>
          </Box>
        );
      })
      )}
    </Box>
  );

  return (
    <Box>
      <Paper sx={{ 
        p: 3, 
        borderRadius: '20px',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
      }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" fontWeight={700} color="#1B2559" gutterBottom>
              Kardex de Inventario
            </Typography>
            <Typography variant="body2" color="#476797">
              Seguimiento detallado de entradas y salidas
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewChange}
              sx={{
                bgcolor: '#F8FAFC',
                '& .MuiToggleButton-root': {
                  border: 'none',
                  borderRadius: '20px',
                  px: 3,
                  '&.Mui-selected': {
                    bgcolor: '#476797',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#3A5478'
                    }
                  }
                }
              }}
            >
              <ToggleButton value="table">
                <ViewListIcon sx={{ mr: 1 }} />
                Tabla
              </ToggleButton>
              <ToggleButton value="timeline">
                <TimelineIcon sx={{ mr: 1 }} />
                Timeline
              </ToggleButton>
            </ToggleButtonGroup>

            <Tooltip title="Próximamente">
              <IconButton
                sx={{
                  bgcolor: '#F8FAFC',
                  '&:hover': { bgcolor: '#E2E8F0' }
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Barra de búsqueda y selector de producto */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Buscar por documento, técnico, cliente o artículo..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              bgcolor: '#F8FAFC',
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px'
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
          
          {/* Selector de Producto */}
          <FormControl 
            sx={{ 
              minWidth: 280,
              bgcolor: '#F8FAFC',
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px'
              }
            }}
            size="small"
          >
            <InputLabel id="product-select-label">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InventoryIcon sx={{ fontSize: 18 }} />
                Producto
              </Box>
            </InputLabel>
            <Select
              labelId="product-select-label"
              value={selectedProduct}
              onChange={handleProductChange}
              label="Producto"
            >
              <MenuItem value="all">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InventoryIcon sx={{ fontSize: 18, color: '#476797' }} />
                  <Typography variant="body2" fontWeight={600}>
                    Todos los productos
                  </Typography>
                </Box>
              </MenuItem>
              <Divider />
              {availableProducts.map((product) => (
                <MenuItem key={product.id} value={product.codigo}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" fontWeight={600} color="#1B2559">
                        {product.codigo}
                      </Typography>
                      <Typography variant="caption" color="#476797">
                        {product.descripcion}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${product.saldoActual} ${product.unidad}`}
                      size="small"
                      sx={{
                        bgcolor: product.saldoActual > 10 ? '#F0FDF4' : '#FEF2F2',
                        color: product.saldoActual > 10 ? '#476797' : '#EF4444',
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }}
                    />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* Tarjeta de Resumen de Saldo - Solo visible cuando hay producto seleccionado */}
        {selectedProduct !== 'all' && productBalance && productBalance.producto && (
          <Paper
            elevation={0}
            sx={{
              mb: 3,
              p: 3,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              color: 'white'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 48, height: 48 }}>
                <InventoryIcon sx={{ color: 'white' }} />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  {productBalance.producto.codigo} - {productBalance.producto.descripcion}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {productBalance.producto.categoria} · {productBalance.producto.unidad}
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: '20px' }}>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Saldo Inicial
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {productBalance.saldoInicial} {productBalance.producto.unidad}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(16,185,129,0.2)', borderRadius: '20px' }}>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Total Entradas
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="#476797">
                    +{productBalance.totalEntradas} {productBalance.producto.unidad}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(239,68,68,0.2)', borderRadius: '20px' }}>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Total Salidas
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="#EF4444">
                    -{productBalance.totalSalidas} {productBalance.producto.unidad}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.25)', borderRadius: '20px' }}>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Saldo Final
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {productBalance.saldoFinal} {productBalance.producto.unidad}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {filteredMovements.length > 0 && (
              <Alert
                severity="info"
                sx={{
                  mt: 2,
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  '& .MuiAlert-icon': { color: 'white' }
                }}
              >
                <Typography variant="body2">
                  Mostrando {filteredMovements.length} movimiento{filteredMovements.length !== 1 ? 's' : ''} de este producto
                </Typography>
              </Alert>
            )}
          </Paper>
        )}

        {/* Contenido según vista */}
        {viewMode === 'table' ? <TableView /> : <TimelineView />}
      </Paper>

      {/* Modal de detalles */}
      {selectedMovement && (
        <KardexDetailModal
          open={modalOpen}
          onClose={handleCloseModal}
          movement={selectedMovement}
        />
      )}
    </Box>
  );
};
