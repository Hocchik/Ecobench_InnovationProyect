import { useState } from 'react';
import { Box, Chip, IconButton, TextField, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Visibility } from '@mui/icons-material';

import { InventoryHeader } from './components/InventoryHeader';
import { InventoryTabs } from './components/InventoryTabs';
import { InventoryGrid } from './components/InventoryGrid';
import { PendingRequest } from './components/PendingRequest';
import { ItemDetailsModal } from './components/ItemDetailsModal';
import ToolRequestModal from './components/ToolRequestModal';
import { Search } from 'lucide-react';

import {
  InventoryItem,
  ToolRequestPOST,
  ToolRequestGET
} from './api/SupInventoryInterfaces';
import { useSupInventory } from './context/SupInventoryContext';

function Inventory() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | ToolRequestGET>();
  const [modalOpen, setModalOpen] = useState(false);
  const [isToolRequestModalOpen, setIsToolRequestModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    inventoryItems,
    toolRequests,
    createToolRequest,
    /* updateToolRequest, */
    /* deleteToolRequest */
  } = useSupInventory();

  const adaptedInventory = inventoryItems.map(item => ({
    ...item,
    id: item.id_item,
    name: item.name_item,
    code: item.code_item,
    category: item.category,
    totalQuantity: item.total_quantity,
    status: item.status === "OutOfStock" ? "Out of Stock" : item.status
  }));

  const adaptedToolRequests = toolRequests.map(req => ({
    ...req,
    id: req.id_tool_request,
    requestNumber: req.request_number,
    technician: req.technician,
    date: req.date,
    status:
      req.status === "Approved"
        ? "Approved"
        : req.status === "Denied"
        ? "Denied"
        : "Pending"
  }));

  const handleTabChange = (_: unknown, newValue: number) => {
    setTabValue(newValue);
    setSearchTerm('');
  };


  const handleItemClick = (item: InventoryItem | ToolRequestGET) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleToolRequest = async (request: ToolRequestPOST) => {
    try {
      const lastRequest = toolRequests[toolRequests.length - 1];
      let newRequestNumber = "CAS-001";
      if (lastRequest) {
        const lastNum = parseInt(lastRequest.request_number.replace(/\D/g, ""), 10);
        newRequestNumber = `CAS-${(lastNum + 1).toString().padStart(3, "0")}`;
      }
      request.request_number = newRequestNumber;
      await createToolRequest(request);
      setIsToolRequestModalOpen(false);
    } catch (error) {
      console.error("Error al crear solicitud:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return { bg: '#E6FAF5', color: '#476797' };
      case 'Limited':
        return { bg: '#FFF6E5', color: '#FFB547' };
      case 'Out of Stock':
        return { bg: '#FFE4E4', color: '#D32F2F' };
      case 'Pendiente':
        return { bg: '#FFF6E5', color: '#FFB547' };
      case 'Approved':
        return { bg: '#E6FAF5', color: '#476797' };
      case 'Pending':
        return { bg: '#FFF6E5', color: '#FFB547' };
      case 'Denied':
        return { bg: '#FFE5E5', color: '#FF4842' };
      default:
        return { bg: '#F5F5F5', color: '#A3AED0' };
    }
  };

  const filteredInventoryItems = (items: any[]) => {
    if (!searchTerm) return items;

    if (tabValue === 3) {
      return items.filter(item =>
        (item.requestNumber ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.technician ?? '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return items.filter(item =>
        (item.name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.code ?? '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const getSearchPlaceholder = () => {
    switch (tabValue) {
      case 3:
        return "Buscar por N°Cargo o Técnico...";
      default:
        return "Buscar por Nombre o Código...";
    }
  };

  const handleViewRequest = (request: ToolRequestGET) => {
    setTabValue(3);
    setSelectedItem(request);
    setModalOpen(true);
  };

  const inventoryColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre del Artículo',
      flex: 1,
      width: 150,
      filterable: true
    },
    {
      field: 'code',
      headerName: 'Código',
      width: 120,
      filterable: true
    },
    /* {
      field: 'category',
      headerName: 'Categoría',
      width: 130,
      filterable: true
    }, */
    {
      field: 'totalQuantity',
      headerName: 'Cantidad',
      width: 100,
      filterable: true
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            bgcolor: getStatusColor(params.value).bg,
            color: getStatusColor(params.value).color,
            borderRadius: '8px',
            fontWeight: 500
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 80,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <IconButton
          onClick={() => handleItemClick(params.row)}
          size="small"
          sx={{
            color: '#476797',
            '&:hover': {
              bgcolor: 'rgba(71, 103, 151, 0.08)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s'
          }}
        >
          <Visibility fontSize="small" />
        </IconButton>
      ),
    }
  ];

  const requestsColumns: GridColDef[] = [
    {
      field: 'requestNumber',
      headerName: 'N° de Cargo',
      width: 130,
      filterable: true
    },
    {
      field: 'technician',
      headerName: 'Técnico',
      flex: 1,
      filterable: true
    },
    {
      field: 'date',
      headerName: 'Fecha',
      width: 130,
      filterable: true
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            bgcolor: getStatusColor(params.value).bg,
            color: getStatusColor(params.value).color,
            borderRadius: '8px',
            fontWeight: 500
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 80,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <IconButton
          onClick={() => handleItemClick(params.row)}
          size="small"
          sx={{
            color: '#476797',
            '&:hover': {
              bgcolor: 'rgba(71, 103, 151, 0.08)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s'
          }}
        >
          <Visibility fontSize="small" />
        </IconButton>
      ),
    }
  ];

  return (
  <Box sx={{ height: '100%', p: 3 }}>
    <InventoryHeader onNewRequest={() => setIsToolRequestModalOpen(true)} />

    <Box sx={{ display: 'flex', gap: 3 }}>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <InventoryTabs value={tabValue} onChange={handleTabChange} />
          <Box sx={{ position: 'relative', width: '300px' }}>
            <TextField
              fullWidth
              placeholder={getSearchPlaceholder()}
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: '#E2E8F0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#476797'
                  }
                }
              }}
            />
            <Search
              size={20}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#A3AED0'
              }}
            />
          </Box>
        </Box>

        <InventoryGrid
          rows={
            tabValue === 3
              ? filteredInventoryItems(adaptedToolRequests)
              : tabValue === 1
              ? filteredInventoryItems(adaptedInventory.filter(item => item.category === "Repuestos"))
              : tabValue === 2
              ? filteredInventoryItems(adaptedInventory.filter(item => item.category === "Herramientas"))
              : filteredInventoryItems(adaptedInventory.filter(item => item.category === "Consumibles"))
          }
          columns={tabValue === 3 ? requestsColumns : inventoryColumns}
        />
      </Box>

      <Box
        sx={{
          width: '350px',
          bgcolor: 'white',
          borderRadius: '20px',
          p: 3,
          boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
          height: 'calc(100vh - 250px)',
          overflow: 'auto'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: '#1B2559',
            fontWeight: 600,
            mb: 3
          }}
        >
          Cargos Pendientes
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {adaptedToolRequests
            .filter(request => request.status === 'Pending')
            .map((request) => (
              <PendingRequest
                key={request.id}
                request={request}
                onView={handleViewRequest}
              />
            ))}
        </Box>
      </Box>
    </Box>

    <ItemDetailsModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      item={selectedItem ?? null}
      isRequest={tabValue === 3}
      getStatusColor={getStatusColor}
    />


    <ToolRequestModal
      open={isToolRequestModalOpen}
      onClose={() => setIsToolRequestModalOpen(false)}
      inventoryItems={inventoryItems}
      onSubmit={handleToolRequest}
    />
  </Box>
);

}

export default Inventory;