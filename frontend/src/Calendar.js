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
    date: new Date("Wed Jun 02 2021"),
    startTime: (new Date("Wed Jun 02 2021 03:30:16 GMT-0700")),
    endTime: (new Date("Wed Jun 02 2021 05:30:16 GMT-0700")),
    location: "Paso Robles",
    description: "This is the decription for Event 1"
  },
  {
    id: 2,
    name: "Event 2",
    date: new Date("Wed Jun 10 2021"),
    startTime: (new Date("Fri Jun 10 2021 09:30:16 GMT-0700")),
    endTime: (new Date("Fri Jun 10 2021 10:30:16 GMT-0700")),
    location: "Arroyo Grande",
    description: "This is the decription for Event 2. This has a lot of lines to check the wrap around of the modal."
  },
  {
    id: 3,
    name: "Event 3",
    date: new Date("Wed Jun 23 2021"),
    startTime: (new Date("Mon Jun 23 2021 13:30:16 GMT-0700")),
    endTime: (new Date("Mon Jun 23 2021 14:30:16 GMT-0700")),
    location: "San Luis Obispo",
    description: "This is the decription for Event 3"
  },
  {
    id: 4,
    name: "Event 4",
    date: new Date("Wed Jun 23 2021"),
    startTime: (new Date("Mon Jun 23 2021 13:30:16 GMT-0700")),
    endTime: (new Date("Mon Jun 23 2021 14:30:16 GMT-0700")),
    location: "San Luis Obispo",
    description: "This is the decription for Event 3"
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
    this.setState({ events: sampleEvents})
  }

  getEvents = (date) => {
    let events = []
    for (let event of sampleEvents) {
      if(event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear())
        events.push(event)
    }
    return events
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
    const events = this.getEvents(arg.date)
    this.setState({
      dateClickedStr: `${arg.date.getMonth()+1}/${arg.date.getDate()}/${arg.date.getFullYear()}`,
      dateClickedEvents: events
    });
    this.showDateModal()
  }

  handleEventClick = (arg) => {
    let eventClicked = null, events = []

    for (let event of this.state.events) {
      if(event.name === arg.event.title) {
        eventClicked = event
        break
      }
    }

    events = this.getEvents(eventClicked.date)

    console.log(events)
    this.setState({
      dateClickedStr: `${eventClicked.date.getMonth()+1}/${eventClicked.date.getDate()}/${eventClicked.date.getFullYear()}`,
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
                  start: event.startTime.getTime(),
                  end: event.startTime.getTime()
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
