import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Chip,
    InputAdornment
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';

interface StaffHeaderProps {
    totalStaff: number;
    onSearchChange: (searchTerm: string) => void;
    onAddStaff: () => void;
}

export function StaffHeader({
    totalStaff,
    onSearchChange,
    onAddStaff
}: StaffHeaderProps) {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
            mb={2}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    Gestión de Personal
                </Typography>
                <Chip
                    label={`Total: ${totalStaff}`}
                    sx={{
                        bgcolor: '#E6FAF5',
                        color: '#05CD99',
                        fontWeight: 600,
                        fontSize: '0.875rem'
                    }}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    placeholder="Buscar por personal"
                    onChange={handleSearchChange}
                    size="small"
                    sx={{
                        width: { xs: '100%', sm: '300px' },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: '#F8F9FF'
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '0.875rem'
                        }
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" sx={{ color: '#476797' }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAddStaff}
                    sx={{
                        bgcolor: '#476797',
                        color: 'white',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3,
                        '&:hover': {
                            bgcolor: '#3A5578',
                        },
                        whiteSpace: 'nowrap'
                    }}
                >
                    Agregar Personal
                </Button>
            </Box>
        </Box >
    );
};


