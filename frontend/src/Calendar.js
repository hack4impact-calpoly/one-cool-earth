import './css/Calendar.css';
import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Container, Modal, Button} from "react-bootstrap";
import './css/Calendar.css';
import interactionPlugin from "@fullcalendar/interaction";

class CalendarPage extends React.Component{
  constructor(){
    super();
    this.state={
      modalVisible: false,
      dateClicked: ""
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
	    dateClick= {function(arg){console.log(arg.dateStr)}}
            height = 'auto'
            width = 'auto'
          />
        </div>
	<Modal show={this.state.modalVisible} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>Events on {this.state.dateClicked}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
	    This is the modal body
	  </Modal.Body>
          <Modal.Footer>
	    <Button onClick={this.hideModal}>Close</Button>
	  </Modal.Footer>
        </Modal>
      </Container>
    );
  }
  
  showModal = () => {
    this.setState({modalVisible: true});
  }

  hideModal = () => {
    this.setState({modalVisible: false});
  }
  
  handleDateClick = (arg) =>{
    this.setState({dateClicked: `${arg.date.getMonth()}/${arg.date.getDate()}/${arg.date.getFullYear()}`});
    console.log(arg.dateStr);
    this.showModal();
  }
} 

export default CalendarPage;
