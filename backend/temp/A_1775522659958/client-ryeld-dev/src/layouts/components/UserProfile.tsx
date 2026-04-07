import { useEffect, useState } from 'react';
import { Avatar, Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../api/AuthService';

interface UserProfileProps {
  className?: string;
}

export const UserProfile = ({ className }: UserProfileProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState<any>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUserData(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await AuthService.logout();
    navigate('/login');
  };

  const getRoleLabel = (roleName: string) => {
    switch (roleName) {
      case 'Técnico':
        return 'Técnico';
      case 'Supervisor':
        return 'Supervisor';
      case 'Gerente':
        return 'Gerente';
      case 'Auxiliar':
        return 'Auxiliar';
      case 'RecursosHumanos':
        return 'Recursos Humanos';
      default:
        return roleName || 'Usuario';
    }
  };

  return (
    <Box className={className} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Typography variant="subtitle2" sx={{ color: '#1B2559', fontWeight: 500 }}>
          {userData?.employeeName || 'Usuario'}
        </Typography>
        <Typography variant="caption" sx={{ color: '#A3AED0' }}>
          {userData ? getRoleLabel(userData.role) : 'Usuario'}
        </Typography>
      </Box>

      <IconButton
        size="small"
        onClick={handleMenu}
        sx={{
          p: 0,
          '&:hover': {
            bgcolor: 'rgba(71, 103, 151, 0.04)'
          }
        }}
      >
        <Avatar 
          sx={{ 
            width: 40, 
            height: 40,
            bgcolor: '#476797'
          }}
        >
          <AccountCircle />
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1.5,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            minWidth: '200px'
          }
        }}
      >
        <MenuItem 
          onClick={handleLogout}
          sx={{ 
            py: 1.5,
            px: 2,
            color: '#FF4842',
            '&:hover': {
              bgcolor: 'rgba(255, 72, 66, 0.08)'
            }
          }}
        >
          <ExitToApp sx={{ mr: 2, fontSize: 20 }} />
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </Box>
  );
};