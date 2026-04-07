import React from 'react';
import { Box, Typography, Alert, Paper } from '@mui/material';
import { PendingRequest } from '../../../supervisor/inventory/components/PendingRequest';
import { cargosSolicitadosData } from '../data/dashboardData';

const CargosSolicitados: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '20px',
        border: '1px solid #F1F5F9',
        mb: 3,
        height: '100%',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          color: '#1B2559', 
          fontWeight: 600,
          fontSize: '1.1rem'
        }}
      >
        Cargos Solicitados
      </Typography>

      {cargosSolicitadosData.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {cargosSolicitadosData.map((request) => (
            <PendingRequest key={request.id_tool_request} request={request} />
          ))}
        </Box>
      ) : (
        <Alert 
          severity="info" 
          sx={{ 
            borderRadius: '20px', 
            backgroundColor: '#F8FAFC', 
            color: '#476797',
            border: '1px dashed #CBD5E1'
          }}
        >
          No hay cargos de momento
        </Alert>
      )}
    </Paper>
  );
};

export default CargosSolicitados;
