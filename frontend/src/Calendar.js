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
    startTime: (new Date()).getTime(),
    endTime: (new Date()).getTime(),
    location: "Paso Robles",
    description: "This is the decription for Event 1"
  },
  {
    id: 2,
    name: "Event 2",
    startTime: (new Date()).getTime(),
    endTime: (new Date()).getTime(),
    location: "Arroyo Grande",
    description: "This is the decription for Event 2. This has a lot of lines to check the wrap around of the modal."
  },
  {
    id: 3,
    name: "Event 3",
    startTime: (new Date()).getTime(),
    endTime: (new Date()).getTime(),
    location: "San Luis Obispo",
    description: "This is the decription for Event 3"
  }
]

class CalendarPage extends React.Component{
  constructor(){
    super();
    this.state={
      dateModalVisible: false,
      dateStr: "",
      events: []
    }
  }

  showDateModal = () => {
    this.setState({dateModalVisible: true});
  }

  hideDateModal = () => {
    this.setState({dateModalVisible: false});
  }

  handleDateClick = (arg) =>{
    this.setState({
      dateStr: `${arg.date.getMonth()+1}/${arg.date.getDate()}/${arg.date.getFullYear()}`,
      events: sampleEvents
      });
    console.log(this.state.dateStr);
    console.log(this.state.events);
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
	    dateStr={this.state.dateStr}
	    events={this.state.events}
	></DateModal>
      </Container>
    );
  }
} 

export default CalendarPage;
