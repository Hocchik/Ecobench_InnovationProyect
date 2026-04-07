import {
  Box,
  /* Typography, */
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { ElevatorPartLocation } from '../api/SupClientInterfaces';

const ELEVATOR_IMAGE = '/imgs/elevatormodel.png';

const locationLabels: Record<'CM' | 'DA' | 'PA', string> = {
  CM: 'CUARTO DE MÁQUINAS (CM)',
  DA: 'DUCTO DEL ASCENSOR (DA)',
  PA: 'POZO DEL ASCENSOR (PA)',
};

const heights: Record<'CM' | 'DA' | 'PA', string> = {
  CM: '25%',
  DA: '60%',
  PA: '15%',
};

interface Props {
  partLocations: ElevatorPartLocation[];
}

const ElevatorLocationDiagram = ({ partLocations }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        alignItems: 'flex-start',
        mb: 3,
      }}
    >
      {/* Imagen del ascensor con zonas */}
      <Box sx={{ position: 'relative', width: 280, minWidth: 200, height: 810 }}>
        <img
          src={ELEVATOR_IMAGE}
          alt="Ascensor"
          style={{
            width: '90%',
            height: '100%',
            borderRadius: 8,
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '90%',
            height: '25%',
            bgcolor: 'rgba(0,0,255,0.10)',
            borderRadius: '8px 8px 0 0',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: '25%',
            width: '90%',
            height: '59%',
            bgcolor: 'rgba(0,255,0,0.08)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '90%',
            height: '16%',
            bgcolor: 'rgba(255,165,0,0.12)',
            borderRadius: '0 0 8px 8px',
          }}
        />
      </Box>

      {/* Tabla de ubicaciones */}
      <TableContainer component={Paper} sx={{ flex: 1, height: 810 }}>
        <Table size="small" sx={{ height: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f4f4f4', width: 180 }}>
                UBICACIÓN
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f4f4f4' }}>
                ELEMENTO
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f4f4f4' }}>
                DESCRIPCIÓN
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(['CM', 'DA', 'PA'] as const).map((loc) => {
              const part = partLocations.find((p) => p.location === loc);
              return (
                <TableRow key={loc} sx={{ height: heights[loc], verticalAlign: 'top' }}>
                  <TableCell sx={{ fontWeight: 700, verticalAlign: 'top' }}>
                    {locationLabels[loc]}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top' }}>
                    {part?.element || <em>Sin elemento</em>}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top' }}>
                    {part?.description || <em>Sin descripción</em>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ElevatorLocationDiagram;