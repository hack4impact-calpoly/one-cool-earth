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
    startTime: (new Date("Fri Jun 10 2021 09:30:16 GMT-0700")),
    endTime: (new Date("Fri Jun 10 2021 10:30:16 GMT-0700")),
    location: "Arroyo Grande",
    description: "This is the decription for Event 2. This has a lot of lines to check the wrap around of the modal."
  },
  {
    id: 3,
    name: "Event 3",
    startTime: (new Date("Mon Jun 23 2021 13:30:16 GMT-0700")),
    endTime: (new Date("Mon Jun 23 2021 14:30:16 GMT-0700")),
    location: "San Luis Obispo",
    description: "This is the decription for Event 3"
  },
  {
    id: 4,
    name: "Event 4",
    startTime: (new Date("Mon Jun 23 2021 13:30:16 GMT-0700")),
    endTime: (new Date("Mon Jun 23 2021 14:30:16 GMT-0700")),
    location: "San Luis Obispo",
    description: "This is the decription for Event 4"
  }
]

class CalendarPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showModal: false,
      events: [],
      dateClickedStr: "",
      dateClickedEvents: [],
      eventClicked: null
    }
  }

  componentDidMount = () => {
    //this.setState({ events: sampleEvents});
    const eventsURL = `${process.env.REACT_APP_SERVER_URL}/api/event/get-all`;
    fetch(eventsURL, {credentials: 'include'})
	  .then((res) => res.json())
	  .then((events) => this.setState({events: events}))
	  .catch((err) => console.error(err));
  }

  getEvents = (date) => {
    let events = []
    const allEvents = this.state.events.slice();
    const dateObj = new Date(date);
    for (let event of allEvents) {
      let eventDate = new Date(event.startTime);
      if(eventDate.getDate() === dateObj.getDate() &&
          eventDate.getMonth() === dateObj.getMonth() &&
          eventDate.getFullYear() === dateObj.getFullYear())
        events.push(event)
    }
    return events;
  }

  showDateModal = () => {
    this.setState({showModal: true});
  }

  hideDateModal = () => {
    this.setState({
      showModal: false,
      dateClickedStr: "",
      dateClickedEvents: [],
      eventClicked: ""
    });
  }

  handleDateClick = (arg) => {
    const events = this.getEvents(arg.date);
    this.setState({
      dateClickedStr: `${arg.date.getMonth()+1}/${arg.date.getDate()}/${arg.date.getFullYear()}`,
      dateClickedEvents: events
    });
    this.showDateModal();
  }

  handleEventClick = (arg) => {
    let eventClicked = null, events = []
    const stateEvents = this.state.events.slice();
    for (let event of stateEvents) {
      if(event.name === arg.event.title) {
        eventClicked = event
        break
      }
    }
    events = this.getEvents(eventClicked.startTime)
    const eventDate = new Date(eventClicked.startTime);
    this.setState({
      dateClickedStr: `${eventDate.getMonth()+1}/${eventDate.getDate()}/${eventDate.getFullYear()}`,
      dateClickedEvents: events,
      eventClicked: arg.event.title
    })
    this.showDateModal()

  }

  render () {
    return (
      <div id='calendar-page'>
        <div id="calendar-container">
          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            headerToolbar={{
              start: 'title',
              center: '',
              end: 'today'
            }}
            footerToolbar={{
              start: '',
              center: '',
              end: 'dayGridWeek dayGridMonth prev,next'
            }}
            events={
              this.state.events.map( (event) => {
		return ({
                  title: event.name,
                  start: new Date(event.startTime),
                  end: new Date(event.endTime)
                })
              })
            }
            eventClick={this.handleEventClick}
            initialView = 'dayGridMonth'
            fixedWeekCount={false}
            dateClick= {this.handleDateClick}
            height='100%'
          />
        </div>
        <DateModal
            show={this.state.showModal}
            onHide={this.hideDateModal}
            dateStr={this.state.dateClickedStr}
            events={this.state.dateClickedEvents}
            eventToggled={this.state.eventClicked}
        />
      </div>
    );
  }
}

export default CalendarPage;
