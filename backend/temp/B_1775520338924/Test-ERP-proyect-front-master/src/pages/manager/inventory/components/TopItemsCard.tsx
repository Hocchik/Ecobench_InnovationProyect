import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent
} from '@mui/material';
import { topItems } from '../data/inventoryData';

export function TopItemsCard() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
        height: '100%',
      }}
    >
      <Typography variant="body1" mb={1}>
        Repuestos con mayor salida
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          maxHeight: 'calc(50vh - 20px)',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a8a8a8',
          },
          pr: 1,
        }}
      >
        {topItems.map((item) => (
          <Card
            key={item.id}
            sx={{
              borderRadius: '10px',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
            }}
          >
            <CardContent sx={{ position: 'relative', py: 1.5, px: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {item.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Valor: s/ {item.value}
              </Typography>
              <Typography variant="h6" component="div" fontWeight="bold">
                {item.quantity}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  );
}
