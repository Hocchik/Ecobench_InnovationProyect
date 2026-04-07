import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider
} from '@mui/material';
import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Build as BuildIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  /* AccountBalanceWallet as AccountBalanceWalletIcon, */
  Menu as MenuIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { UserProfile } from './components/UserProfile';

const drawerWidth = 280;

const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, path: '/tecnico/dashboard' },
  { text: 'Actividades', icon: <AssignmentIcon />, path: '/tecnico/actividades' },
  { text: 'Herramientas', icon: <BuildIcon />, path: '/tecnico/herramientas' },
  { text: 'Clientes', icon: <PeopleIcon />, path: '/tecnico/clientes' },
  { text: 'Mis boletas', icon: <ReceiptIcon />, path: '/tecnico/MisBoletas' },
  /* { text: 'Mis gastos', icon: <AccountBalanceWalletIcon />, path: '/tecnico/MisGastos' }, */
];

interface Props {
  children?: React.ReactNode;
}

const TechnicianLayout: React.FC<Props> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    if (location.pathname === '/technician') {
      navigate('/tecnico/dashboard');
    }
  }, [location, navigate]);

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ overflow: 'auto', flex: 1, mt: 2, px: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={() => handleDrawerToggle()}
                sx={{
                  position: 'relative',
                  borderRadius: '12px',
                  color: '#A3AED0',
                  '&.active': {
                    bgcolor: 'transparent',
                    color: '#476797',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      bgcolor: '#476797',
                      borderRadius: '0 4px 4px 0',
                    },
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#A3AED0',
                    minWidth: '40px',
                  },
                  '&.active .MuiListItemIcon-root': {
                    color: '#476797',
                  },
                  '&:hover': {
                    bgcolor: 'rgba(71, 103, 151, 0.08)',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    sx: { fontSize: '14px', fontWeight: 500 }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: '12px',
            color: '#FF4D4D',
            '&:hover': {
              bgcolor: 'rgba(255, 77, 77, 0.08)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#FF4D4D' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Cerrar Sesión" 
            primaryTypographyProps={{
              sx: { fontSize: '14px', fontWeight: 500 }
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F4F7FE' }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ 
          keepMounted: true,
          sx: {
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }
          }
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#FFFFFF',
            top: 0,
            height: '100%',
            zIndex: 9999,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1200,
        bgcolor: mobileOpen ? 'rgba(255, 255, 255, 0.8)' : '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        px: 2,
        transition: 'background-color 0.3s ease',
      }}>
        <IconButton
          color="inherit"
          aria-label="abrir menú"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            mr: 2,
            position: 'relative',
            color: '#FDBE33',
            zIndex: 10000
          }}
        >
          <MenuIcon />
        </IconButton>
        
        <UserProfile />
      </Box>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: '100%',
          mt: '64px',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          bgcolor: '#F4F7FE',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default TechnicianLayout;