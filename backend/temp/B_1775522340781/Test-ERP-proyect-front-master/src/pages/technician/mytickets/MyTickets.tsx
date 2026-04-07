import { Container, Paper, Typography, Box, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useTechTickets } from './context/TechTicketsContext';

const MyTickets = () => {
  const { tickets } = useTechTickets();

  return (
    <Container sx={{ py: 3, px: { xs: 1, sm: 3 } }}>
      <Paper elevation={0} sx={{ bgcolor: 'white', p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ color: '#000000', mb: 3, fontWeight: 600 }}>
          🧾 Mis Boletas
        </Typography>

        <Box sx={{ mb: 4 }}>
          {tickets.map((ticket) => (
            <Button
              key={ticket.id}
              variant="outlined"
              fullWidth
              endIcon={<DownloadIcon />}
              sx={{
                mb: 2,
                py: 1.2,
                borderRadius: 2,
                borderColor: '#476797',
                color: '#000',
                justifyContent: 'space-between',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#3a547a',
                  bgcolor: '#F4F7FB'
                }
              }}
            >
              Mi boleta de pago - {ticket.month} {ticket.year}
            </Button>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default MyTickets;