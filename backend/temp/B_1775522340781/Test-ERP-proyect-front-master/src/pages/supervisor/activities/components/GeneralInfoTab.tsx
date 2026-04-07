// ./ActivityDetails/GeneralInfoTab.tsx
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { CalendarActivity, UpdateActivity } from '../api/SupActivityInterfaces';
import { useDataApi } from '../../../../contexts/DataContext';

interface Props {
  editedActivity: UpdateActivity;
  setEditedActivity: React.Dispatch<React.SetStateAction<UpdateActivity>>;
  activity: CalendarActivity;
}

const GeneralInfoTab = ({ editedActivity, setEditedActivity, activity }: Props) => {
  const { techs } = useDataApi();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Título de la Actividad"
          value={editedActivity.title}
          onChange={(e) =>
            setEditedActivity((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </Grid>

      {[
        { label: 'Sección', value: activity.section },
        { label: 'Cliente', value: activity.client_name },
        { label: 'Tipo de Mantenimiento', value: activity.maintenance_type },
        { label: 'Supervisor', value: activity.supervisor },
        { label: 'Técnico Asignado', value: activity.technician_assigned }
      ].map((field, idx) => (
        <Grid item xs={12} sm={6} key={idx}>
          <TextField fullWidth label={field.label} value={field.value} disabled />
        </Grid>
      ))}

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="technician-executor-label">Técnico Ejecutor</InputLabel>
          <Select
            labelId="technician-executor-label"
            value={editedActivity.technician_executor || ''}
            label="Técnico Ejecutor"
            onChange={(e) =>
              setEditedActivity((prev) => ({
                ...prev,
                technician_executor: e.target.value
              }))
            }
          >
            {techs.map((tech) => (
              <MenuItem key={tech.id_technician} value={tech.id_technician}>
                {tech.name_technician}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Fecha"
          type="date"
          value={editedActivity.date?.split('T')[0] || ''}
          onChange={(e) => {
            const timeSuffix = editedActivity.date?.includes('T')
              ? editedActivity.date.substring(10)
              : '';
            setEditedActivity((prev) => ({
              ...prev,
              date: e.target.value + timeSuffix
            }));
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          label="Hora de Inicio"
          type="time"
          value={editedActivity.start_time}
          onChange={(e) =>
            setEditedActivity((prev) => ({ ...prev, start_time: e.target.value }))
          }
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          label="Hora de Fin"
          type="time"
          value={editedActivity.end_time}
          onChange={(e) =>
            setEditedActivity((prev) => ({ ...prev, end_time: e.target.value }))
          }
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Comentarios"
          value={editedActivity.comments}
          onChange={(e) =>
            setEditedActivity((prev) => ({ ...prev, comments: e.target.value }))
          }
        />
      </Grid>
    </Grid>
  );
};

export default GeneralInfoTab;