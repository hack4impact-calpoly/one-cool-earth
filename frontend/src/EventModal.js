import React from 'react';
import {Button, Modal, Form, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaEdit } from 'react-icons/fa';


class EventModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  handleEditButton() {
    this.setState({
      edit: true
    })
  }

  handleCancelEdit() {
    this.setState({
      edit: false
    })
  }

  handleClose() {
    if(this.state.edit === true) {
      this.setState({
        edit: false
      })
    }
    this.props.handleClose()
  }

    render () {
        return (
            <>
              <Modal centered show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header>
                  <Modal.Title>Event Details</Modal.Title>
                  <FaEdit onClick={() => this.handleEditButton()}/>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Name
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.eventData.name} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Date
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={new Date(this.props.eventData.date).toLocaleDateString()} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Start Time
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.eventData.startTime} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            End Time
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.eventData.endTime} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Location
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.eventData.location} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Description
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.eventData.description} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Volunteers Needed Per Shift
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.eventData.volunteersPerShift} />
                            </Col>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                  {this.state.edit ?
                    <Button onClick={() => this.handleClose()}>
                      Save Changes
                    </Button> 
                  : null}
                  {this.state.edit ?
                    <Button onClick={() => this.handleCancelEdit()}>
                      Cancel
                    </Button> 
                  : null}
                  {!this.state.edit ?
                    <Button onClick={() => this.handleClose()}>
                    Close
                  </Button>
                  : null}
                  
                </Modal.Footer>
              </Modal>
            </>
          );
    }
  
    
  }
  
export default EventModal;