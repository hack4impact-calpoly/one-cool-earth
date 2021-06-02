import './css/Calendar.css';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Container, Modal, Button} from "react-bootstrap";
import interactionPlugin from "@fullcalendar/interaction";
import DateModal from "./DateModal.js"

class CalendarPage extends React.Component{
  constructor(){
    super();
    this.state={
      dateModalVisible: false,
      dateData: {
                  dateStr: "",
	          events: {}
                }
    }
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
	    dateData={this.state.dateData}
	></DateModal>
      </Container>
    );
  }
  
  showDateModal = () => {
    this.setState({dateModalVisible: true});
  }

  hideDateModal = () => {
    this.setState({dateModalVisible: false});
  }
  
  handleDateClick = (arg) =>{
    this.setState({dateData: {dateStr: `${arg.date.getMonth()+1}/${arg.date.getDate()}/${arg.date.getFullYear()}`}});
    this.showDateModal();
  }
} 

export default CalendarPage;
