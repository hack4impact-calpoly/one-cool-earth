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

  getEventComponents(){
	  return (this.props.events.map((e) =>
	    <Collapsible trigger={e.name}>
	      {
	        Object.keys(e).map(function(eventAttribute){
                  return <h6>{eventAttribute + ": " + e[eventAttribute]}</h6>
		})
	      }
              <div class="signUpBox"><Button class="signUpButton">Sign up</Button></div>
            </Collapsible>));
  }

  render() {
    return (
      <>
	<Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header>
            <Modal.Title>Events on {this.props.dateStr}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
	    {this.getEventComponents()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default DateModal;
