import React from 'react';
import {Container, Table, Button, Col, Form, Modal, Row} from 'react-bootstrap';
import {FaEdit} from 'react-icons/fa';
import Select from 'react-select'
import './css/EventModal.css'

const volunteerOptions = [
    { value: "Garden Workday Volunteer", label: "Garden Workday Volunteer" },
    { value: "Special Events Volunteer", label: "Special Events Volunteer" },
    { value: "Garden Educator Assistant", label: "Garden Educator Assistant" },
    { value: "Office Volunteer", label: "Office Volunteer" },
    { value: "Family Cooking Night Volunteer", label: "Family Cooking Night Volunteer" },
    { value: "Waste Audit Volunteer", label: "Waste Audit Volunteer" }
];

class EventModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      currEventData: {},
      date: '',
      locations: [],
      currentVolunteersNames: []
    }
  }

  componentDidMount() {
      if(this.state.locations.length === 0) {
          const URL = `${process.env.REACT_APP_SERVER_URL}/api/location/get-all`;
          fetch(URL, {credentials: 'include'})
              .then((res) => res.json())
              .then((data) => {
                  const locations = data.map( (entry) => {
                      return {value: entry.name, label: entry.name}
                  })
                  this.setState({
                      locations: locations,
                  })
              }, (error) => {
                  console.error("Error loading location data: ", error)
              });
      }
      this.updateEventDataState()
  }

  getNameFromUserId = userId => {
      let currentVolunteerNames = this.state.currentVolunteersNames
      const URL = `${process.env.REACT_APP_SERVER_URL}/api/admin/get-user-name/${userId}`
      const res = fetch(URL, {credentials: 'include'})
          .then( res => {
              if (res.status === 200) {
                  return res.json()
              } else {
                  return null
              }
          })
          .then( data => {
              if (data) {
                  const name = data.first + " " + data.last
                  currentVolunteerNames.push(name)
              }
              this.setState({currentVolunteerNames: currentVolunteerNames})
          })
  }

  timeToInput = parameter => {
      const time = new Date(parameter)
      const hour = (time.getHours() < 10 ? "0" : "") + time.getHours();
      const min = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
      return  hour + ":" + min
  }

  dateToInput = parameter => {
      const date = new Date(parameter)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)
      const day = (date.getDate() < 10 ? "0" : "") + date.getDate()
      return year + "-" + month + "-" + day
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

  handleFieldChange(e, field) {
    let curr = this.state.currEventData;
    if (field === "startTime" || field === "endTime") {
        const timeStrArr = e.target.value.split(":").map( entry => { return parseInt(entry)})
        if (timeStrArr.length === 2) {
            const time = new Date(
                new Date(this.state.currEventData.date).getFullYear(),
                new Date(this.state.currEventData.date).getMonth(),
                new Date(this.state.currEventData.date).getDate(),
                timeStrArr[0],
                timeStrArr[1]
            )
            curr[field] = time.toISOString()
        }
    } else if (field === "date") {
        this.setState({date: e.target.value})
        const dateStringArr = e.target.value.split("-")
        if (dateStringArr.length === 3) {
            const date = new Date(
                dateStringArr[0],
                dateStringArr[1] - 1,
                dateStringArr[2],
                0,
                0,
                0,
                0
            )
            curr[field] = date.toISOString()
            const newStartTime = new Date(curr["startTime"])
            newStartTime.setFullYear(date.getFullYear())
            newStartTime.setMonth(date.getMonth())
            newStartTime.setDate(date.getDate())
            curr["startTime"] = newStartTime
            const newEndTime = new Date(curr["endTime"])
            newEndTime.setFullYear(date.getFullYear())
            newEndTime.setMonth(date.getMonth())
            newEndTime.setDate(date.getDate())
            curr["endTime"] = newEndTime
        }
    } else {
        curr[field] = e.target.value;
    }
    this.setState({
      currEventData: curr
    })
  }

  handleSelectChange = (selection, field) => {
      let curr = this.state.currEventData;
      curr[field] = selection.value
      this.setState({currEventData: curr})
  }

  updateEventDataState = () => {
    let c = JSON.parse(JSON.stringify(this.props.eventData))
    if (c.users.length) {
        c.users.map(userId => {
            this.getNameFromUserId(userId)
        })
    }
    this.setState({
      currEventData: c,
      date: this.dateToInput(c.date),
    })
  }

  updateEvent() {
    if (this.state.currEventData.name === "" ||
        !this.state.currEventData.date.length ||
        !this.state.currEventData.startTime.length ||
        this.state.currEventData.endTime === "" ||
        this.state.currEventData.location === "" ||
        this.state.currEventData.address === "" ||
        this.state.currEventData.coordinator === "" ||
        this.state.currEventData.volunteerType === "" ||
        this.state.currEventData.numberOfVolunteers < 1) {
        this.updateEventDataState()
        this.setState({edit: false})
        return
    }
    const URL = `${process.env.REACT_APP_SERVER_URL}/api/event/edit`;
    fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(this.state.currEventData),
        credentials: 'include'
    })
    .then(res => res)
    .then(data => {
        this.props.handleChange(this.state.currEventData)
        this.setState({edit: false})
        console.log("updated event!: ", data)
    }, error => {
        this.setState({edit: false})
        console.error("Error updating event: ", error)
    });
  }

  render () {
    const currentVolunteersNames = this.state.currentVolunteersNames.length ? this.state.currentVolunteersNames.map(volunteer => {
        return (<tr className="current-volunteer" key={volunteer}><td>{volunteer}</td></tr>)
    }) : []
    return (
        <>
          <Modal centered show={this.props.show} onHide={this.props.handleClose}>
            <Modal.Header>
              <Modal.Title>Event Details</Modal.Title>
              <FaEdit id="edit-button" onClick={() => this.handleEditButton()}/>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="event-modal-row">
                        <Form.Label column sm="4">
                        Name
                        </Form.Label>
                        <Col sm="8">
                        <Form.Control
                            onChange={(e) => this.handleFieldChange(e, "name")}
                            plaintext={!this.state.edit}
                            readOnly={!this.state.edit}
                            value={this.state.currEventData.name}
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="event-modal-row">
                        <Form.Label column sm="4">
                            Date
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="date"
                                onChange={(e) => this.handleFieldChange(e, "date")}
                                plaintext={!this.state.edit}
                                readOnly={!this.state.edit}
                                value={this.state.date}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="event-modal-row">
                        <Form.Label column sm="4">
                            Start Time
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="time"
                                onChange={(e) => this.handleFieldChange(e, "startTime")}
                                plaintext={!this.state.edit}
                                readOnly={!this.state.edit}
                                value={this.timeToInput(this.state.currEventData.startTime)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="event-modal-row">
                        <Form.Label column sm="4">
                            End Time
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="time"
                                onChange={(e) => this.handleFieldChange(e, "endTime")}
                                plaintext={!this.state.edit}
                                readOnly={!this.state.edit}
                                value={this.timeToInput(this.state.currEventData.endTime)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="event-modal-row">
                        <Form.Label column sm="4">
                            Address
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                onChange={(e) => this.handleFieldChange(e, "address")}
                                plaintext={!this.state.edit}
                                readOnly={!this.state.edit}
                                value={this.state.currEventData.address}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="event-modal-row">
                        <Form.Label column sm="4">
                            Location
                        </Form.Label>
                        <Col sm="8">
                            <Select
                                onChange={(selection) => {this.handleSelectChange(selection, "location")}}
                                isDisabled={!this.state.edit}
                                options={this.state.locations}
                                value={{value: this.state.currEventData.location, label: this.state.currEventData.location}}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    borderColor: "black",
                                    colors: {
                                        ...theme.colors,
                                        neutral20: "black", // this is border line color
                                    }
                                })}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="event-modal-row">
                        <Form.Label column sm="4">
                            Coordinator
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                onChange={(e) => this.handleFieldChange(e, "coordinator")}
                                plaintext={!this.state.edit}
                                readOnly={!this.state.edit}
                                value={this.state.currEventData.coordinator}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="event-modal-row">
                        <Form.Label column sm="4">
                        Type
                        </Form.Label>
                        <Col sm="8">
                        <Select
                            onChange={(selection) => {this.handleSelectChange(selection, "volunteerType")}}
                            isDisabled={!this.state.edit}
                            options={volunteerOptions}
                            value={{value: this.state.currEventData.volunteerType, label: this.state.currEventData.volunteerType}}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                borderColor: "black",
                                colors: {
                                    ...theme.colors,
                                    neutral20: "black", // this is border line color
                                }
                            })}
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="event-modal-row">
                        <Form.Label column sm="4">
                            Description
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                onChange={(e) => this.handleFieldChange(e, "description")}
                                plaintext={!this.state.edit}
                                readOnly={!this.state.edit}
                                value={this.state.currEventData.description}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="event-modal-row">
                        <Form.Label column sm="4">
                            # of Volunteers
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="number"
                                onChange={(e) => this.handleFieldChange(e, "numberOfVolunteers")}
                                plaintext={!this.state.edit}
                                readOnly={!this.state.edit}
                                value={this.state.currEventData.numberOfVolunteers}
                            />
                        </Col>
                    </Form.Group>
                    {
                        Object.keys(this.state.currEventData).length && this.state.currEventData.users.length
                            ?
                            <Form.Group as={Row} className="event-modal-row">
                                <Container fluid>
                                    <Table striped hover size="sm">
                                        <thead><tr><th>Current Volunteers</th></tr></thead>
                                        <tbody>{currentVolunteersNames}</tbody>
                                    </Table>
                                </Container>
                            </Form.Group>
                            : null
                    }
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
    )
  }


}

export default EventModal
