import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useRef } from 'react';
import { CalendarActivity, UpdateActivity } from '../api/SupActivityInterfaces';

interface Props {
  editedActivity: UpdateActivity;
  setEditedActivity: React.Dispatch<React.SetStateAction<UpdateActivity>>;
  activity: CalendarActivity;
  onUploadImage: (id_activity: string, file: File) => void;
}

const scrollbarStyles = {
  '&::-webkit-scrollbar': { width: '8px' },
  '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '4px' },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
    '&:hover': { background: '#555' }
  }
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{
        borderBottom: '2px solid #476797',
        pb: 1,
        mb: 3,
        color: '#476797',
        fontWeight: 'bold'
      }}
    >
      {title}
    </Typography>
    {children}
  </Paper>
);

const MaintenanceDetailsTab = ({
  editedActivity,
  setEditedActivity,
  activity,
  onUploadImage
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditedActivity(prev => ({ ...prev, image_url: result }));
      };
      reader.readAsDataURL(file);
      onUploadImage(activity.id_activity, file);
    }
  };

  const handleListChange = <T extends object>(
    key: keyof UpdateActivity,
    index: number,
    field: keyof T,
    value: any
  ) => {
    const current = editedActivity[key] as T[];
    const updated = [...current];
    updated[index] = { ...updated[index], [field]: value };
    setEditedActivity(prev => ({ ...prev, [key]: updated }));
  };

  const handleSimpleListChange = (key: keyof UpdateActivity, index: number, value: string) => {
    const current = editedActivity[key] as string[];
    const updated = [...current];
    updated[index] = value;
    setEditedActivity(prev => ({ ...prev, [key]: updated }));
  };

  const addItem = <T extends unknown>(key: keyof UpdateActivity, newItem: T) => {
    const current = editedActivity[key] as T[];
    setEditedActivity(prev => ({ ...prev, [key]: [...current, newItem] }));
    };


  const removeItem = (key: keyof UpdateActivity, index: number) => {
    const current = editedActivity[key] as any[];
    setEditedActivity(prev => ({
      ...prev,
      [key]: current.filter((_, i) => i !== index)
    }));
  };

  return (
    <Grid container spacing={3} sx={{ height: 'calc(100vh - 250px)' }}>
        {/* 📷 Imagen */}
        <Grid item xs={12} md={6}>
        <Box sx={{ height: '100%', p: 2, bgcolor: '#fff', borderRadius: '8px', ...scrollbarStyles }}>
            <input
            type="file"
            accept="image/*"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
            />
            <Button
            variant="contained"
            fullWidth
            startIcon={<CloudUploadIcon />}
            onClick={() => inputRef.current?.click()}
            sx={{ mb: 2, backgroundColor: '#476797', '&:hover': { backgroundColor: '#3A5478' } }}
            >
            Subir Constancia de Actividad
            </Button>
            <img
            src={
                editedActivity.image_url && editedActivity.image_url.startsWith('http')
                ? editedActivity.image_url
                : activity.image_url && activity.image_url.startsWith('http')
                    ? activity.image_url
                    : '/imgs/RyeldAscensoresLogo.png'
            }
            alt="Constancia"
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            />
        </Box>
        </Grid>

        {/* 🛠️ Detalles */}
        <Grid item xs={12} md={6}>
        <Box sx={{ height: '100%', overflowY: 'auto', pr: 2, ...scrollbarStyles }}>
            {/* 🏢 Edificio */}
            <Section title="Información del Edificio">
            <TextField fullWidth label="Edificio" value={activity.client_location.building_client ?? ''} disabled sx={{ mb: 2 }} />
            <TextField fullWidth label="Dirección" value={activity.client_location.address ?? ''} disabled sx={{ mb: 2 }} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                <TextField fullWidth type="number" label="N° Puertas de Acceso" value={activity.client_location.access_doors ?? 0} disabled />
                </Grid>
                <Grid item xs={6}>
                <TextField fullWidth type="number" label="N° Puertas de Piso" value={activity.client_location.floor_doors ?? 0} disabled />
                </Grid>
            </Grid>
            </Section>

            {/* 👷 Ejecución */}
            <Section title="Ejecución del Servicio">
            {[
                { label: 'Coordinador', value: activity.coordinador },
                { label: 'Supervisor', value: activity.supervisor },
                { label: 'Cliente', value: activity.client_name },
                { label: 'Cargo del Ejecutor', value: activity.executor_position }
            ].map((field, idx) => (
                <TextField key={idx} fullWidth label={field.label} value={field.value ?? ''} sx={{ mb: 2 }} disabled />
            ))}
            <TextField
                fullWidth
                label="Ejecutor"
                value={editedActivity.technician_executor ?? ''}
                onChange={(e) => setEditedActivity(prev => ({ ...prev, technician_executor: e.target.value }))}
                sx={{ mb: 2 }}
            />
            </Section>

            {/* ✅ Actividades */}
            <Section title="Actividades Realizadas">
            {editedActivity.activities.map((act, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                <Grid item xs={11}>
                    <TextField
                    fullWidth
                    multiline
                    label={`Actividad ${index + 1}`}
                    value={act ?? ''}
                    onChange={(e) => handleSimpleListChange('activities', index, e.target.value)}
                    />
                </Grid>
                <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button color="error" onClick={() => removeItem('activities', index)} sx={{ minWidth: '36px' }}>
                    ✕
                    </Button>
                </Grid>
                </Grid>
            ))}
            <Button variant="outlined" onClick={() => addItem('activities', '')} sx={{ mt: 1 }}>
                + Agregar Actividad
            </Button>
            </Section>

            {/* 🔧 Herramientas */}
            <Section title="Herramientas Utilizadas">
            {editedActivity.tools.map((tool, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                <Grid item xs={8}>
                    <TextField
                    fullWidth
                    label="Herramienta"
                    value={tool.name ?? ''}
                    onChange={(e) => handleListChange('tools', index, 'name', e.target.value)}
                    />
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                    fullWidth
                    label="Cantidad"
                    type="number"
                    value={tool.quantity ?? 0}
                    onChange={(e) => handleListChange('tools', index, 'quantity', parseInt(e.target.value))}
                    />
                    <Button color="error" onClick={() => removeItem('tools', index)} sx={{ ml: 1, minWidth: '36px' }}>
                    ✕
                    </Button>
                </Grid>
                </Grid>
            ))}
            <Button variant="outlined" onClick={() => addItem('tools', { name: '', quantity: 1 })} sx={{ mt: 1 }}>
                + Agregar Herramienta
            </Button>
            </Section>

            {/* 🧩 Repuestos */}
            <Section title="Repuestos Utilizados">
            {editedActivity.required_parts.map((part, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                <Grid item xs={8}>
                    <TextField
                    fullWidth
                    label="Descripción"
                    value={part.description ?? ''}
                    onChange={(e) => handleListChange('required_parts', index, 'description', e.target.value)}
                    />
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                    fullWidth
                    label="Cantidad"
                    type="number"
                    value={part.quantity ?? 0}
                    onChange={(e) => handleListChange('required_parts', index, 'quantity', parseInt(e.target.value))}
                    />
                    <Button color="error" onClick={() => removeItem('required_parts', index)} sx={{ ml: 1, minWidth: '36px' }}>
                    ✕
                    </Button>
                </Grid>
                </Grid>
            ))}
            <Button variant="outlined" onClick={() => addItem('required_parts', { description: '', quantity: 1 })} sx={{ mt: 1 }}>
                + Agregar Repuesto
            </Button>
            </Section>

            {/* 🧪 Insumos */}
            <Section title="Insumos Utilizados">
            {editedActivity.supplies.map((supply, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                <Grid item xs={8}>
                    <TextField
                    fullWidth
                    label="Descripción"
                    value={supply.description ?? ''}
                    onChange={(e) => handleListChange('supplies', index, 'description', e.target.value)}
                    />
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                    fullWidth
                    label="Cantidad"
                    type="number"
                    value={supply.quantity ?? 0}
                    onChange={(e) => handleListChange('supplies', index, 'quantity', parseInt(e.target.value))}
                    />
                    <Button color="error" onClick={() => removeItem('supplies', index)} sx={{ ml: 1, minWidth: '36px' }}>
                    ✕
                    </Button>
                </Grid>
                </Grid>
            ))}
            <Button variant="outlined" onClick={() => addItem('supplies', { description: '', quantity: 1 })} sx={{ mt: 1 }}>
                + Agregar Insumo
            </Button>
            </Section>
        </Box>
        </Grid>
    </Grid>
    );
};

export default MaintenanceDetailsTab;