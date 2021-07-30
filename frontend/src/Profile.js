import React from "react";
import { Modal, Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import "./css/Profile.css";
import Select from "react-select";
import { FaEdit } from 'react-icons/fa'

const volunteerOptions = [
  { value: "Garden Workday Volunteer", label: "Garden Workday Volunteer" },
  { value: "Special Events Volunteer", label: "Special Events Volunteer" },
  { value: "Garden Educator Assistant", label: "Garden Educator Assistant" },
  { value: "Office Volunteer", label: "Office Volunteer" },
  { value: "Family Cooking Night Volunteer", label: "Family Cooking Night Volunteer" },
  { value: "Waste Audit Volunteer", label: "Waste Audit Volunteer" }
];

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      volSelected: [],
      locSelected: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      modalMsg: null,
      isErrorModal: null,
      showModal: false,
      validatedPhoneNumber: null,
      validatedFirstName: null,
      validatedLastName: null,
      locationOptions: [],
      editFirstName: false,
      editLastName: false,
      editPhoneNumber: false,
      editedFirstName: null,
      editedLastName: null,
      editedPhoneNumber: null,
      editedLocation: null,
      editedVolunteerPreferences: null
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
      const locSelected = this.props.admin
          ? null
          : this.populateLocationSelection(this.props.user.location, locations)
      const volSelected = this.props.admin
          ? null
          : this.populatePrefSelection(this.props.user.volunteerPreferences, volunteerOptions)
      this.setState({
        locationOptions: locations,
        email: this.props.user.email,
        firstName: this.props.user.name.first,
        lastName: this.props.user.name.last,
        phoneNumber: this.props.user.phoneNumber,
        volSelected: volSelected,
        locSelected: locSelected
      })
    })
  }

  populateLocationSelection = (location, locationOptions) => {
    let locArray = null
    for (let option of locationOptions) {
      if (location === option.value) {
        locArray = option
        return locArray
      }
    }
  }

  populatePrefSelection = (volunteerPreferences, volunteerOptions) => {
    let prefArray = []
    for (let pref of volunteerPreferences) {
        for (let option of volunteerOptions) {
          if (pref === option.value)
            prefArray.push(option)
        }
    }
    return prefArray
  }

  handleVolChange = (volSelected) => {
    this.setState({
      editedVolunteerPreferences: true,
      volSelected: volSelected
    });
  };

  handleLocChange = (locSelected) => {
    this.setState({
      editedLocation: true,
      locSelected: locSelected
    });
  };

  handleFirstNameChange = (event) => {
    this.setState({ editedFirstName: true, firstName: event.target.value })
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
    this.setState({ editedLastName: true, lastName: event.target.value })
    if(event.target.value &&
      /^[a-zA-Z]+$/.test(event.target.value) &&
      event.target.value.length > 1) {
      this.setState({ validatedLastName: true})
    }
    else {
      this.setState({ validatedLastName: false})
    }
  }

  handlePhoneChange = (event) => {
    let index = 0
    this.setState({ editedPhoneNumber: true, phoneNumber: event.target.value })
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

  handleShowModal = (modalMsg, isError) => {
    this.setState({
      modalMsg: modalMsg,
      isErrorModal: isError,
      showModal: true
    })
  }

  handleClose = () => {
    if(this.state.modalMsg === "Empty fields are not allowed.")
      this.setState({ showModal: false })
    else
      window.location.assign('/profile')
  }

  handleEditBtn = (property) => {
    switch(property) {
      case 'firstName':
        this.setState({editFirstName: true})
        break;
      case 'lastName':
        this.setState({editLastName: true})
        break;
      case 'phoneNumber':
        this.setState({editPhoneNumber: true})
        break;
      default:
    }
  }

  handleCancelFirstName = () => {
    this.setState({
      editedFirstName: false,
      editFirstName: false,
      validatedFirstName: null,
      firstName: this.props.user.name.first,
    })
  }

  handleCancelLasttName = () => {
    this.setState({
      editedLastName: false,
      editLastName: false,
      validatedLastName: null,
      lastName: this.props.user.name.last,
    })
  }

  handleCancelPhoneNumber= () => {
    this.setState({
      editedPhoneNumber: false,
      editPhoneNumber: false,
      validatedPhoneNumber: null,
      phoneNumber: this.props.user.phoneNumber,
    })
  }

  handleEdit = (event) => {
    event.preventDefault();

    // Don't submit data unless fields are non-empty
    if (
      !this.state.firstName||
      !this.state.lastName ||
      !this.state.phoneNumber ||
      !this.state.email ||
      (!this.props.admin && !this.state.locSelected ) ||
      (!this.props.admin && this.state.volSelected.length === 0 )
    ) {
      this.handleShowModal("Empty fields are not allowed.", false)
      return
    }

    const editData = {
      name: {
          first: this.state.firstName,
          last: this.state.lastName
      },
      volunteerPreferences: (this.props.admin) ? null : this.state.volSelected.map(entry => entry.value),
      phoneNumber: this.state.phoneNumber,
      location: (this.props.admin) ? null : this.state.locSelected.value,
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/edit`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editData)
      }).then( response => {
        if(response.status === (200))
          this.handleShowModal("Your profile has been successfully updated!", false);
        else
          this.handleShowModal("Attempt to edit your profile failed.", true)
      }).catch( err => {
        this.handleShowModal('An error occurred. Please try again.', true);
      })
  }

  render() {
    return (
      <div className="edit-profile-wrapper">
        <Modal centered show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>{this.state.isErrorModal ? "Error" : "Success"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalMsg}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <div className="edit-profile-title">Your Profile</div>
        <Container fluid="md">
          <Form className="edit-profile-forms" onSubmit={this.handleEdit}>
            <Row>
              <Form.Group as={Col} controlId="first-name">
                <div className="form-label-edit-btn">
                  <Form.Label>First Name</Form.Label>
                  <FaEdit className="edit-button" onClick={() => this.handleEditBtn('firstName')}/>
                </div>
                <InputGroup>
                  <Form.Control
                    required
                    placeholder="Enter your first name..."
                    size="lg"
                    readOnly={!this.state.editFirstName}
                    value={this.state.firstName}
                    onChange={this.handleFirstNameChange}
                    isValid={this.state.validatedFirstName}
                    isInvalid={this.state.editedFirstName && this.state.firstName && !this.state.validatedFirstName}
                  />
                  {this.state.editFirstName ?
                    <InputGroup.Append>
                      <Button variant="large" onClick={this.handleCancelFirstName}>Cancel</Button>
                    </InputGroup.Append>
                  : null }
                </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Plese enter a valid first name</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="last-name">
                <div className="form-label-edit-btn">
                  <Form.Label>Last Name</Form.Label>
                  <FaEdit className="edit-button" onClick={() => this.handleEditBtn('lastName')}/>
                </div>
                <InputGroup>
                  <Form.Control
                    required
                    placeholder="Enter your last name..."
                    size="lg"
                    readOnly={!this.state.editLastName}
                    value={this.state.lastName}
                    onChange={this.handleLastNameChange}
                    isValid={this.state.validatedLastName}
                    isInvalid={this.state.editedLastName && this.state.lastName && !this.state.validatedLastName}
                  />
                  {this.state.editLastName ?
                    <InputGroup.Append>
                      <Button variant="large" onClick={this.handleCancelLasttName}>Cancel</Button>
                    </InputGroup.Append>
                  : null }
                </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Plese enter a valid last name</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <br />
            <Row>
              <Form.Group as={Col} controlId="phone-number">
                <div className="form-label-edit-btn">
                  <Form.Label>Phone Number</Form.Label>
                  <FaEdit className="edit-button" onClick={() => this.handleEditBtn('phoneNumber')}/>
                </div>
                <InputGroup>
                  <Form.Control
                    required
                    placeholder="(###)-###-####"
                    size="lg"
                    readOnly={!this.state.editPhoneNumber}
                    value={this.state.phoneNumber}
                    onChange={this.handlePhoneChange}
                    isValid={this.state.validatedPhoneNumber}
                    isInvalid={this.state.editedPhoneNumber && this.state.phoneNumber && !this.state.validatedPhoneNumber}
                  />
                  {this.state.editPhoneNumber ?
                    <InputGroup.Append>
                      <Button variant="large" onClick={this.handleCancelPhoneNumber}>Cancel</Button>
                    </InputGroup.Append>
                  : null }
                </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Plese enter a valid phone number</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="email">
                <Form.Label>Gmail</Form.Label>
                <Form.Control
                  readOnly
                  size="lg"
                  value={this.state.email}
                />
              </Form.Group>
              </Row>
              <br />
              {this.props.admin ? null :
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
                  </Col>
                </Row>
              }
              { (this.state.editedFirstName ||
                this.state.editedLastName ||
                this.state.editedPhoneNumber ||
                this.state.editedLocation ||
                this.state.editedVolunteerPreferences) ?
                  <div className='d-flex justify-content-center'>
                    <Button type="submit" className="edit-profile-button">Save Changes</Button>
                  </div>
                : null
              }
          </Form>
        </Container>
      </div>
    );
  }
}

export default Profile;
