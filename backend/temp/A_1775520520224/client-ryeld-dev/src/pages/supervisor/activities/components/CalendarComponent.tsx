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
      dayMaxEvents={true} // ✅ permite mostrar "+ más" si hay muchas actividades
    />
  );
};

export default CalendarComponent;