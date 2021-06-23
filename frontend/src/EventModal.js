import React from 'react';
import {Button, Modal, Form, Row, Col} from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';


class EventModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  componentDidMount() {
    if(this.state.locations === undefined) {
      console.log("HERE")
      const URL = `${process.env.REACT_APP_SERVER_URL}/api/location/get-all`;
      fetch(URL, {credentials: 'include'})
          .then((res) => res.json())
          .then((data) => {
              this.setState({locations: data})
          }, (error) => {
              console.log("Error loading location data: ", error)
          });
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

  getLocationOptions() {
    let locs = this.state.locations.map((key, value) => {
       return <option>{key.name}</option>
    })
    return locs;
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
                        {/* <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Date
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={new Date(this.props.eventData.date).toLocaleDateString()} />
                            </Col>
                        </Form.Group> */}
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
                            <Form.Control  as={this.state.edit ? "select" : "input"} plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.eventData.location} >
                              {this.state.edit ? this.getLocationOptions() : null}
                            </Form.Control>
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
                            Volunteers Per Shift
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.eventData.volunteersPerShift} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Coordinator
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.eventData.coordinator} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Address
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.eventData.address} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Type
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.eventData.volunteerType} />
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
