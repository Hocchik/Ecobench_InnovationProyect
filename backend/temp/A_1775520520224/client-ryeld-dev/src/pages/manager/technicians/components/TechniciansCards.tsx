import { Box, Typography, Paper, Chip } from '@mui/material';
import { Person, LocationOn } from '@mui/icons-material';
import { Technician } from '../data/techniciansData';

interface TechniciansCardsProps {
  title: string;
  technicians: Technician[];
  showProvince?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'En actividad':
      return { bg: '#E6FAF5', color: '#476797' };
    case 'Disponible':
      return { bg: '#E3F2FD', color: '#1976D2' };
    default:
      return { bg: '#F5F5F5', color: '#A3AED0' };
  }
};

export function TechniciansCards({ title, technicians, showProvince = false }: TechniciansCardsProps) {
  return (
    <Paper
      sx={{
        p: 2.5,
        borderRadius: '20px',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        bgcolor: 'white',
        height: '25vh', 
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#476797', fontSize: '1rem' }}>
          {title}
        </Typography>
        <Chip
          label={technicians.length}
          sx={{
            bgcolor: '#E6FAF5',
            color: '#476797',
            fontWeight: 600,
            fontSize: '0.75rem',
            minWidth: 35,
            height: 24
          }}
        />
      </Box>

      {technicians.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 4, 
            color: '#A3AED0',
            fontStyle: 'italic',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="body2">
            No hay técnicos en esta categoría
          </Typography>
        </Box>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1.5,
          overflowY: 'auto',
          flex: 1,
          '&::-webkit-scrollbar': {
            width: '6px'
          },
          '&::-webkit-scrollbar-track': {
            background: '#F4F7FE'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#A3AED0',
            borderRadius: '3px'
          }
        }}>
          {technicians.map((technician) => (
            <Box
              key={technician.id}
              sx={{
                p: 2,
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                bgcolor: '#F8F9FF',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.06)',
                  borderColor: '#476797'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: showProvince && technician.province ? 1 : 0 }}>
                <Person sx={{ color: '#476797', fontSize: '18px' }} />
                <Typography 
                  variant="body2" 
                  fontWeight="600" 
                  sx={{ color: '#2D3748', flex: 1, fontSize: '0.875rem' }}
                >
                  {technician.name}
                </Typography>
              </Box>

              {showProvince && technician.province && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocationOn sx={{ color: '#A3AED0', fontSize: '16px' }} />
                  <Typography 
                    variant="caption" 
                    sx={{ color: '#A3AED0', fontWeight: 500 }}
                  >
                    {technician.province}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Chip
                  label={technician.status}
                  sx={{
                    bgcolor: getStatusColor(technician.status).bg,
                    color: getStatusColor(technician.status).color,
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: 20
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}
