import { Box, Tabs, Tab } from '@mui/material';

interface MaintenanceTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const MaintenanceTabs = ({ value, onChange }: MaintenanceTabsProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs 
        value={value} 
        onChange={onChange}
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            color: '#A3AED0',
            '&.Mui-selected': {
              color: '#476797'
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#476797'
          }
        }}
      >
        <Tab label="Mantenimientos Preventivos" />
        <Tab label="Mantenimientos Correctivos" />
      </Tabs>
    </Box>
  );
};