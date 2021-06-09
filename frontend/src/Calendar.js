import './css/Calendar.css';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Container, Modal, Button} from "react-bootstrap";
import interactionPlugin from "@fullcalendar/interaction";
import DateModal from "./DateModal.js";

const sampleEvents = [
  {
    id: 1,
    name: "Event 1",
    startTime: (new Date("Wed Jun 02 2021 03:30:16 GMT-0700")),
    endTime: (new Date("Wed Jun 02 2021 05:30:16 GMT-0700")),
    location: "Paso Robles",
    description: "This is the decription for Event 1"
  },
  {
    id: 2,
    name: "Event 2",
    startTime: (new Date("Fri Jun 04 2021 09:30:16 GMT-0700")),
    endTime: (new Date("Fri Jun 04 2021 10:30:16 GMT-0700")),
    location: "Arroyo Grande",
    description: "This is the decription for Event 2. This has a lot of lines to check the wrap around of the modal."
  },
  {
    id: 3,
    name: "Event 3",
    startTime: (new Date("Mon Jun 07 2021 13:30:16 GMT-0700")),
    endTime: (new Date("Mon Jun 07 2021 14:30:16 GMT-0700")),
    location: "San Luis Obispo",
    description: "This is the decription for Event 3"
  }
]

class CalendarPage extends React.Component{
  constructor(){
    super();
    this.state={
      dateModalVisible: false,
      events: sampleEvents,
      dateClickedStr: "",
      dateClickedEvents: []
    }
  }

  componentDidMount() {
    //$('#calendar').fullCalendar('addEventSource', this.state.events);
  }

  showDateModal = () => {
    this.setState({dateModalVisible: true});
  }

  hideDateModal = () => {
    this.setState({dateModalVisible: false});
  }

  handleDateClick = (arg) =>{
    this.setState({
      dateClickedStr: `${arg.date.getMonth()+1}/${arg.date.getDate()}/${arg.date.getFullYear()}`,
      dateClickedEvents: sampleEvents
      });
    this.showDateModal();
  }

  render (){
    return (
      <Container>
        <div className = 'header'>
          <div className = 'text'>
            <p id = 'main-text'> Calendar</p>
          </div>
        </div>
        <div className = 'calendar'>
          <FullCalendar
            className = 'fc'
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView = 'dayGridMonth'
	    dateClick= {this.handleDateClick}
            height = 'auto'
            width = 'auto'
          />
        </div>
	<DateModal 
	    show={this.state.dateModalVisible}
	    onHide={this.hideDateModal}
	    dateStr={this.state.dateClickedStr}
	    events={this.state.dateClickedEvents}
	></DateModal>
      </Container>
    );
  }
} 

export default CalendarPage;
