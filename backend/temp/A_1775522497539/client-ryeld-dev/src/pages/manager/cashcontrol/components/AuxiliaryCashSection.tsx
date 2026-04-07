import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Add, FileDownload } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { cashMovementColumns, AuxiliaryCash } from '../data/cashControlData';

interface AuxiliaryCashSectionProps {
    data: AuxiliaryCash;
    onAddBalance: () => void;
    onExportExcel: () => void;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    backgroundColor: '#FFFFFF',
    border: 'none',
    borderRadius: '20px',
    '& .MuiDataGrid-main': {
        borderRadius: '20px',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#F8F9FF',
        borderBottom: '2px solid #E2E8F0',
        borderRadius: '20px 20px 0 0',
        '& .MuiDataGrid-columnHeader': {
            fontWeight: 600,
            fontSize: '0.8rem',
            color: '#476797',
            '&:focus': {
                outline: 'none',
            },
            '&:focus-within': {
                outline: 'none',
            },
        },
    },
    '& .MuiDataGrid-row': {
        borderBottom: '1px solid #E2E8F0',
        '&:hover': {
            backgroundColor: '#F8F9FF',
        },
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    '& .MuiDataGrid-cell': {
        borderBottom: 'none',
        fontSize: '0.8rem',
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        '&:focus': {
            outline: 'none',
        },
        '&:focus-within': {
            outline: 'none',
        },
    },
    '& .MuiDataGrid-footerContainer': {
        borderTop: '2px solid #E2E8F0',
        backgroundColor: '#F8F9FF',
        borderRadius: '0 0 20px 20px',
    },
    '& .MuiDataGrid-columnSeparator': {
        display: 'none',
    },
}));

const AuxiliaryCashSection: React.FC<AuxiliaryCashSectionProps> = ({
    data,
    onAddBalance,
    onExportExcel
}) => {
    return (
        <Card
            sx={{
                borderRadius: '20px',
                boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
                border: '1px solid #F1F5F9'
            }}
        >
            <CardContent sx={{ p: 2.5 }}>


                {/* Layout horizontal: Información a la izquierda, tabla a la derecha */}
                <Grid container spacing={2}>
                    {/* Información del auxiliar - Izquierda */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography
                                    variant="h6"
                                    fontWeight="600"
                                    color="#1B2559"
                                    fontSize="1.1rem"
                                >
                                    Auxiliar Administrativo
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    onClick={onAddBalance}
                                    size="small"
                                    sx={{
                                        bgcolor: '#476797',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        px: 2,
                                        '&:hover': {
                                            bgcolor: '#3A5578',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 4px 12px rgba(71, 103, 151, 0.3)'
                                        },
                                    }}
                                >
                                    Añadir Saldo
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    bgcolor: '#F8FAFC',
                                    p: 1.5,
                                    borderRadius: '8px',
                                    border: '1px solid #E2E8F0'
                                }}
                            >
                                <Typography variant="body2" color="text.secondary" gutterBottom fontSize="0.75rem">
                                    Nombre del Auxiliar
                                </Typography>
                                <Typography variant="subtitle1" fontWeight="600" color="#1B2559" fontSize="0.9rem">
                                    {data.name}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    bgcolor: '#E6FAF5',
                                    p: 1.5,
                                    borderRadius: '8px',
                                    border: '1px solid #B8E6D1'
                                }}
                            >
                                <Typography variant="body2" color="text.secondary" gutterBottom fontSize="0.75rem">
                                    Saldo Otorgado
                                </Typography>
                                <Typography variant="subtitle1" fontWeight="600" color="#476797" fontSize="0.9rem">
                                    S/ {data.assignedBalance.toFixed(2)}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    bgcolor: '#E3F2FD',
                                    p: 1.5,
                                    borderRadius: '8px',
                                    border: '1px solid #BBDEFB'
                                }}
                            >
                                <Typography variant="body2" color="text.secondary" gutterBottom fontSize="0.75rem">
                                    Saldo Actual
                                </Typography>
                                <Typography variant="subtitle1" fontWeight="600" color="#1976D2" fontSize="0.9rem">
                                    S/ {data.currentBalance.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Tabla de movimientos - Derecha */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box>
                            {/* Header de la tabla */}
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                                <Typography variant="subtitle1" fontWeight="600" color="#1B2559" fontSize="1rem">
                                    Historial de Movimientos
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<FileDownload />}
                                    onClick={onExportExcel}
                                    size="small"
                                    sx={{
                                        borderColor: '#476797',
                                        color: '#476797',
                                        borderRadius: '6px',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        px: 1.5,
                                        fontSize: '0.8rem',
                                        '&:hover': {
                                            borderColor: '#3A5578',
                                            color: '#3A5578',
                                            bgcolor: 'rgba(71, 103, 151, 0.04)'
                                        }
                                    }}
                                >
                                    Exportar
                                </Button>
                            </Box>

                            {/* Tabla de movimientos */}
                            <Box sx={{ height: 300, width: '100%' }}>
                                <StyledDataGrid
                                    rows={data.movements}
                                    columns={cashMovementColumns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection={false}
                                    disableRowSelectionOnClick
                                    autoHeight={false}
                                    density="compact"
                                    getRowId={(row) => row.id}
                                    localeText={{
                                        noRowsLabel: 'No hay movimientos para mostrar',
                                        noResultsOverlayLabel: 'No se encontraron resultados',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default AuxiliaryCashSection;
