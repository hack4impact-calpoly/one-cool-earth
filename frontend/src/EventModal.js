import React from 'react';
import {Button, Modal, Form, Row, Col} from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';


class EventModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      currEventData: {}
    }
  }

  componentDidMount() {
    if(this.state.locations === undefined) {
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
    let c = JSON.parse(JSON.stringify(this.props.eventData))
    this.setState({
      edit: false,
      currEventData: c
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

  handleFieldChange(e, field) {
    console.log(e)
    let curr = this.state.currEventData;
    curr[field] = e.target.value;
    this.setState({
      currEventData: curr
    })
  }

  updateEventDataState() {
    let c = JSON.parse(JSON.stringify(this.props.eventData))
    this.setState({
      currEventData: c
    })
  }

  updateEvent() {
    console.log(this.state.currEventData)
    const URL = `${process.env.REACT_APP_SERVER_URL}/api/event/editEvent`;
        fetch(URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify(this.state.currEventData),
            credentials: 'include'
          })
            .then((res) => res)
            .then((data) => {
                console.log("updated event!: ", data)
            }, (error) => {
                console.log("Error updating event: ", error)
            });
}



    render () {
      if(this.props.show && Object.keys(this.state.currEventData).length === 0) {
        this.updateEventDataState()
        return null
      } else {


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
                            <Form.Control onChange={(e) => this.handleFieldChange(e, "name")} plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} value={this.state.currEventData.name} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Start Time
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control onChange={(e) => this.handleFieldChange(e, "startTime")} plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} value={this.state.currEventData.startTime} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            End Time
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control onChange={(e) => this.handleFieldChange(e, "endTime")} plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} value={this.state.currEventData.endTime} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Location
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control onChange={(e) => this.handleFieldChange(e, "location")} as={this.state.edit ? "select" : "input"} plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} value={this.state.currEventData.location} >
                              {this.state.edit ? this.getLocationOptions() : null}
                            </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Description
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control onChange={(e) => this.handleFieldChange(e, "description")} plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} value={this.state.currEventData.description} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Volunteers Per Shift
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control onChange={(e) => this.handleFieldChange(e, "numberOfVolunteers")} plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} value={this.state.currEventData.numberOfVolunteers} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Coordinator
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control onChange={(e) => this.handleFieldChange(e, "coordinator")} plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} value={this.state.currEventData.coordinator} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Address
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control onChange={(e) => this.handleFieldChange(e, "address")} plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} value={this.state.currEventData.address} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Type
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control onChange={(e) => this.handleFieldChange(e, "volunteerType")} plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} value={this.state.currEventData.volunteerType} />
                            </Col>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                  {this.state.edit ?
                    <Button onClick={() => this.updateEvent()}>
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
          )};
    }


  }

export default EventModal;
