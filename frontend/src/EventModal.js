import React from 'react';
import {Button, Modal, Form, Row, Col} from 'react-bootstrap';

class EventModal extends React.Component {

    render () {
        return (
            <>
              <Modal centered show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header>
                  <Modal.Title>Event Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Name
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.props.eventData.name} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Date
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.props.eventData.date} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Time
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.props.eventData.time} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Location
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.props.eventData.location} />
                            </Col>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.props.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }
  
    
  }
  
export default EventModal;