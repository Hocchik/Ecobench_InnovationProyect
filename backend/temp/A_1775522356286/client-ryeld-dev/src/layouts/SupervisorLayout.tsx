import { useEffect, ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as ActivityIcon,
  Inventory as InventoryIcon,
  Build as MaintenanceIcon,
  AccessTime as AssistanceIcon,
} from '@mui/icons-material';
import { UserProfile } from './components/UserProfile';
import { PageHeader } from './components/PageHeader';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/supervisor/dashboard' },
  { text: 'Clientes', icon: <PeopleIcon />, path: '/supervisor/clientes' },
  { text: 'Actividades', icon: <ActivityIcon />, path: '/supervisor/actividades' },
  { text: 'Inventario', icon: <InventoryIcon />, path: '/supervisor/inventario' },
  { text: 'Mantenimiento', icon: <MaintenanceIcon />, path: '/supervisor/mantenimiento' },
  { text: 'Asistencia', icon: <AssistanceIcon />, path: '/supervisor/asistencia' },
];

interface SupervisorLayoutProps {
  children: ReactNode;
}

function SupervisorLayout({ children }: SupervisorLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (location.pathname === '/supervisor') {
      navigate('/supervisor/dashboard');
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
              maxHeight: '45px',
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
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: `calc(100% - ${drawerWidth}px)`,
          paddingTop: '5rem',
          paddingLeft: '2rem',
          paddingBottom:'2rem',
          height: '100%',
          overflow: 'hidden',
          bgcolor: '#F4F7FE'
        }}
      >
        {children}
      </Box>  
    </Box>
  );
}

export default SupervisorLayout;