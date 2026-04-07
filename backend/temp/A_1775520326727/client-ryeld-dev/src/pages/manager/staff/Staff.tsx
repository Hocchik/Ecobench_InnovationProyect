import { useState } from 'react';
import { Box, Tabs, Tab, Paper, CircularProgress } from '@mui/material';
import { Domain, Assignment, ManageAccounts } from '@mui/icons-material';
import { AreasTable } from './components/AreasTable';
import { RolesTable } from './components/RolesTable';
import { EmployeesManagementTable } from './components/EmployeesManagementTable';
import { StaffProvider, useStaffContext } from './context/StaffContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`staff-tabpanel-${index}`}
      aria-labelledby={`staff-tab-${index}`}
      {...other}
      style={{ flex: 1, minHeight: 0, display: value !== index ? 'none' : 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
    </div>
  );
}

function StaffContent() {
  const [tabValue, setTabValue] = useState(0);
  const { initialLoading } = useStaffContext();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (initialLoading) {
    return (
      <Box sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#476797' }} />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ px: 1.5, py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Tabs Navigation */}
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: '20px 20px 0 0',
            border: '1px solid #E2E8F0',
            borderBottom: 'none',
            mb: 0
          }}
        >
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                minHeight: 56,
                fontSize: '0.95rem',
                color: '#476797',
              },
              '& .Mui-selected': {
                color: '#1B2559',
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                bgcolor: '#476797',
              },
            }}
          >
            <Tab 
              icon={<ManageAccounts />} 
              label="Gestión de Empleados" 
              iconPosition="start"
              sx={{ minWidth: 180 }}
            />
            <Tab 
              icon={<Domain />} 
              label="Áreas" 
              iconPosition="start"
              sx={{ minWidth: 140 }}
            />
            <Tab 
              icon={<Assignment />} 
              label="Roles" 
              iconPosition="start"
              sx={{ minWidth: 140 }}
            />
          </Tabs>
        </Paper>

        {/* Tab Content — all tabs rendered once, hidden via display:none */}
        <Paper 
          elevation={0}
          sx={{ 
            flex: 1,
            borderRadius: '0 0 20px 20px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 1, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <EmployeesManagementTable />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 1, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <AreasTable />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ p: 1, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <RolesTable />
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </>
  );
}

function ManagerStaff() {
  return (
    <StaffProvider>
      <StaffContent />
    </StaffProvider>
  );
}

export default ManagerStaff;