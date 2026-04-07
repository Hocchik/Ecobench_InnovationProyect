import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid2 as Grid,
  TextField,
  MenuItem,
  Button,
  Chip,
  Tooltip,
  Stack,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import {
  Add as AddIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Payment as PaymentIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { getAllSalesWithDetails } from '../data/salesData';
import { SaleDetail, SaleStatus } from '../data/interfaces';
import { SaleDetailsModal } from './SaleDetailsModal';
import { MarkAsPaidModal, PaymentData } from './MarkAsPaidModal';
import { AddSaleModal, NewSaleData } from './AddSaleModal';

const StyledDataGrid = (props: any) => (
  <DataGrid
    {...props}
    sx={{
      border: 'none',
      height: '600px',
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#F8FAFC',
        borderBottom: '1px solid #E2E8F0',
        '& .MuiDataGrid-columnHeader': {
          fontWeight: 600,
          color: '#1B2559'
        }
      },
      '& .MuiDataGrid-row': {
        borderBottom: '1px solid #F1F5F9',
        minHeight: '60px !important',
        '&:hover': {
          backgroundColor: '#F8FAFC'
        }
      },
      '& .MuiDataGrid-cell': {
        borderBottom: 'none',
        color: '#334155',
        display: 'flex',
        alignItems: 'center',
        paddingY: '8px'
      },
      '& .MuiDataGrid-footerContainer': {
        borderTop: '1px solid #E2E8F0',
        backgroundColor: '#F8FAFC'
      },
      '& .MuiDataGrid-virtualScroller': {
        overflow: 'auto'
      }
    }}
  />
);

