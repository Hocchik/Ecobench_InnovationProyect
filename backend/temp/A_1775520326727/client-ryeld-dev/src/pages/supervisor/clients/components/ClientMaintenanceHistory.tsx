import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TableViewIcon from '@mui/icons-material/TableView';
import { styled } from '@mui/material';
import * as XLSX from 'xlsx';
import { ClientMaintenanceHistory } from '../api/SupClientInterfaces';

interface ClientMaintenanceHistoryProps {
  elevatorId: string;
  maintenanceData: ClientMaintenanceHistory[];
}

// Estilo personalizado para el DataGrid
const StyledDataGrid = styled(DataGrid)(() => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'white',
    borderBottom: '2px solid #E2E8F0',
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
      color: '#476797',
    },
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid #E2E8F0',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#F8F9FF',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '2px solid #E2E8F0',
  },
  '& .MuiDataGrid-virtualScroller': {
    backgroundColor: 'white',
  },
}));

const ClientMaintenanceHistoryTable = ({
  elevatorId,
  maintenanceData,
}: ClientMaintenanceHistoryProps) => {
  const filteredMaintenance = maintenanceData.filter(
    (m) => m.id_elevator === elevatorId
  );

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Fecha', width: 120 },
    { field: 'start_time', headerName: 'Hora Inicio', width: 100 },
    { field: 'end_time', headerName: 'Hora Fin', width: 100 },
    { field: 'technician_assigned', headerName: 'Técnico 1', width: 150 },
    { field: 'technician_executor', headerName: 'Técnico 2', width: 150 },
    { field: 'name_supervisor', headerName: 'Supervisor', width: 150 },
    { field: 'maintenance_type', headerName: 'Tipo', width: 120 },
    { field: 'activities', headerName: 'Actividades', width: 150 },
  ];

  const rows = filteredMaintenance.map((m, idx) => {
    const startTime = typeof m.start_time === 'string' ? m.start_time : 'Sin inicio';
    const endTime = typeof m.end_time === 'string' ? m.end_time : 'Sin fin';

    const maintenanceType = m.maintenance_type?.toLowerCase() === 'preventivo'
      ? 'Preventive'
      : m.maintenance_type?.toLowerCase() === 'correctivo'
      ? 'Corrective'
      : 'Corrective';

    return {
      id: `${m.id_elevator}-${m.date}-${startTime}-${idx}`, // ✅ clave única
      date: m.date || 'Sin fecha',
      start_time: startTime,
      end_time: endTime,
      technician_assigned: m.technician_assigned || 'Sin técnico 1',
      technician_executor: m.technician_executor || 'Sin técnico 2',
      name_supervisor: m.name_supervisor || 'Sin supervisor',
      maintenance_type: maintenanceType,
      activities: Array.isArray(m.activities)
        ? m.activities.join(', ')
        : m.activities || 'Sin actividades',
    };
  });

  const handleExportToExcel = () => {
    const wsData = [
      columns.map((col) => col.headerName),
      ...rows.map((row) =>
        columns.map((col) => row[col.field as keyof typeof row] ?? '')
      ),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const headerRange = XLSX.utils.decode_range(ws['!ref']!);
    for (let c = headerRange.s.c; c <= headerRange.e.c; c++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c });
      if (ws[cellRef]) {
        ws[cellRef].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: 'E0E0E0' } },
          alignment: { horizontal: 'center' },
        };
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Mantenimientos');
    XLSX.writeFile(wb, 'historial_mantenimientos.xlsx');
  };

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<TableViewIcon />}
          onClick={handleExportToExcel}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: 16,
            px: 3,
            py: 1,
            boxShadow: 2,
            bgcolor: '#2e7d32',
            '&:hover': { bgcolor: '#27642a' },
          }}
        >
          Exportar a Excel
        </Button>
      </Box>

      <StyledDataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10]}
        sx={{
          border: 'none',
          '& .MuiDataGrid-main': {
            '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          },
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#F4F7FE',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#A3AED0',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#476797',
          },
        }}
      />
    </Box>
  );
};

export default ClientMaintenanceHistoryTable;