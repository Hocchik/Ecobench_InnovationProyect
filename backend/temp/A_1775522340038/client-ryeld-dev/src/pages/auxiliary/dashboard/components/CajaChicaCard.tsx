import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { cajaChicaData } from '../data/dashboardData';

const CajaChicaCard = () => {
  return (
    <Card
      sx={{
        borderRadius: '20px',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        mb: 3,
        overflow: 'visible'
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Grid container>
          {/* Monto actual */}
          <Grid item xs={12} md={4} 
            sx={{ 
              p: 3, 
              borderRight: { xs: 'none', md: '1px solid #F1F5F9' },
              borderBottom: { xs: '1px solid #F1F5F9', md: 'none' }
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#476797', fontWeight: 500 }}>
              Monto actual
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1B2559' }}>
                s/. {cajaChicaData.montoActual.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </Typography>
              <Box 
                sx={{ 
                  backgroundColor: '#FAFBFF', 
                  p: 1,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="body2" sx={{ color: '#FFAB00' }}>
                  <KeyboardArrowDown color="inherit" fontSize="small" />
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          {/* Últimos movimientos */}
          <Grid item xs={12} md={8} sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: '#476797', fontWeight: 500 }}>
              Últimos movimientos:
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
              {cajaChicaData.ultimosMovimientos.map((movimiento) => (
                <Box 
                  key={movimiento.id}
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: movimiento.tipo === 'Ingreso' ? '#476797' : '#F44336',
                      fontWeight: 500
                    }}
                  >
                    s/. {movimiento.monto.toFixed(2)}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {movimiento.tipo === 'Ingreso' ? (
                      <KeyboardArrowUp sx={{ color: '#476797', fontSize: '1rem' }} />
                    ) : (
                      <KeyboardArrowDown sx={{ color: '#F44336', fontSize: '1rem' }} />
                    )}
                    <Typography variant="caption" sx={{ color: movimiento.tipo === 'Ingreso' ? '#476797' : '#F44336' }}>
                      {movimiento.concepto}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CajaChicaCard;
