import "react-dropdown/style.css";
import React from "react";
import "./css/CreateEvent.css";
import { Modal, Container, Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";

const volunteerOptions = [
  { value: "Garden Workday Volunteer", label: "Garden Workday Volunteer" },
  { value: "Special Events Volunteer", label: "Special Events Volunteer" },
  { value: "Garden Educator Assistant", label: "Garden Educator Assistant" },
  { value: "Office Volunteer", label: "Office Volunteer" },
  { value: "Family Cooking Night Volunteer", label: "Family Cooking Night Volunteer" },
  { value: "Waste Audit Volunteer", label: "Waste Audit Volunteer" }
];

class CreateEvent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      volSelected: [],
      locSelected: {},
      name: "",
      date: null,
      startTime: null,
      endTime: null,
      description: "",
      numberOfVolunteers: 0,
      coordinator: "",
      address: "",
      modalMsg: "",
      isErrorModal: "",
      showModal: false,
      validatedName: null,
      validatedCoordinator: null,
      validatedAddress: null,
      validatedDate: null,
      validatedStartTime: null,
      validatedEndTime: null,
      validatedNumberOfVolunteers: null,
      locationOptions: [],
    }
  }

  clear = () => {
    this.setState({
      volSelected: [],
      locSelected: {},
      name: "",
      date: null,
      startTime: null,
      endTime: null,
      description: "",
      numberOfVolunteers: 0,
      coordinator: "",
      address: "",
      modalMsg: "",
      isErrorModal: "",
      showModal: false,
      validatedName: null,
      validatedCoordinator: null,
      validatedAddress: null,
      validatedDate: null,
      validatedStartTime: null,
      validatedEndTime: null,
      validatedNumberOfVolunteers: null,
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
      /^[a-z0-9 .-]+$/i.test(event.target.value) &&
      event.target.value.length > 1) {
      this.setState({ validatedAddress: true})
    }
    else {
      this.setState({ validatedAddress: false})
    }
  }

  isValidDate = (date, currDate) => {
    if (date.getFullYear() >= currDate.getFullYear()) {
      if (date.getMonth() > currDate.getMonth()) {
        return true
      } else if (date.getMonth() === currDate.getMonth()) {
        return date.getDate() >= currDate.getDate();
      } else {
        return false
      }
    }
    return false
  }

  checkDate = (date) => {
    if(date) {
      const currDate = new Date()
      if (this.isValidDate(date, currDate)) {
        this.setState({validatedDate: true})
      } else {
        this.setState({validatedDate: false})
      }
    }
  }

  checkStartTime = (currDate, start) => {
    if(start) {
      const currDate = new Date()
      currDate.setSeconds(0)
      currDate.setMilliseconds(0)

      if (start.getDate() === currDate.getDate() &&
          start.getMonth() === currDate.getMonth() &&
          start.getFullYear() === currDate.getFullYear()) {
        if (start >= currDate) {
          this.setState({validatedStartTime: true})
        } else {
          this.setState({validatedStartTime: false})
        }
      } else {
        this.setState({validatedStartTime: true})
      }
    }
  }

  checkEndTime = (start, end) => {
    if (end) {
      if (end > start) {
        this.setState({validatedEndTime: true})
      } else {
        this.setState({validatedEndTime: false})
      }
    }
  }

  handleDateChange = (event) => {
    const dateStringArr = event.target.value.split("-")
    if(dateStringArr.length === 3) {
      const date = new Date(
          dateStringArr[0],
          dateStringArr[1] - 1,
          dateStringArr[2],
          0,
          0,
          0,
          0
      )
      this.setState({
        date: date,
        validatedDate: null,
        startTime: null,
        validatedStartTime: null,
        endTime: null,
        validatedEndTime: null
      })
      document.getElementById('start-time').value = ''
      document.getElementById('end-time').value = ''
      this.checkDate(date)
    }
  }

  handleStartTimeChange = (event) =>  {
    const timeStrArr = event.target.value.split(":").map( entry => { return parseInt(entry)})
    if(this.state.date && timeStrArr.length === 2) {
      const start = new Date(
          this.state.date.getFullYear(),
          this.state.date.getMonth(),
          this.state.date.getDate(),
          timeStrArr[0],
          timeStrArr[1]
      )
      this.setState({
        startTime: start,
        endTime: null,
        validatedEndTime: null
      })
      document.getElementById('end-time').value = ''
      this.checkStartTime(this.state.date, start)
    }
  }

  handleEndTimeChange = (event) => {
    const timeStrArr = event.target.value.split(":").map( entry => { return parseInt(entry)})
    if(this.state.date && timeStrArr.length === 2) {
      const end = new Date(
          this.state.date.getFullYear(),
          this.state.date.getMonth(),
          this.state.date.getDate(),
          timeStrArr[0],
          timeStrArr[1]
      )
      if(this.state.date && this.state.startTime) {
        this.setState({endTime: end})
        this.checkEndTime(this.state.startTime, end)
      }
    }
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value })
  }

  handleNumberOfVolunteersChange = (event) => {
    this.setState({ numberOfVolunteers: event.target.value })
    if(event.target.value &&
      /^[0-9^-]+$/.test(event.target.value) &&
      event.target.value > 0) {
      this.setState({ validatedNumberOfVolunteers: true})
    }
    else {
      this.setState({ validatedNumberOfVolunteers: false})
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
      !this.state.numberOfVolunteers ||
      this.state.volSelected.length === 0
    ) {
      this.handleShowModal("Please fill out all fields", true)
      return
    }

    const createEventData = {
      name: this.state.name,
      coordinator: this.state.coordinator,
      address: this.state.address,
      location: this.state.locSelected.value,
      date: this.state.date.toISOString(),
      startTime: this.state.startTime.toISOString(),
      endTime: this.state.endTime.toISOString(),
      numberOfVolunteers: this.state.numberOfVolunteers,
      volunteerType: this.state.volSelected.value,
      description: this.state.description
    }

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/event/create`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(createEventData),
    }).then((response) => {
      if(response.status === 200) {
        this.handleShowModal('The event has been successfully created!', false)
      } else {
        this.handleShowModal('Attempt to create event was unsuccessful. Please try again.', true);
      }
    }).catch( () => {
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
              <Form.Control.Feedback type="invalid">Please enter a valid event name (alphabetical characters only)</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">Please enter a valid name (alphabetical characters only)</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">Please enter a valid address</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Row>
            <Form.Group as={Col} controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                  required
                  size="lg"
                  type="date"
                  onChange={this.handleDateChange}
                  isValid={this.state.validatedDate}
                  isInvalid={this.state.date && !this.state.validatedDate}
              />
              <Form.Text muted>Enter the date of the event</Form.Text>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">The event can't take place before today</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="start-time">
              <Form.Label>Start</Form.Label>
              <Form.Control
                required
                size="lg"
                type="time"
                disabled={!(this.state.date && this.state.validatedDate)}
                onChange={this.handleStartTimeChange}
                isValid={this.state.date && this.state.validatedDate && this.state.validatedStartTime}
                isInvalid={this.state.startTime && !this.state.validatedStartTime}
              />
              <Form.Text muted>Enter the start time of the event</Form.Text>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">The start time must take place after the current time</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="end-time">
              <Form.Label>End</Form.Label>
              <Form.Control
                required
                size="lg"
                type="time"
                disabled={!(this.state.startTime && this.state.validatedStartTime && this.state.date && this.state.validatedDate)}
                onChange={this.handleEndTimeChange}
                isValid={this.state.validatedEndTime && this.state.validatedStartTime}
                isInvalid={this.state.endTime && !this.state.validatedEndTime}
              />
              <Form.Text muted>Enter the end time of the event</Form.Text>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">The end time must take place after the start time</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label htmlFor="volunteer-type">Volunteer Type</Form.Label>
              <Select
                closeMenuOnSelect={false}
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
              <Form.Label>Number of Volunteers</Form.Label>
              <Form.Control
                required
                placeholder="Enter the # of volunteers for the event..."
                size="lg"
                type="number"
                onChange={this.handleNumberOfVolunteersChange}
                isValid={this.state.validatedNumberOfVolunteers}
                isInvalid={this.state.numberOfVolunteers && !this.state.validatedNumberOfVolunteers}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter a valid number grater than 0</Form.Control.Feedback>
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
