import { useState, useEffect, ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Build as MaintenanceIcon,
  DirectionsCar as MobilityIcon,
  ShoppingCart as SalesIcon,
  Notifications as NotificationsIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import { PageHeader } from './components/PageHeader';
import { UserProfile } from './components/UserProfile';

const drawerWidth = 280;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/auxiliary/dashboard' },
    { text: 'Clientes', icon: <PeopleIcon />, path: '/auxiliary/clientes' },
    { text: 'Ventas', icon: <SalesIcon />, path: '/auxiliary/ventas' },
    { text: 'Movilidad', icon: <MobilityIcon />, path: '/auxiliary/movilidad' },
    { text: 'Inventario', icon: <InventoryIcon />, path: '/auxiliary/inventario' },
    { text: 'Mantenimiento', icon: <MaintenanceIcon />, path: '/auxiliary/mantenimiento' },
];

interface AuxiliaryLayoutProps {
  children: ReactNode;
}

function AuxiliaryLayout({ children }: AuxiliaryLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (location.pathname === '/auxiliary') {
      navigate('/auxiliary/dashboard');
    }
  }, [location, navigate]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor:'#F4F7FE'}}>
      <AppBar 
        position="fixed" 
        sx={{ 
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: '#FFFFFF',
          boxShadow: 'none',
          borderBottom: '1px solid #E2E8F0',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: '80px !important' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <PageHeader />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <UserProfile />
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        sx={{
          '& .MuiPaper-root': {
            minWidth: '200px',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
            mt: 1
          }
        }}
      >
        <MenuItem onClick={handleProfileClose}>Mi Perfil</MenuItem>
        <MenuItem onClick={handleProfileClose}>Configuración</MenuItem>
        <MenuItem onClick={handleProfileClose} sx={{ color: 'error.main' }}>Cerrar Sesión</MenuItem>
      </Menu>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#FFFFFF',
            borderRight: '1px solid #E2E8F0',
            zIndex: (theme) => theme.zIndex.drawer + 2,
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid #E2E8F0' }}>
          <img 
            src="/imgs/RyeldAscensoresLogo.png" 
            alt="RYELD ASCENSORES" 
            style={{ 
              width: '100%',
              height: 'auto',
              maxHeight: '60px',
              objectFit: 'contain'
            }} 
          />
        </Box>
        <Box sx={{ overflow: 'auto', mt: 2, px: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
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
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        {children}
      </Box>  
    </Box>
  );
}

export default AuxiliaryLayout;