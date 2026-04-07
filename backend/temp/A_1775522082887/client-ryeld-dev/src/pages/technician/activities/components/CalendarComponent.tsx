import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { EventInput, EventClickArg } from '@fullcalendar/core';

import BuildIcon from '@mui/icons-material/Build'; // Preventivo
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Urgencia

interface CalendarComponentProps {
  events: EventInput[];
  onEventClick: (clickInfo: EventClickArg) => void;
  initialView?: string;
  height?: number | string;
}

function renderEventContent(eventInfo: any) {
  const type = eventInfo.event.title;
  const color = eventInfo.event.backgroundColor || (type === 'Preventivo' ? '#6FCF97' : '#F2994A');
  const icon =
    type === 'Preventivo'
      ? <BuildIcon sx={{ fontSize: 16, color: '#fff', verticalAlign: 'middle', mr: 0.5 }} />
      : <WarningAmberIcon sx={{ fontSize: 16, color: '#fff', verticalAlign: 'middle', mr: 0.5 }} />;
  const hour = eventInfo.event.extendedProps.hour || ''; // <-- Aquí tomas la hora

  // Muestra icono y día del mes
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        background: color,
        borderRadius: 6,
        padding: '2px 8px',
        color: '#fff',
        fontWeight: 600,
        fontSize: '0.95em',
        boxShadow: '0 2px 6px #0001'
      }}
    >
      {icon}
      <span style={{ marginLeft: 4 }}>{hour}</span>
    </span>
  );
}

const CalendarComponent = ({
  events,
  onEventClick,
  initialView = 'dayGridMonth',
  height = '100%'
}: CalendarComponentProps) => (
  <FullCalendar
    plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
    initialView={initialView}
    locale={esLocale}
    events={events}
    eventClick={onEventClick}
    headerToolbar={{
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    }}
    buttonText={{
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      list: 'Agenda'
    }}
    height={height}
    contentHeight="auto"
    eventContent={renderEventContent}
  />
);

export default CalendarComponent;