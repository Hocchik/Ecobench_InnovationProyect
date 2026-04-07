import { Paper, IconButton, Box } from "@mui/material";
import { DataGrid, GridRenderCellParams, GridColDef } from "@mui/x-data-grid";
import { Visibility } from "@mui/icons-material";
import { MainCorrective, MainPreventive } from "../api/SupMaintenanceInterfaces";

interface MaintenanceTableProps {
  tabValue: number;
  maintenances: (MainPreventive | MainCorrective)[];
  onView: (maintenance: MainPreventive | MainCorrective) => void;
}

const preventiveColumns = (onView: MaintenanceTableProps["onView"]): GridColDef[] => [
  { field: "month", headerName: "Mes", flex: 1 },
  { field: "building_client", headerName: "Edificio", flex: 1 },
  { field: "period", headerName: "Periodo", flex: 1 },
  { field: "ascensor_type", headerName: "Tipo de Ascensor", flex: 1 },
  { field: "scheduled_date", headerName: "Fecha Programada", flex: 1 },
  { field: "scheduled_real_date", headerName: "Fecha Real", flex: 1 },
  { field: "scheduled_time", headerName: "Hora Programada", flex: 1 },
  {
    field: "notice",
    headerName: "Aviso",
    width: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams<MainPreventive>) => {
      const value = params.row.notice;
      const text = value ? "SI" : "NO";
      const color = value ? "#476797" : "#FF4842";
      const bgColor = value ? "#E6FAF5" : "#FFE4E4";

      return (
        <Box
          sx={{
            backgroundColor: bgColor,
            color: color,
            padding: "4px 8px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 500,
            minWidth: "40px",
            textAlign: "center"
          }}
        >
          {text}
        </Box>
      );
    }
  },

  {
    field: "actions",
    headerName: "Acciones",
    width: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams) => (
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onView(params.row as MainPreventive);
        }}
        size="small"
        sx={{
          color: "#476797",
          "&:hover": {
            bgcolor: "rgba(71, 103, 151, 0.08)",
            transform: "scale(1.1)"
          },
          transition: "all 0.2s"
        }}
      >
        <Visibility fontSize="small" />
      </IconButton>
    )
  }
];

const correctiveColumns = (onView: MaintenanceTableProps["onView"]): GridColDef[] => [
  { field: "month", headerName: "Mes", flex: 1 },
  { field: "building_client", headerName: "Edificio", flex: 1 },
  { field: "type_maintenance", headerName: "Tipo", flex: 1 },
  { field: "ascensor_type", headerName: "Tipo de Ascensor", flex: 1 },
  { field: "scheduled_date", headerName: "Fecha Programada", flex: 1 },
  { field: "scheduled_real_date", headerName: "Fecha Real", flex: 1 },
  { field: "scheduled_time", headerName: "Hora Programada", width: 150 },
  {
    field: "actions",
    headerName: "Acciones",
    width: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams) => (
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onView(params.row as MainCorrective);
        }}
        size="small"
        sx={{
          color: "#476797",
          "&:hover": {
            bgcolor: "rgba(71, 103, 151, 0.08)",
            transform: "scale(1.1)"
          },
          transition: "all 0.2s"
        }}
      >
        <Visibility fontSize="small" />
      </IconButton>
    )
  }
];

export const MaintenanceTable = ({ tabValue, maintenances, onView }: MaintenanceTableProps) => {
  const rowsWithId = maintenances.map((maintenance) => ({
    ...maintenance,
    id: maintenance.id_maintenance
  }));

  return (
    <Paper
      sx={{
        height: "calc(90vh - 250px)",
        width: "100%",
        borderRadius: "20px",
        boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
      }}
    >
      <DataGrid
        rows={rowsWithId}
        columns={tabValue === 0 ? preventiveColumns(onView) : correctiveColumns(onView)}
        paginationModel={{ pageSize: 10, page: 0 }}
        pageSizeOptions={[5, 10, 25, 50]}
        isRowSelectable={() => false}
        sx={{
          border: "none",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #E2E8F0"
          },
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "white",
            borderBottom: "2px solid #E2E8F0",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              color: "#476797"
            }
          },
          "& .MuiDataGrid-row:hover": {
            bgcolor: "#F8F9FF"
          }
        }}
      />
    </Paper>
  );
};