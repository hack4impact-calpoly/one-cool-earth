import './css/calendar.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';



class CalendarPage extends React.Component{
  render() {
    return (
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
	    headerToolbar = {{left: '',
	        center: 'title', 
	        right: 'today prev,next'
	    }}
	    height = 'auto'
	    width = 'auto'
          />
        </div>
      </body>
    );
  }
}

export default CalendarPage;