export function SalesTable() {
  const [data, setData] = useState<SaleDetail[]>(getAllSalesWithDetails());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<SaleStatus | 'all'>('all');
  const [voucherFilter, setVoucherFilter] = useState<string>('all');

  // Modals
  const [detailsModal, setDetailsModal] = useState<{
    open: boolean;
    sale: SaleDetail | null;
  }>({
    open: false,
    sale: null
  });

  const [paymentModal, setPaymentModal] = useState<{
    open: boolean;
    sale: SaleDetail | null;
  }>({
    open: false,
    sale: null
  });

  const [addModal, setAddModal] = useState(false);

  const getStatusColor = (status: SaleStatus) => {
    const colors = {
      'Pagado': { bg: '#E6FAF5', color: '#476797' },
      'Pendiente': { bg: '#FFF6E5', color: '#F59E0B' },
      'Por cobrar': { bg: '#E3F2FD', color: '#476797' },
      'Anulado': { bg: '#FEF2F2', color: '#EF4444' }
    };
    return colors[status];
  };

  const isOverdue = (dueDate: string, status: SaleStatus) => {
    if (status === 'Pagado' || status === 'Anulado') return false;
    return new Date(dueDate) < new Date();
  };

  const handleViewDetails = (sale: SaleDetail) => {
    setDetailsModal({ open: true, sale });
  };

  const handleMarkAsPaid = (sale: SaleDetail) => {
    setPaymentModal({ open: true, sale });
  };

  const handleConfirmPayment = (saleId: string, paymentData: PaymentData) => {
    setData(prevData =>
      prevData.map(sale =>
        sale.id === saleId
          ? {
              ...sale,
              status: 'Pagado' as SaleStatus,
              paymentDate: paymentData.paymentDate,
              paymentMethod: paymentData.paymentMethod,
              operationNumber: paymentData.operationNumber,
              bankAccount: paymentData.bankAccount,
              notes: paymentData.notes ? 
                (sale.notes ? `${sale.notes}\n\nPago: ${paymentData.notes}` : `Pago: ${paymentData.notes}`) : 
                sale.notes,
              lastModified: new Date().toISOString(),
              modifiedBy: 'HR User' // En una app real vendría del contexto de usuario
            }
          : sale
      )
    );
    setPaymentModal({ open: false, sale: null });
  };

  const handleAddSale = (saleData: NewSaleData) => {
    const newSale: SaleDetail = {
      id: `SALE-${Date.now()}`,
      date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit' }),
      voucherNumber: `${saleData.voucher.charAt(0)}001-${String(data.length + 1).padStart(6, '0')}`,
      client: saleData.client,
      clientPhone: saleData.clientPhone,
      clientEmail: saleData.clientEmail,
      clientAddress: saleData.clientAddress,
      concept: saleData.concept,
      description: saleData.description,
      amount: saleData.amount,
      voucher: saleData.voucher,
      dueDate: saleData.dueDate,
      paymentDate: null,
      status: saleData.status,
      technician: saleData.technician,
      servicePeriod: saleData.servicePeriod,
      equipmentDetails: saleData.equipmentDetails,
      notes: saleData.notes,
      createdAt: new Date().toISOString(),
      createdBy: 'HR User' // En una app real vendría del contexto de usuario
    };

    setData(prevData => [newSale, ...prevData]);
    setAddModal(false);
  };

  const filteredData = useMemo(() => {
    return data.filter(sale => {
      const matchesSearch = 
        sale.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.voucherNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
      
      const matchesVoucher = voucherFilter === 'all' || sale.voucher === voucherFilter;

      return matchesSearch && matchesStatus && matchesVoucher;
    });
  }, [data, searchTerm, statusFilter, voucherFilter]);

  const handleExport = () => {
    // En una app real, implementaría la exportación a Excel
    console.log('Exportando datos...', filteredData);
  };

  const columns: GridColDef[] = [
    {
      field: 'voucherNumber',
      headerName: 'Comprobante',
      width: 150,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600, py: 1 }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'client',
      headerName: 'Cliente',
      width: 250,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 500, py: 1 }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'concept',
      headerName: 'Concepto',
      width: 280,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Tooltip title={params.row.description}>
          <Typography variant="body2" sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: 'amount',
      headerName: 'Monto',
      width: 140,
      minWidth: 120,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          S/ {params.value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
        </Typography>
      )
    },
    {
      field: 'dueDate',
      headerName: 'Vencimiento',
      width: 140,
      minWidth: 130,
      renderCell: (params) => {
        const overdue = isOverdue(params.value, params.row.status);
        return (
          <Typography 
            variant="body2" 
            sx={{ 
              color: overdue ? '#EF4444' : '#334155',
              fontWeight: overdue ? 600 : 400
            }}
          >
            {new Date(params.value).toLocaleDateString('es-PE')}
            {overdue && ' ⚠️'}
          </Typography>
        );
      }
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 130,
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: getStatusColor(params.value).bg,
            color: getStatusColor(params.value).color,
            fontWeight: 500,
            border: 'none'
          }}
        />
      )
    },
    {
      field: 'paymentDate',
      headerName: 'Fecha Pago',
      width: 140,
      minWidth: 130,
      renderCell: (params) => (
        params.value ? (
          <Typography variant="body2">
            {new Date(params.value).toLocaleDateString('es-PE')}
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: '#94A3B8' }}>
            -
          </Typography>
        )
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 120,
      minWidth: 100,
      getActions: (params) => {
        const actions = [
          <GridActionsCellItem
            icon={
              <Tooltip title="Ver detalles">
                <VisibilityIcon />
              </Tooltip>
            }
            label="Ver detalles"
            onClick={() => handleViewDetails(params.row)}
          />
        ];

        if (params.row.status === 'Pendiente' || params.row.status === 'Por cobrar') {
          actions.push(
            <GridActionsCellItem
              icon={
                <Tooltip title="Marcar como pagado">
                  <PaymentIcon sx={{ color: '#476797' }} />
                </Tooltip>
              }
              label="Marcar como pagado"
              onClick={() => handleMarkAsPaid(params.row)}
            />
          );
        }

        return actions;
      }
    }
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Filtros y Acciones */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="Buscar por cliente, concepto o comprobante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                    bgcolor: '#F8FAFC'
                  }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e: SelectChangeEvent) => setStatusFilter(e.target.value as SaleStatus | 'all')}
                  label="Estado"
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="Pagado">Pagado</MenuItem>
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                  <MenuItem value="Por cobrar">Por cobrar</MenuItem>
                  <MenuItem value="Anulado">Anulado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Comprobante</InputLabel>
                <Select
                  value={voucherFilter}
                  onChange={(e: SelectChangeEvent) => setVoucherFilter(e.target.value)}
                  label="Comprobante"
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="Factura">Factura</MenuItem>
                  <MenuItem value="Boleta">Boleta</MenuItem>
                  <MenuItem value="Recibo">Recibo</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleExport}
                  sx={{
                    borderColor: '#476797',
                    color: '#476797',
                    '&:hover': {
                      borderColor: '#475569',
                      bgcolor: 'rgba(100, 116, 139, 0.04)'
                    }
                  }}
                >
                  Exportar
                </Button>
                
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setAddModal(true)}
                  sx={{
                    bgcolor: '#3A5578',
                    '&:hover': { bgcolor: '#2E4460' }
                  }}
                >
                  Nueva Venta
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabla */}
      <Card sx={{ height: '650px', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <StyledDataGrid
            rows={filteredData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            disableRowSelectionOnClick
            density="comfortable"
          />
        </Box>
      </Card>

      {/* Modales */}
      <SaleDetailsModal
        open={detailsModal.open}
        onClose={() => setDetailsModal({ open: false, sale: null })}
        sale={detailsModal.sale}
        onMarkAsPaid={() => {
          const sale = detailsModal.sale;
          if (sale) {
            setDetailsModal({ open: false, sale: null });
            setPaymentModal({ open: true, sale });
          }
        }}
      />

      <MarkAsPaidModal
        open={paymentModal.open}
        onClose={() => setPaymentModal({ open: false, sale: null })}
        sale={paymentModal.sale}
        onConfirm={handleConfirmPayment}
      />

      <AddSaleModal
        open={addModal}
        onClose={() => setAddModal(false)}
        onSubmit={handleAddSale}
      />
    </Box>
  );
}
