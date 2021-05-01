import './css/calendar.css';
import 'bootstrap/dist/css/bootstrap.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';



function CalendarPage() {
  return (
    <body>
      <div className = 'header'>
        <div className= 'buttons'>
          <button id = 'home-button'>Home</button>
          <button id = 'logout-button'>Log out</button>
        </div>
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
  );
}

export default CalendarPage;
