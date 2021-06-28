import React from "react";
import { Modal, Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import "react-dropdown/style.css";
import "./css/SignUp.css";
import Select from "react-select";
import JotformEmbed from 'react-jotform-embed';
import Iframe from 'react-iframe'

// DUMMY: need to replace with backend data
let volunteerOptions = [
  { value: "garden workday", label: "Garden Workday Volunteer" },
  { value: "special events", label: "Special Events Volunteer" },
  { value: "garden educator", label: "Garden Educator Assistant" },
  { value: "office/remote", label: "Office/Remote Volunteer" },
];

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      validatedLastName: null,
      locationOptions: []
    }
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

  handleVolChange = (volSelected) => {
    this.setState({ volSelected: volSelected });
  };

  handleLocChange = (locSelected) => {
    this.setState({ locSelected: locSelected });
  };

  handleFirstNameChange = (event) => {
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

  handleLastNameChange = (event) => {
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

  handleEmailChange =(event) => {
    this.setState({ email: event.target.value + '@gmail.com' })
    if(/^[a-z0-9.]+$/.test(event.target.value) &&
      event.target.value.length > 5 &&
      event.target.value.length < 31 && 
      event.target.value.indexOf('.') !== 0 &&
      !event.target.value.includes(".com") &&
      !event.target.value.includes("gmail"))
      this.setState({ validatedEmail: true})
    else
      this.setState({ validatedEmail: false})
  }

  handlePhoneChange = (event) => {
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

  handleShowModal = (errorMsg) => {
    this.setState({ errorMsg: errorMsg, showModal: true })
  }

  handleClose = () => {
    this.setState({ showModal: false })
    this.clear();
  }

  handleSignUp = (event) => {
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
      this.handleShowModal("Please fill out all fields")
      return
    }

    const SignUpData = {
      name: {
          first: this.state.firstName,
          last: this.state.lastName
      },
      volunteerPreferences: this.state.volSelected.map(entry => entry.value),
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      location: this.state.locSelected.value,
    };
  
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/signup`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(SignUpData),
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if(data.status === 'user already exists') {
        this.handleShowModal('It looks like an account is already associated with this email!');
      } else {
        window.location.assign('/')
      }
    }).catch( (err) => {
      this.handleShowModal('An error occurred. Please try again.');
    })
  }

  clear() {
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("phone-number").value = "";
    document.getElementById("gmail-form-control").value = "";
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
    return (
      <div className="signup-wrapper">
        <Modal centered show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title className='d-flex justify-content-center'>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body className='d-flex justify-content-center'>{this.state.errorMsg}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <span className="signup-title">New Volunteer? Sign Up Here!</span>
        <Container fluid="md">
          <Form className="signup-forms" onSubmit={this.handleSignUp}>
            <Row>
              <Form.Group as={Col} controlId="first-name">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  required
                  placeholder="Enter your first name..."
                  size="lg"
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
                  placeholder="Enter your last name..."
                  size="lg"
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
                  size="lg"
                  onChange={this.handlePhoneChange}
                  isValid={this.state.validatedPhoneNumber}
                  isInvalid={this.state.phoneNumber && !this.state.validatedPhoneNumber}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Plese enter a valid phone number</Form.Control.Feedback>
                <Form.Text muted>Exact format is required</Form.Text>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Gmail</Form.Label>
                <InputGroup id="gmail-input-group" size="lg">
                  <Form.Control 
                    required
                    placeholder="username"
                    size="lg"
                    onChange={this.handleEmailChange}
                    isValid={this.state.validatedEmail}
                    isInvalid={(this.state.email && this.state.email !==  '@gmail.com')  && !this.state.validatedEmail}
                    id="gmail-form-control"
                  />
                  <InputGroup.Append className="input-group-lg">
                    <InputGroup.Text>@gmail.com</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Plese enter a valid gmail</Form.Control.Feedback>
                <Form.Text muted>Gmail is required</Form.Text>
              </Form.Group>
              </Row>
              <br />
              <Row>
                <Col>
                  <label htmlFor="volunteer-preferences">Volunteer Preferences</label>
                  <Select
                    value={this.state.volSelected}
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
                  <Form.Text muted>Specify the type of volunteer work that your prefer</Form.Text>
                </Col>
                <Col>
                  <label htmlFor="location-preference">Location Preference</label>
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
                        baseUnit: 8,
                      },
                    })}
                  />
                  <Form.Text muted>Specify the location that you prefer to volunteer at</Form.Text>
                </Col>
              </Row>
              <div className='d-flex justify-content-center'>
                <Button type="submit" className="signup-button">
                  Sign Up
                </Button>
              </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Signup;
