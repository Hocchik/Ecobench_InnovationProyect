import { Tabs, Tab, Box } from '@mui/material';

interface InventoryTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const tabLabels = ['Consumibles', 'Repuestos', 'Herramientas', 'Solicitudes'];

export const InventoryTabs = ({ value, onChange }: InventoryTabsProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs
        value={value}
        onChange={onChange}
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            minWidth: 100,
            fontWeight: 500,
            color: '#A3AED0',
            '&.Mui-selected': {
              color: '#476797',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#476797',
          },
        }}
      >
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
    </Box>
  );
};