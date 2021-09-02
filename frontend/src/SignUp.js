import React from "react";
import {
  Modal,
  Container,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import "react-dropdown/style.css";
import "./css/SignUp.css";
import Select from "react-select";
import { withRouter } from 'react-router-dom'

const volunteerOptions = [
  { value: "Garden Workday Volunteer", label: "Garden Workday Volunteer" },
  { value: "Special Events Volunteer", label: "Special Events Volunteer" },
  { value: "Garden Educator Assistant", label: "Garden Educator Assistant" },
  { value: "Office Volunteer", label: "Office Volunteer" },
  { value: "Family Cooking Night Volunteer", label: "Family Cooking Night Volunteer" },
  { value: "Waste Audit Volunteer", label: "Waste Audit Volunteer" }
];

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volSelected: [],
      locSelected: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      errorMsg: null,
      showErrorModal: false,
      showSuccessModal: false,
      validatedEmail: null,
      validatedPhoneNumber: null,
      validatedFirstName: null,
      validatedLastName: null,
      locationOptions: [],
    };
  }

  componentDidMount = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/get-all`, {
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const locations = data.map((entry) => {
          return { value: entry.name, label: entry.name };
        });
        this.setState({ locationOptions: locations });
      });
  };

  handleVolChange = (volSelected) => {
    this.setState({ volSelected: volSelected });
  };

  handleLocChange = (locSelected) => {
    this.setState({ locSelected: locSelected });
  };

  handleFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
    if (
      event.target.value &&
      /^[a-zA-Z]+$/.test(event.target.value) &&
      event.target.value.length > 1
    ) {
      this.setState({ validatedFirstName: true });
    } else {
      this.setState({ validatedFirstName: false });
    }
  };

  handleLastNameChange = (event) => {
    this.setState({ lastName: event.target.value });
    if (
      event.target.value &&
      /^[a-zA-Z]+$/.test(event.target.value) &&
      event.target.value.length > 1
    ) {
      this.setState({ validatedLastName: true });
    } else {
      this.setState({ validatedLastName: false });
    }
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value});
    if (
      /^[a-z0-9.@]+$/.test(event.target.value) &&
      event.target.value.indexOf('.') !== 0 &&
      event.target.value.includes('@') &&
      event.target.value.includes('.com')
    )
      this.setState({ validatedEmail: true });
    else
      this.setState({ validatedEmail: false });
  };

  stringInsert = (index, string, ogString)  => {
    if (index > 0) {
      return ogString.substring(0, index) + string + ogString.substr(index);
    }
    return string + ogString;
  };

  handlePhoneChange = (event) => {
    let phoneNumber = event.target.value.replace('(', '')
    phoneNumber = phoneNumber.replace(')', '')
    phoneNumber = phoneNumber.replace('-', '')
    this.setState({ phoneNumber: phoneNumber });
    let nums = (event.target.value.match(/[0-9]/g) || []).length
    if (nums < 4) {
      if (event.target.value.includes('(') || event.target.value.includes(')')) {
        let temp = event.target.value.replace('(', '')
        document.getElementById("phone-number").value = temp.replace(')', '')
      }
    } else if (nums >= 4 && !(event.target.value.includes(')') && event.target.value.includes('(')) ) {
      let temp = this.stringInsert(0, "(", event.target.value)
      document.getElementById("phone-number").value = this.stringInsert(4, ")", temp)
    } else if (nums < 7)  {
      if (event.target.value.includes('-')) {
        document.getElementById("phone-number").value = event.target.value.replace('-', '')
      }
    } else if (nums >= 7 && !event.target.value.includes('-')) {
      document.getElementById("phone-number").value = this.stringInsert(8, "-", event.target.value)
    }
    if (
        nums === 10 &&
        event.target.value.length === 13 &&
        event.target.value.indexOf('(') === 0 &&
        event.target.value.indexOf(')') === 4 &&
        event.target.value.indexOf('-') === 8
    ) {
      this.setState({ validatedPhoneNumber: true });
    } else
      this.setState({ validatedPhoneNumber: false });
  };

  handleShowErrorModal = (errorMsg) => {
    this.setState({ errorMsg: errorMsg, showErrorModal: true });
  };

  handleErrorModalClose = () => {
    this.setState({ showErrorModal: false });
    this.clear();
  };

  handleShowSuccessModal = () => {
    this.setState({ showSuccessModal: true });
  };

  handleSuccessModalClose = () => {
    this.setState({ showSuccessModal: false });
    this.clear();
    this.props.handleSignUp(this.state.email)
  };

  handleSignUp = (event) => {
    event.preventDefault();

    // Don't submit data unless both fields are non-empty
    if (
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.phoneNumber ||
      !this.state.email ||
      !this.state.locSelected ||
      this.state.volSelected === []
    ) {
      this.handleShowErrorModal("Please fill out all fields");
      return;
    }

    const SignUpData = {
      name: {
        first: this.state.firstName,
        last: this.state.lastName,
      },
      volunteerPreferences: this.state.volSelected.map((entry) => entry.value),
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
    }).then(res => {
      if (res.status === 404)
        this.handleShowErrorModal('It looks like an account is already associated with this email!');
      else {
        this.handleShowSuccessModal()
      }
    }).catch(err => {
      this.handleShowErrorModal('Unknown error. Please try again.');
    })
  };

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
      showErrorModal: false,
      validatedEmail: null,
      validatedPhoneNumber: null,
      validatedFirstName: null,
      validatedLastName: null,
    });
  }

  render() {
    return (
      <div className="signup-wrapper">
        <Modal centered show={this.state.showErrorModal} onHide={this.handleErrorModalClose}>
          <Modal.Header>
            <Modal.Title className="d-flex justify-content-center">Error!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            {this.state.errorMsg}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleErrorModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal centered show={this.state.showSuccessModal} onHide={this.handleSuccessModalClose}>
          <Modal.Header>
            <Modal.Title className="d-flex justify-content-center">Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            Your account has been successfully created!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSuccessModalClose}>
              Continue
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
                  isInvalid={
                    this.state.firstName && !this.state.validatedFirstName
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid first name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="last-name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter your last name..."
                  size="lg"
                  onChange={this.handleLastNameChange}
                  isValid={this.state.validatedLastName}
                  isInvalid={
                    this.state.lastName && !this.state.validatedLastName
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid last name
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <br />
            <Row>
              <Form.Group as={Col} controlId="phone-number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  placeholder="(###)###-####"
                  size="lg"
                  onChange={this.handlePhoneChange}
                  isValid={this.state.validatedPhoneNumber}
                  isInvalid={
                    this.state.phoneNumber && !this.state.validatedPhoneNumber
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid phone number
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Gmail</Form.Label>
                <InputGroup id="gmail-input-group" size="lg">
                  <Form.Control
                    required
                    placeholder="Enter your email address..."
                    size="lg"
                    onChange={this.handleEmailChange}
                    isValid={this.state.validatedEmail}
                    isInvalid={
                      this.state.email &&
                      !this.state.validatedEmail
                    }
                    id="gmail-form-control"
                  />
                </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
                <Form.Text muted>Gmail is required</Form.Text>
              </Form.Group>
            </Row>
            <br />
            <Row>
              <Col>
                <label htmlFor="volunteer-preferences">
                  Volunteer Preferences
                </label>
                <Select
                  closeMenuOnSelect={false}
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
                <Form.Text muted>
                  Specify the type of volunteer work that your prefer
                </Form.Text>
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
                <Form.Text muted>
                  Specify the location that you prefer to volunteer at
                </Form.Text>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
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

export default withRouter(Signup);
