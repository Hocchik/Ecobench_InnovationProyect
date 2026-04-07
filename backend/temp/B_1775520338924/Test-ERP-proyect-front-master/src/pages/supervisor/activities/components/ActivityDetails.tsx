import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import { CalendarActivity, UpdateActivity } from '../api/SupActivityInterfaces';
import GeneralInfoTab from './GeneralInfoTab';
import MaintenanceDetailsTab from './MaintenanceDetailsTab';

interface ActivityDetailsProps {
  activity: CalendarActivity;
  onClose: () => void;
  onEdit: (updatedActivity: UpdateActivity) => void;
  onUploadImage: (id_activity: string, file: File) => void;
}

const ActivityDetails = ({ activity, onClose, onEdit, onUploadImage }: ActivityDetailsProps) => {
  const [editedActivity, setEditedActivity] = useState<UpdateActivity>({
      id_activity: activity.id_activity,
      title: activity.title,
      date: activity.date,
      start_time: activity.start_time ?? '',
      end_time: activity.end_time ?? '',
      status: activity.status,
      technician_executor: activity.technician_executor,
      activities: activity.activities,
      tools: activity.tools,
      supplies: activity.supplies,
      required_parts: activity.required_parts,
      comments: activity.comments,
      image_url: activity.image_url
    });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setEditedActivity({
      id_activity: activity.id_activity,
      title: activity.title,
      date: activity.date,
      start_time: activity.start_time ?? '',
      end_time: activity.end_time ?? '',
      status: activity.status,
      technician_executor: activity.technician_executor,
      activities: activity.activities,
      tools: activity.tools,
      supplies: activity.supplies,
      required_parts: activity.required_parts,
      comments: activity.comments,
      image_url: activity.image_url
    });
  }, [activity]);

  const handleSave = () => {
    onEdit(editedActivity);
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Detalles de la Actividad {activity.order_number}</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
            <Tab label="Información General" />
            <Tab label="Detalles de Mantenimiento" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <GeneralInfoTab editedActivity={editedActivity} setEditedActivity={setEditedActivity} activity={activity} />
        )}

        {activeTab === 1 && (
          <MaintenanceDetailsTab
            editedActivity={editedActivity}
            setEditedActivity={setEditedActivity}
            activity={activity}
            onUploadImage={onUploadImage}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityDetails;