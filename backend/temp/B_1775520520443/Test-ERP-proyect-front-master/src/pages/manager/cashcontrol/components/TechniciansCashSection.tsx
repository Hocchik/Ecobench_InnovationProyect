import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Add, FileDownload } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { techniciansCashData, cashMovementColumns, TechnicianCash } from '../data/cashControlData';

interface TechniciansCashSectionProps {
    onAddBalance: (technicianId: number) => void;
    onExportExcel: (technicianId: number) => void;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    backgroundColor: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    '& .MuiDataGrid-main': {
        borderRadius: '10px',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#F8FAFC',
        borderBottom: '1px solid #E2E8F0',
        borderRadius: '10px 10px 0 0',
        '& .MuiDataGrid-columnHeader': {
            fontWeight: 600,
            fontSize: '0.8rem',
            color: '#475569',
            '&:focus': {
                outline: 'none',
            },
            '&:focus-within': {
                outline: 'none',
            },
        },
    },
    '& .MuiDataGrid-row': {
        borderBottom: '1px solid #F1F5F9',
        '&:hover': {
            backgroundColor: '#F8FAFC',
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
        borderTop: '1px solid #E2E8F0',
        backgroundColor: '#F8FAFC',
        borderRadius: '0 0 10px 10px',
    },
    '& .MuiDataGrid-columnSeparator': {
        display: 'none',
    },
}));

const TechniciansCashSection: React.FC<TechniciansCashSectionProps> = ({
    onAddBalance,
    onExportExcel
}) => {
    const [selectedTechnicianId, setSelectedTechnicianId] = useState<number | ''>('');
    const [selectedTechnician, setSelectedTechnician] = useState<TechnicianCash | null>(null);

    const handleTechnicianChange = (event: SelectChangeEvent<number | ''>) => {
        const technicianId = event.target.value as number;
        setSelectedTechnicianId(technicianId);

        if (technicianId) {
            const technician = techniciansCashData.find(t => t.id === technicianId);
            setSelectedTechnician(technician || null);
        } else {
            setSelectedTechnician(null);
        }
    };    return (
        <Card
            sx={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #F1F5F9'
            }}
        >
            <CardContent sx={{ p: 2.5 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography
                        variant="h6"
                        fontWeight="600"
                        color="#333"
                        fontSize="1.1rem"
                    >
                        Técnicos - Caja Chica
                    </Typography>
                    {selectedTechnician && (
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => onAddBalance(selectedTechnician.id)}
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
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Añadir Saldo
                        </Button>
                    )}
                </Box>

                {/* Selector de técnico */}
                <Box mb={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="technician-select-label">Seleccionar Técnico</InputLabel>
                        <Select
                            labelId="technician-select-label"
                            value={selectedTechnicianId}
                            label="Seleccionar Técnico"
                            onChange={handleTechnicianChange}
                            sx={{
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#476797',
                                    }
                                }
                            }}
                        >
                            <MenuItem value="">
                                <em>Seleccione un técnico</em>
                            </MenuItem>
                            {techniciansCashData.map((technician) => (
                                <MenuItem key={technician.id} value={technician.id}>
                                    {technician.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Información del técnico seleccionado */}
                {selectedTechnician && (
                    <Grid container spacing={2}>
                        {/* Información del técnico - Izquierda */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Box
                                    sx={{
                                        bgcolor: '#F8FAFC',
                                        p: 1.5,
                                        borderRadius: '8px',
                                        border: '1px solid #E2E8F0'
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary" gutterBottom fontSize="0.75rem">
                                        Nombre del Técnico
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight="600" color="#333" fontSize="0.9rem">
                                        {selectedTechnician.name}
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
                                    <Typography variant="subtitle1" fontWeight="600" color="#05CD99" fontSize="0.9rem">
                                        S/ {selectedTechnician.assignedBalance.toFixed(2)}
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
                                        S/ {selectedTechnician.currentBalance.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Tabla de movimientos - Derecha */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box>
                                {/* Header de la tabla */}
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                                    <Typography variant="subtitle1" fontWeight="600" color="#333" fontSize="1rem">
                                        Historial de Movimientos
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        startIcon={<FileDownload />}
                                        onClick={() => onExportExcel(selectedTechnician.id)}
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
                                        rows={selectedTechnician.movements}
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
                )}

                {/* Mensaje cuando no hay técnico seleccionado */}
                {!selectedTechnician && (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 3,
                            bgcolor: '#F8FAFC',
                            borderRadius: '8px',
                            border: '1px dashed #CBD5E1'
                        }}
                    >
                        <Typography variant="body1" color="text.secondary" fontSize="0.9rem">
                            Seleccione un técnico para ver la información de su caja chica
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default TechniciansCashSection;
