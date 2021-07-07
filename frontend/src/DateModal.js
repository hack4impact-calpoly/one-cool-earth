import React from 'react';
import './css/DateModal.css';
import {Button, Modal} from 'react-bootstrap';
import Collapsible from 'react-collapsible';

class DateModal extends React.Component {

    convertTo12HourClock = (date) => {
    let time;
    const minutes = date.getMinutes().toLocaleString("en-US", {minimumIntegerDigits: 2});
    if(date.getHours() === 0){
      time = `12:${minutes}am`;
    }else if(date.getHours() > 12){
      time = `${date.getHours() - 12}:${minutes}pm`;
    }else{
      time = `${date.getHours()}:${minutes}am`;
    }
    return time;
  }

  getEventComponents = () => {
    return (this.props.events.map((event) =>
          <Collapsible
              open={this.props.eventToggled === event._id}
              trigger={event.name}
              onTriggerOpening={() => this.props.handleEventClick(event)}
          >
            <h6>Name: {event.name}</h6>
            <h6>Date: {new Date(event.date).getMonth() + 1}/{new Date(event.date).getDate()}/{new Date(event.date).getFullYear()}</h6>
                <h6>Start time: {this.convertTo12HourClock(new Date(event.startTime))}</h6>
            <h6>End time: {this.convertTo12HourClock(new Date(event.endTime))}</h6>
            <h6>Address: {event.address}</h6>
            <h6>Description: {event.description}</h6>
            <h6>Number of volunteers needed: {event.numberOfVolunteers}</h6>
            <h6>Coordinator: {event.coordinator}</h6>
            <div className="add-remove-shift">
                {
                    this.props.shifts.includes(event._id)
                        ? <Button onClick={() => this.handleShiftRemoval(event)}>Remove</Button>
                        : <Button onClick={() => this.handleShiftSignUp(event)}>Sign up</Button>
                }
            </div>
          </Collapsible>
        )
    );
  }

    handleShiftSignUp = (event) => {
      const URL = `${process.env.REACT_APP_SERVER_URL}/api/user/add-shift`
      fetch(URL, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({shiftId: event._id}),
      }).then(response => {
          if(response.status === 200) {
              this.props.handleShiftAdd()
          }
      })
  }

    handleShiftRemoval = (event) => {
        const URL = `${process.env.REACT_APP_SERVER_URL}/api/user/delete-shift`
        fetch(URL, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({shiftId: event._id}),
        }).then(response => {
            if(response.status === 200) {
                this.props.handleShiftRemove()
            }
        })
    }

  render() {
    return (
        <Modal centered show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header>
            <Modal.Title>Events on {this.props.dateStr}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign: "center"}}>
            {this.props.events.length
                ? this.getEventComponents()
                : "No events. Check back soon!"
            }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default DateModal;
