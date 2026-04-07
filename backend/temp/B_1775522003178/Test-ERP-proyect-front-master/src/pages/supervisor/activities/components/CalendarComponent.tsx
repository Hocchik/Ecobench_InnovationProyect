import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import {
  EventInput,
  EventClickArg,
  EventChangeArg,
} from '@fullcalendar/core';

import { Box, GlobalStyles } from '@mui/material';

interface CalendarComponentProps {
  events: EventInput[];
  onDateClick: (clickInfo: DateClickArg) => void;
  onEventClick: (clickInfo: EventClickArg) => void;
  onEventDrop: (changeInfo: EventChangeArg) => void;
  initialDate?: Date;
  height?: string | number;
}

const CalendarComponent = ({
  events,
  onDateClick,
  onEventClick,
  onEventDrop,
  initialDate,
  height = '100%',
}: CalendarComponentProps) => {
  return (
    <>
      {/* ✅ Estilos globales para limpiar el calendario */}
      <GlobalStyles
        styles={{
          '.fc-daygrid-day.fc-day-today': {
            backgroundColor: '#FFFFFF',
          },
          '.fc-daygrid-day:hover': {
            backgroundColor: '#F9FAFB',
          },
          '.fc-event': {
            border: 'none',
            boxShadow: 'none',
          },
          '.fc-event-selected': {
            boxShadow: 'none',
          },
          '.fc-toolbar-title': {
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#1B2559',
          },
        }}
      />

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        initialDate={initialDate}
        locale={esLocale}
        events={events}
        editable
        selectable
        selectMirror
        weekends
        timeZone="local"
        dateClick={onDateClick}
        eventClick={onEventClick}
        eventDrop={onEventDrop}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listWeek',
        }}
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          list: 'Agenda',
        }}
        height={height}
        contentHeight="auto"
        handleWindowResize
        stickyHeaderDates
        slotMinTime="08:00:00"
        slotMaxTime="19:00:00"
        allDaySlot={false}
        expandRows
        dayMaxEvents={true}
        eventContent={(arg) => {
          const { title } = arg.event;
          const maintenanceType = arg.event.extendedProps?.maintenanceType;

          return (
            <Box
              sx={{
                px: 1,
                py: 0.5,
                bgcolor: '#FFFFFF', // ✅ fondo blanco
                borderRadius: '6px',
                color: '#1B2559',
                fontSize: '0.85rem',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                borderLeft: `4px solid ${
                  maintenanceType === 'Preventivo' ? '#4CAF50' : '#FF9800'
                }`,
              }}
            >
              {title}
            </Box>
          );
        }}
      />
    </>
  );
};

export default CalendarComponent;