import React from 'react';
import './css/DateModal.css';
import {Button, Modal} from 'react-bootstrap';
import Collapsible from 'react-collapsible';

class DateModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }

  getEventComponents = () => {
    return (this.props.events.map((event) =>
      <Collapsible open={this.props.eventToggled === event.name}  trigger={event.name}>
          {Object.keys(event).map( (eventAttribute) => {
                return <h6>{eventAttribute + ": " + event[eventAttribute]}</h6>
          })}
        <div className="signUpBox"><Button className="signUpButton">Sign up</Button></div>
      </Collapsible>)
    );
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
