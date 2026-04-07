import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

// Páginas comunes para todos los layouts
const commonPages: { [key: string]: { title: string; subtitle: string } } = {
  'dashboard': {
    title: 'Inicio',
    subtitle: 'Gestión y accesos directos a las principales funciones'
  },
  'clientes': {
    title: 'Clientes',
    subtitle: 'Gestión de clientes y sus servicios'
  },
  'inventario': {
    title: 'Inventario',
    subtitle: 'Gestión de herramientas y materiales'
  },
  'mantenimiento': {
    title: 'Mantenimiento',
    subtitle: 'Programación y control de mantenimientos'
  }
};

// Páginas específicas para el layout de Supervisor
const supervisorPages: { [key: string]: { title: string; subtitle: string } } = {
  'actividades': {
    title: 'Actividades',
    subtitle: 'Control y seguimiento de actividades programadas'
  },
  'asistencia': {
    title: 'Asistencia',
    subtitle: 'Control de asistencia del personal'
  }
};

// Páginas específicas para el layout de Auxiliar
const auxiliaryPages: { [key: string]: { title: string; subtitle: string } } = {
  'ventas': {
    title: 'Ventas',
    subtitle: 'Gestión de ventas y cotizaciones'
  },
  'movilidad': {
    title: 'Movilidad',
    subtitle: 'Control de movilidad y transporte'
  }
};

// Páginas específicas para el layout de RRHH
const hrPages: { [key: string]: { title: string; subtitle: string } } = {
  'empleados': {
    title: 'Empleados',
    subtitle: 'Gestión del personal'
  },
  'salidas': {
    title: 'Salidas',
    subtitle: 'Control de salidas y permisos'
  }
};

// Páginas específicas para el layout de Gerente
const managerPages: { [key: string]: { title: string; subtitle: string } } = {
  'tecnicos': {
    title: 'Técnicos',
    subtitle: 'Gestión de técnicos'
  },
  'personal': {
    title: 'Personal',
    subtitle: 'Administración del personal'
  },
  'caja-chica': {
    title: 'Caja Chica',
    subtitle: 'Control de gastos menores'
  }
};

// Páginas específicas para el layout de Técnico
const technicianPages: { [key: string]: { title: string; subtitle: string } } = {
  'herramientas': {
    title: 'Herramientas',
    subtitle: 'Control de herramientas asignadas'
  },
  'MisBoletas': {
    title: 'Mis Boletas',
    subtitle: 'Gestión de boletas personales'
  },
  'MisGastos': {
    title: 'Mis Gastos',
    subtitle: 'Control de gastos personales'
  }
};

export const PageHeader = () => {
  const location = useLocation();

  const getPageInfo = () => {
    const path = location.pathname;
    const currentPage = path.split('/').pop() || 'dashboard';
    
    // Determinar el layout actual basado en el path
    const layoutType = path.split('/')[1];
    
    let pageInfo;
    
    // Primero buscar en páginas comunes
    pageInfo = commonPages[currentPage];
    
    // Si no se encuentra en comunes, buscar en el layout específico
    if (!pageInfo) {
      switch (layoutType) {
        case 'sp7x9v3':
          pageInfo = supervisorPages[currentPage];
          break;
        case 'auxiliary':
          pageInfo = auxiliaryPages[currentPage];
          break;
        case 'hr':
          pageInfo = hrPages[currentPage];
          break;
        case 'manager':
          pageInfo = managerPages[currentPage];
          break;
        case 'technician':
          pageInfo = technicianPages[currentPage];
          break;
      }
    }
    
    return pageInfo || {
      title: 'Inicio',
      subtitle: 'Gestión y accesos directos a las principales funciones'
    };
  };

  const pageInfo = getPageInfo();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ color: '#1B2559', fontWeight: 600 }}>
        {pageInfo.title}
      </Typography>
      <Typography variant="caption" sx={{ color: '#A3AED0' }}>
        {pageInfo.subtitle}
      </Typography>
    </Box>
  );
};