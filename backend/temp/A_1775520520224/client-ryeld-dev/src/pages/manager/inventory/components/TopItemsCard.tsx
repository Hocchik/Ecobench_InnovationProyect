import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { topSaleItems } from '../data/enhancedInventoryData';

export function TopItemsCard() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '20px',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        height: '100%',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2} color="#1B2559">
        Repuestos con Mayor Salida
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxHeight: 'calc(50vh - 80px)',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#F4F7FE',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#A3AED0',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#476797',
          },
          pr: 1,
        }}
      >
        {topSaleItems.map((item, index) => (
          <Card
            key={item.id}
            sx={{
              borderRadius: '20px',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid #E2E8F0',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0px 4px 12px rgba(71, 103, 151, 0.15)',
                transform: 'translateY(-1px)'
              }
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              {/* Header con posición */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Chip
                  label={`#${index + 1}`}
                  size="small"
                  sx={{
                    bgcolor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#E2E8F0',
                    color: index < 3 ? '#000' : '#666',
                    fontWeight: 'bold',
                    minWidth: '32px'
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                  {item.code}
                </Typography>
              </Box>

              {/* Nombre del producto */}
              <Typography 
                variant="body2" 
                fontWeight="bold" 
                color="#1B2559" 
                sx={{ 
                  mb: 1,
                  lineHeight: 1.3,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {item.name}
              </Typography>

              {/* Valor y cantidad */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Valor unitario
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="#476797">
                    S/ {item.value.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="text.secondary">
                    Salidas
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="#476797">
                    {item.exitQuantity}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  );
}
