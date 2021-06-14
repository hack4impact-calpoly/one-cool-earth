import "react-dropdown/style.css";
import React from "react";
import "./css/CreateEvent.css";
import { Modal, Container, Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";

// DUMMY: need to replace with backend data
const volunteerOptions = [
  { value: "garden workday", label: "Garden Workday Volunteer" },
  { value: "special events", label: "Special Events Volunteer" },
  { value: "garden educator", label: "Garden Educator Assistant" },
  { value: "office/remote", label: "Office/Remote Volunteer" },
];

class CreateEvent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      volSelected: null,
      locSelected: null,
      name: null,
      startTime: null,
      endTime: null,
      description: null,
      volunteersPerShift: null,
      coordinator: null,
      address: null,
      modalMsg: null,
      isErrorModal: null,
      showModal: false,
      validatedName: null,
      validatedCoordinator: null,
      validatedAddress: null,
      validatedStartTime: null,
      validatedEndTime: null,
      validatedVolunteersPerShift: null,
      locationOptions: []
    }
  }

  clear = () => {
    this.setState({
      volSelected: null,
      locSelected: null,
      name: null,
      startTime: null,
      endTime: null,
      description: null,
      volunteersPerShift: null,
      coordinator: null,
      address: null,
      modalMsg: null,
      isErrorModal: null,
      showModal: false,
      validatedName: null,
      validatedCoordinator: null,
      validatedAddress: null,
      validatedStartTime: null,
      validatedEndTime: null,
      validatedVolunteersPerShift: null
    })
  }

  componentDidMount = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/get-all`, {
      mode: 'cors',
      credentials: 'include'
    })
    .then( response => response.json())
    .then( data => {
      const locations = data.map( (entry) => {
        return {value: entry.name, label: entry.name}
      })
      this.setState({ locationOptions: locations })
    })
  }

  handleShowModal = (modalMsg, isError) => {
    this.setState({
      modalMsg: modalMsg, 
      isErrorModal : isError,
      showModal: true 
    })
  }

  handleClose = () => {
    document.getElementById('event-name').value = ""
    document.getElementById('coordinator').value = ""
    document.getElementById('address').value = ""
    document.getElementById('start-time').value = ""
    document.getElementById('end-time').value = ""
    document.getElementById('description').value = ""
    document.getElementById('volunteers-per-shift').value = ""
    if(this.state.isErrorModal) {
      this.setState({ showModal: false })
    }
    else
      window.location.assign('/')
  }

  handleVolChange = (volSelected) => {
    this.setState({ volSelected: volSelected });
  }

  handleLocChange = (locSelected) => {
    this.setState({ locSelected: locSelected });
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
    if(event.target.value &&
      /^[a-zA-Z'":,\-& ]+$/.test(event.target.value) &&
      event.target.value.length > 1) {
      this.setState({ validatedName: true})
    }
    else {
      this.setState({ validatedName: false})
    }
  }

  handleCoordinatorChange = (event) => {
    this.setState({ coordinator: event.target.value })
    if(event.target.value &&
      /^[a-zA-Z ]+$/.test(event.target.value) &&
      event.target.value.length > 1) {
      this.setState({ validatedCoordinator: true})
    }
    else {
      this.setState({ validatedCoordinator: false})
    }
  }

  handleAddressChange = (event) => {
    this.setState({ address: event.target.value })
    if(event.target.value &&
      /^[a-z0-9 .]+$/i.test(event.target.value) &&
      event.target.value.length > 1) {
      this.setState({ validatedAddress: true})
    }
    else {
      this.setState({ validatedAddress: false})
    }
  }

  handleStartTimeChange = (event) =>  {
    const currDate = new Date()
    const startTime = new Date(event.target.value)
    this.setState({ startTime: event.target.value })
    if(event.target.value &&
      startTime > currDate) {
      this.setState({ validatedStartTime: true})
    }
    else {
      this.setState({ validatedStartTime: false})
    }  
  }

  handleEndTimeChange = (event) => {
    const currDate = new Date()
    const endTime = new Date(event.target.value)
    this.setState({ endTime: event.target.value })
    if(event.target.value &&
      (endTime > currDate || endTime === currDate)) {
      this.setState({ validatedEndTime: true})
    }
    else {
      this.setState({ validatedEndTime: false})
    }  
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value })
  }

  handleVolunteersPerShiftChange = (event) => {
    this.setState({ volunteersPerShift: event.target.value })
    if(event.target.value &&
      /^[0-9^-]+$/.test(event.target.value) &&
      event.target.value > 0) {
      this.setState({ validatedVolunteersPerShift: true})
    }
    else {
      this.setState({ validatedVolunteersPerShift: false})
    }  

  }

  handleCreate = (event) => {
    event.preventDefault();

    // Don't submit data unless both fields are non-empty
    if (
      !this.state.name||
      !this.state.coordinator ||
      !this.state.locSelected ||
      !this.state.address ||
      !this.state.startTime ||
      !this.state.endTime ||
      !this.state.volunteersPerShift ||
      this.state.volSelected.length === 0
    ) {
      this.handleShowModal("Please fill out all fields", true)
      return
    }
    
    const editEventData = {
      name: this.state.name,
      coordinator: this.state.coordinator,
      address: this.state.address,
      location: this.state.locSelected.value,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      volunteersPerShift: this.state.volunteersPerShift,
      volunteerType: this.state.volSelected.value
    }

      
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/event/create`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(editEventData),
    }).then((response) => {
      if(response.status === 200)
        this.handleShowModal('The event has been successfully created!', false);
      else
      this.handleShowModal('Attempt to create event was unsuccessful. Please try again.', true);
    }).catch( (err) => {
      this.handleShowModal('An error occurred. Please try again.', true);
    })

  }

  render() {
    return (
      <div className="create-event-wrapper">
        <Modal centered show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title className='d-flex justify-content-center'>{this.state.isErrorModal ? "Error" : "Success"}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='d-flex justify-content-center'>{this.state.modalMsg}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="create-event-title">
          <span>Create an Event!</span>
        </div>
        <Container fluid="md">
        <Form className="create-event-forms" onSubmit={this.handleCreate}>
          <Row>
            <Form.Group as={Col} controlId="event-name">
              <Form.Label>Event Name</Form.Label>
              <Form.Control 
                required
                placeholder="Enter the name of the event..."
                size="lg"
                onChange={this.handleNameChange}
                isValid={this.state.validatedName}
                isInvalid={this.state.name && !this.state.validatedName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Plese enter a valid event name (alphabetical characters only)</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="coordinator">
              <Form.Label>Coordinator</Form.Label>
              <Form.Control 
                required
                placeholder="Enter the coordinator's name..."
                size="lg"
                onChange={this.handleCoordinatorChange}
                isValid={this.state.validatedCoordinator}
                isInvalid={this.state.coordinator && !this.state.validatedCoordinator}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Plese enter a valid name (alphabetical characters only)</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Row>
            <Col>
              <label htmlFor="location">Location</label>
              <Select
                value={this.state.locSelected}
                onChange={this.handleLocChange}
                options={this.state.locationOptions}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  borderColor: "black",
                  colors: {
                    ...theme.colors,
                    neutral20: "black", // this is border line color
                  },
                  spacing: {
                    baseUnit: 7,
                  },
                })}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Form.Group as={Col} controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                required
                placeholder="Enter the address of the event..."
                size="lg"
                onChange={this.handleAddressChange}
                isValid={this.state.validatedAddress}
                isInvalid={this.state.address && !this.state.validatedAddress}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Plese enter a valid address</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Row>
            <Form.Group as={Col} controlId="start-time">
              <Form.Label>Start</Form.Label>
              <Form.Control 
                required
                size="lg"
                type="datetime-local"
                onChange={this.handleStartTimeChange}
                isValid={this.state.validatedStartTime}
                isInvalid={this.state.startTime && !this.state.validatedStartTime}
              />
              <Form.Text muted>Enter the start date/time of the event</Form.Text>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">The start date/time must take place after the current date/time</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="end-time">
              <Form.Label>End</Form.Label>
              <Form.Control 
                required
                size="lg"
                type="datetime-local"
                disabled={!(this.state.startTime && this.state.validatedStartTime)}
                onChange={this.handleEndTimeChange}
                isValid={this.state.validatedEndTime}
                isInvalid={this.state.endTime && !this.state.validatedEndTime}
              />
              <Form.Text muted>Enter the end time/date of the event</Form.Text>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">The end date/time must take place after the start date/time</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label htmlFor="volunteer-type">Volunteer Type</Form.Label>
              <Select
                value={this.volSelected}
                onChange={this.handleVolChange}
                options={volunteerOptions}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  borderColor: "black",
                  colors: {
                    ...theme.colors,
                    neutral20: "black", // this is border line color
                  },
                  spacing: {
                    baseUnit: 7,
                  },
                })}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Form.Group as={Col} controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Enter a description of the event..."
                onChange={this.handleDescriptionChange}
                as="textarea"
                size="lg"
              />
              <Form.Text muted>(Optional)</Form.Text>
            </Form.Group>
            <Form.Group as={Col} controlId="volunteers-per-shift">
              <Form.Label>Number of Volunteers Per Shift</Form.Label>
              <Form.Control
                required
                placeholder="Enter the # of volunteers allowed per shift..."
                size="lg"
                type="number"
                onChange={this.handleVolunteersPerShiftChange}
                isValid={this.state.validatedVolunteersPerShift}
                isInvalid={this.state.volunteersPerShift && !this.state.validatedVolunteersPerShift}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Plese enter a valid number grater than 0</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className='d-flex justify-content-center'>
            <Button type="submit" className="create-event-button">
              Create
            </Button>
          </div>
        </Form>
        </Container>
      </div>
    )
  }
}

export default CreateEvent;
