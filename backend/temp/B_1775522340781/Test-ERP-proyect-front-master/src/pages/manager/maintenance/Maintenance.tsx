import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { preventiveMaintenances, correctiveMaintenances } from './data/tableData';
import { stats } from './data/statsData';


function ManagerMaintenance() {
  const [searchTermPreventive, setSearchTermPreventive] = useState('');
  const [searchTermCorrective, setSearchTermCorrective] = useState('');

  return (
    <Box sx={{
      height: '100%',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '4px',
        backgroundColor: 'transparent'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '4px'
      },
      '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.2)'
      },
      paddingBottom: '10px'
    }}>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          overflowX: 'auto',
          gap: 2,
          pb: 1,
        }}
      >
        {stats.map((stat, index) => (
          <Paper
            key={index}
            sx={{
              minWidth: 250,
              flexShrink: 0,
              p: 2,
              borderRadius: 3,
              position: 'relative',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              {stat.title}
            </Typography><Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {stat.total}
            </Typography>
          </Paper>
        ))}
      </Box>
      <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, p: 1 }}>
        {stats.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                position: 'relative',
                height: '100%',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {stat.title}
              </Typography><Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {stat.total}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid size={12} sx={{ p: 3 }}>{/* That grid contain the maintenance tables */}
        {/* Mantenimientos Preventivos */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ color: '#1B2559', fontWeight: 600 }}>
            Mantenimientos Preventivos
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '8px',
                color: '#476797',
                borderColor: '#476797'
              }}
            >
              Exportar
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                borderRadius: '8px',
                bgcolor: '#476797',
                '&:hover': {
                  bgcolor: '#3A5478'
                }
              }}
            >
              Agregar Mantenimiento
            </Button>
            <Box sx={{
              position: 'relative',
              width: '300px'
            }}>
              <TextField
                fullWidth
                placeholder="Buscar por Mes o Edificio..."
                variant="outlined"
                size="small"
                value={searchTermPreventive}
                onChange={(e) => setSearchTermPreventive(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white'
                  }
                }}
              />
              <Search sx={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#A3AED0'
              }} />
            </Box>
          </Box>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '20px',
            boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
            mb: 4,
            overflow: 'auto'
          }}
        >
          <Table size="small" aria-label="a dense table" >
            <TableHead>
              <TableRow>
                <TableCell>Mes</TableCell>
                <TableCell>Edificio</TableCell>
                <TableCell>Periodo</TableCell>
                <TableCell>Hora Programada</TableCell>
                <TableCell>Fecha Programada</TableCell>
                <TableCell align="right">Más Detalles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {preventiveMaintenances
                .filter(maintenance =>
                  maintenance.month.toLowerCase().includes(searchTermPreventive.toLowerCase()) ||
                  maintenance.building.toLowerCase().includes(searchTermPreventive.toLowerCase())
                )
                .map((maintenance) => (
                  <TableRow
                    key={maintenance.id}
                    sx={{ '&:hover': { backgroundColor: '#F8F9FF' } }}
                  >
                    <TableCell>{maintenance.month}</TableCell>
                    <TableCell>{maintenance.building}</TableCell>
                    <TableCell>{maintenance.period}</TableCell>
                    <TableCell>{maintenance.scheduledTime}</TableCell>
                    <TableCell>{maintenance.scheduledDate}</TableCell>
                    <TableCell align="right">
                      <Button
                        sx={{
                          color: '#476797',
                          textTransform: 'none'
                        }}
                      >
                        
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Mantenimientos Correctivos */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ color: '#1B2559', fontWeight: 600 }}>
            Mantenimientos Correctivos y Reparaciones
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '8px',
                color: '#476797',
                borderColor: '#476797'
              }}
            >
              Exportar
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                borderRadius: '8px',
                bgcolor: '#476797',
                '&:hover': {
                  bgcolor: '#3A5478'
                }
              }}
            >
              Agregar Mantenimiento
            </Button>
            <Box sx={{
              position: 'relative',
              width: '300px'
            }}>
              <TextField
                fullWidth
                placeholder="Buscar por Mes o Edificio..."
                variant="outlined"
                size="small"
                value={searchTermCorrective}
                onChange={(e) => setSearchTermCorrective(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white'
                  }
                }}
              />
              <Search sx={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#A3AED0'
              }} />
            </Box>
          </Box>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '20px',
            boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
            overflow: 'auto'
          }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Mes</TableCell>
                <TableCell>Edificio</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Hora Programada</TableCell>
                <TableCell>Fecha Programada</TableCell>
                <TableCell align="right">Más Detalles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {correctiveMaintenances
                .filter(maintenance =>
                  maintenance.month.toLowerCase().includes(searchTermCorrective.toLowerCase()) ||
                  maintenance.building.toLowerCase().includes(searchTermCorrective.toLowerCase())
                )
                .map((maintenance) => (
                  <TableRow
                    key={maintenance.id}
                    sx={{ '&:hover': { backgroundColor: '#F8F9FF' } }}
                  >
                    <TableCell>{maintenance.month}</TableCell>
                    <TableCell>{maintenance.building}</TableCell>
                    <TableCell>{maintenance.type}</TableCell>
                    <TableCell>{maintenance.scheduledTime}</TableCell>
                    <TableCell>{maintenance.scheduledDate}</TableCell>
                    <TableCell align="right">
                      <Button
                        sx={{
                          color: '#476797',
                          textTransform: 'none'
                        }}
                      >
                        View more
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
}

export default ManagerMaintenance