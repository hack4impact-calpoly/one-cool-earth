import './css/Calendar.css';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import DateModal from './DateModal'
import EventModal from './EventModal'

class CalendarPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      events: [],
      dateClickedStr: "",
      dateClickedEvents: [],
      eventClicked: "",
      eventModalData: {},
      userShifts: []
    }
  }

  componentDidMount() {
    const eventsURL = `${process.env.REACT_APP_SERVER_URL}/api/event/get-all`
    fetch(eventsURL,
        {
          credentials: 'include',
          mode: 'cors'
        })
        .then((res) => res.json())
        .then((events) => this.setState({events: events}))
        .catch((err) => console.error(err))
    const shiftsURL = `${process.env.REACT_APP_SERVER_URL}/api/user/shifts`
    fetch(shiftsURL,
        {
          method: 'POST',
          credentials: 'include',
          mode: 'cors'
        })
        .then(res => res.json())
        .then(userShifts => this.setState({userShifts: userShifts}))
        .catch(err => console.error(err))
  }

  getEvents = (date) => {
    let events = []
    const allEvents = this.state.events.slice();
    const dateObj = new Date(date);
    for (let event of allEvents) {
      let eventDate = new Date(event.date);
      if(eventDate.getDate() === dateObj.getDate() &&
          eventDate.getMonth() === dateObj.getMonth() &&
          eventDate.getFullYear() === dateObj.getFullYear())
        events.push(event)
    }
    return events;
  }

  handleShowModal = () => {
    this.setState({showModal: true});
  }

  handleHideModal = () => {
    this.setState({
      showModal: false,
      dateClickedStr: "",
      dateClickedEvents: [],
      eventClicked: "",
      eventModalData: {}
    });
  }

  handleDateClick = (arg) => {
    const events = this.getEvents(arg.date);
    this.setState({
      dateClickedStr: `${arg.date.getMonth()+1}/${arg.date.getDate()}/${arg.date.getFullYear()}`,
      dateClickedEvents: events
    });
    this.handleShowModal();
  }

  handleEventClickFromCalendar = (arg) => {
    let eventClicked = null, events = []
    const stateEvents = this.state.events.slice();
    for (let event of stateEvents) {
      if(event._id === arg.event.id) {
        eventClicked = event
        break
      }
    }
    if (eventClicked) {
      events = this.getEvents(eventClicked.date)
      const eventDate = new Date(eventClicked.date)
      this.setState({
        dateClickedStr: `${eventDate.getMonth() + 1}/${eventDate.getDate()}/${eventDate.getFullYear()}`,
        dateClickedEvents: events,
        eventClicked: arg.event.id,
        eventModalData: this.props.user.admin ? eventClicked : {}
      })
      this.handleShowModal()
    }
  }

  handleEventClickFromModal = (event) => {
    this.setState({eventClicked: event._id})
  }

  handleShiftAdd = () => {
    let newUserShifts = this.state.userShifts
    newUserShifts.push(this.state.eventClicked)
    this.setState({userShifts: newUserShifts})
  }

  handleShiftRemove = () => {
    let newUserShifts = this.state.userShifts
    newUserShifts = newUserShifts.filter(shift => shift !== this.state.eventClicked)
    this.setState({userShifts: newUserShifts})
  }

  handleEventModalChange = (eventData) => {
    let newEventData = this.state.events
    newEventData.splice(newEventData.findIndex( entry => entry._id === eventData._id), 1, eventData)
    this.setState({eventModalData: eventData, events: newEventData})
  }

  render () {
    return (
      <div id='calendar-page'>
        <div className={`calendar-container ${this.props.user.admin ? 'admin' : 'volunteer-calendar'}`}>
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
                  end: new Date(event.endTime),
                  id: event._id
                })
              })
            }
            eventClick={this.handleEventClickFromCalendar}
            initialView = 'dayGridMonth'
            fixedWeekCount={false}
            dateClick={this.props.user.admin ? null : this.handleDateClick}
            height='100%'
          />
        </div>
        {
          this.props.user.admin
              ?
              this.state.showModal ?
                <EventModal
                    show={this.state.showModal}
                    eventData={this.state.eventModalData}
                    handleClose={this.handleHideModal}
                    handleChange={this.handleEventModalChange}
                /> : null
              :
              <DateModal
                  show={this.state.showModal}
                  onHide={this.handleHideModal}
                  dateStr={this.state.dateClickedStr}
                  events={this.state.dateClickedEvents}
                  eventToggled={this.state.eventClicked}
                  shifts={this.state.userShifts}
                  handleShiftAdd={this.handleShiftAdd}
                  handleShiftRemove={this.handleShiftRemove}
                  handleEventClick={this.handleEventClickFromModal}
              />
        }
      </div>
    );
  }
}

export default CalendarPage
