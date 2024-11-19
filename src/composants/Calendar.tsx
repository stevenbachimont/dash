
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

interface CalendarProps {
    events: Array<{ title: string; start: string; end?: string }>;
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
    return <FullCalendar plugins={[dayGridPlugin]} events={events} />;
};

export default Calendar;
