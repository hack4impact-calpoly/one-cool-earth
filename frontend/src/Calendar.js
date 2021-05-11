import './css/Calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Container} from "react-bootstrap";



function CalendarPage() {
  return (
    <Container>
    <body>
      <div className = 'header'>
        <div className = 'text'>
          <p id = 'main-text'> Calendar</p>
        </div>
      </div>
      <div className = 'calendar'>
        <FullCalendar
          className = 'fc'
          plugins={[ dayGridPlugin ]}
          initialView = 'dayGridMonth'
          height = 'auto'
          width = 'auto'
        />
      </div>
    </body>
    </Container>
  );
}

export default CalendarPage;