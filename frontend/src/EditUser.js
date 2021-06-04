import React from "react";
import { Modal, Container, Form, Button, Row, Col } from "react-bootstrap";
import "react-dropdown/style.css";
import "./css/SignUp.css";
import Select from "react-select";

// // DUMMY: need to replace with backend data
const volunteerOptions = [
  { value: "garden workday", label: "Garden Workday Volunteer" },
  { value: "special events", label: "Special Events Volunteer" },
  { value: "garden educator", label: "Garden Educator Assistant" },
  { value: "office/remote", label: "Office/Remote Volunteer" },
  { value: "unsure", label: "Unsure or Interested in Multiple Opportunities" },
];
const locationOptions = [
  { value: "south county", label: "South County" },
  { value: "coastal", label: "Coastal" },
  { value: "san luis", label: "San Luis Obispo" },
  { value: "north county", label: "North County" },
];

class EditUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      volSelected: [],
      locSelected: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      modalMsg: null,
      showModal: false,
      validatedEmail: true,
      validatedPhoneNumber: true,
      validatedFirstName: true,
      validatedLastName: true
    }
    this.clear = this.clear.bind(this)
    this.handleLocChange = this.handleLocChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleVolChange = this.handleVolChange.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.getData = this.getData.bind(this)
    this.populateLocationSelection = this.populateLocationSelection.bind(this)
    this.populatePrefSelection = this.populatePrefSelection.bind(this)
  }

  componentDidMount() {
    this.getData()
  }
  
  async getData() {
    let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/get/${this.state.user.email}`, {
      mode: 'cors',
      credentials: 'include',
    })
  
    const data = await response.json()
  
    this.setState({
      firstName: data.name.first,
      lastName: data.name.last,
      phoneNumber: data.phoneNumber,
      email: data.email,
      volSelected: data.volunteerPreferences,
      locSelected: data.location
    })
  }

  populateLocationSelection() {
    let locArray = null
    for (let option of locationOptions) {
      if (this.state.locSelected === option.value) {
        locArray = option
        return locArray
      }
    }
  }

  populatePrefSelection() {
    let prefArray = []
    for (let pref of this.state.volSelected) {
        for (let option of volunteerOptions) {
          if (pref === option.value)
            prefArray.push(option)
        }
    }
    return prefArray
  }

  handleVolChange = (volSelected) => {
    this.setState({ volSelected: volSelected });
  };

  handleLocChange = (locSelected) => {
    this.setState({ locSelected: locSelected });
  };

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value })
    if(event.target.value &&
      /^[a-zA-Z]+$/.test(event.target.value) &&
      event.target.value.length > 1) {
      this.setState({ validatedFirstName: true})
    }
    else {
      this.setState({ validatedFirstName: false})
    }
  }

  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value })
    if(event.target.value &&
      /^[a-zA-Z]+$/.test(event.target.value) &&
      event.target.value.length > 1) {
      this.setState({ validatedLastName: true})
    }
    else {
      this.setState({ validatedLastName: false})
    }
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value })
    if(event.target.value.endsWith('@gmail.com'))
      this.setState({ validatedEmail: true})
    else
      this.setState({ validatedEmail: false})
  }

  handlePhoneChange(event) {
    let index = 0
    this.setState({ phoneNumber: event.target.value })
    if(event.target.value.length === 14) {
      if(event.target.value.indexOf('-', index) === 5) {
        index = 6;
        if(event.target.value.indexOf('-', index) === 9) {
          index = 10
            this.setState({validatedPhoneNumber: true})
        }
      }
    }
    else
      this.setState({ validatedPhoneNumber: false})
  }

  handleShowModal (msg) {
    this.setState({ modalMsg: msg, showModal: true })
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  handleEdit(event) {
    event.preventDefault();

    // Don't submit data unless both fields are non-empty
    if (
      !this.state.firstName||
      !this.state.lastName ||
      !this.state.phoneNumber ||
      !this.state.email ||
      !this.state.locSelected ||
      this.state.volSelected === []
    ) {
      return
    }

    const EditData = {
      name: {
          first: this.state.firstName,
          last: this.state.lastName
      },
      volunteerPreferences: this.state.volSelected.map(entry => entry.value),
      phoneNumber: this.state.phoneNumber,
      location: this.state.locSelected,
    };
  
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/edit`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(EditData)
      })
      .then( () => {
        console.log("edited!")
        this.handleShowModal("Successfully edited!");
      })
  }

  clear() {
    this.setState({
      volSelected: [],
      locSelected: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      errorMsg: null,
      showModal: false,
      validatedEmail: null,
      validatedPhoneNumber: null,
      validatedFirstName: null,
      validatedLastName: null
    })
  }

  render() {
    const volSelected  = this.populatePrefSelection()
    const locSelected  = this.populateLocationSelection();

    return (
      <div className="signup-wrapper">
        <Modal centered show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalMsg}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="signup-title">
          <h2>Edit Info</h2>
        </div>
        <Container fluid="md" style={{ paddingBottom: "20px" }}>
          <Form className="forms" onSubmit={this.handleSignUp}>
            <Row>
              <Form.Group as={Col} controlId="first-name">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  required
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                  isValid={this.state.validatedFirstName}
                  isInvalid={this.state.firstName && !this.state.validatedFirstName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Plese enter a valid first name</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="last-name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  required
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                  isValid={this.state.validatedLastName}
                  isInvalid={this.state.lastName && !this.state.validatedLastName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Plese enter a valid last name</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <br />
            <Row>
              <Form.Group as={Col} controlId="phone-number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                  required
                  placeholder="(###)-###-####"
                  value={this.state.phoneNumber}
                  onChange={this.handlePhoneChange}
                  isValid={this.state.validatedPhoneNumber}
                  isInvalid={this.state.phoneNumber && !this.state.validatedPhoneNumber}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Plese enter a valid phone number</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="email">
                <Form.Label>Gmail</Form.Label>
                <Form.Control 
                  readOnly
                  value={this.state.email}
                />
              </Form.Group>
              </Row>
              <br />
              <Row>
                <Col>
                  <label htmlFor="volunteer-preferences">Volunteer Preferences</label>
                  <Select
                    value={volSelected}
                    onChange={this.handleVolChange}
                    options={volunteerOptions}
                    isMulti={true}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      borderColor: "black",
                      colors: {
                        ...theme.colors,
                        neutral20: "black", // this is border line color
                      },
                      spacing: {
                        baseUnit: 8,
                      },
                    })}
                  />
                </Col>
                <Col>
                  <label htmlFor="location-preference">Location Preference</label>
                  <Select
                    value={locSelected}
                    onChange={this.handleLocChange}
                    options={locationOptions}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      borderColor: "black",
                      colors: {
                        ...theme.colors,
                        neutral20: "black", // this is border line color
                      },
                      spacing: {
                        baseUnit: 8,
                      },
                    })}
                  />
                </Col>
              </Row>
              <div className='d-flex justify-content-center'>
                <Button type="submit" className="signup-button">
                  Edit
                </Button>
              </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default EditUser;
