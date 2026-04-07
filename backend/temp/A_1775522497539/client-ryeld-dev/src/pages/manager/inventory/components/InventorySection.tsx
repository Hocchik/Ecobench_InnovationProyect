import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useState } from 'react';
import { InventoryTable } from './InventoryTable';
import { InventoryDetailModal } from './InventoryDetailModal';
import { inventoryItems } from '../data/enhancedInventoryData';
import { InventoryItem } from '../types/inventoryTypes';

export function InventorySection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrar items basado en el término de búsqueda
  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          borderRadius: '20px',
          boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
          height: 'calc(50vh - 20px)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold" color="#1B2559">
            Inventario Disponible
          </Typography>
          <Box>
            <TextField
              placeholder="Buscar por Código o Nombre..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                '& .MuiInputBase-input': { fontSize: '0.875rem' }
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Box>
        <Box sx={{ height: '100%' }}>
          <InventoryTable 
            items={filteredItems} 
            onViewDetails={handleViewDetails}
          />
        </Box>
      </Paper>

      <InventoryDetailModal
        open={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      />
    </>
  );
}
