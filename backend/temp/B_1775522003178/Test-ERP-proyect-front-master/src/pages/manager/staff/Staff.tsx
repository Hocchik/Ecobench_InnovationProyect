import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import {StaffHeader} from './components/StaffHeader';
import {StaffTable} from './components/StaffTable';
import { staffData, Staff,staffColumns } from './data/staffData';

function ManagerStaff() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar personal basado en el término de búsqueda
  const filteredStaff = useMemo(() => {
    if (!searchTerm) return staffData;
    
    const searchLower = searchTerm.toLowerCase();
    return staffData.filter((employee: Staff) =>
      employee.firstName.toLowerCase().includes(searchLower) ||
      employee.lastName.toLowerCase().includes(searchLower) ||
      employee.area.toLowerCase().includes(searchLower) ||
      employee.role.toLowerCase().includes(searchLower) ||
      employee.personalEmail.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const handleAddStaff = () => {
    // TODO: Implementar modal de agregar personal
    console.log('Abrir modal para agregar nuevo personal');
  };

  return (
      <Box sx={{ p: 3, height: '90%' }}>
        <StaffHeader
          totalStaff={filteredStaff.length}
          onSearchChange={handleSearchChange}
          onAddStaff={handleAddStaff}
        />
        
        <StaffTable
          staff={filteredStaff}
          columns={staffColumns}
        />
      </Box>
  );
}

export default ManagerStaff;