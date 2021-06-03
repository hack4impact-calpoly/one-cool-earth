import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "react-dropdown/style.css";
import "./css/SignUp.css";
import Select from "react-select";

// DUMMY: need to replace with backend data
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

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      volSelected: null,
      locSelected: null,
      errorMsg: null,
      showModal: false,
    }
    this.clear = this.clear.bind(this)
    this.postSignUpData = this.postSignUpData.bind(this)
    this.handleLocChange = this.handleLocChange.bind(this)
    this.handleVolChange = this.handleVolChange.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleVolChange = (volSelected) => {
    this.setState({ volSelected: volSelected });
  };

  handleLocChange = (locSelected) => {
    this.setState({ locSelected: locSelected });
  };

  handleShowModal (errorMsg) {
    this.setState({ errorMsg: errorMsg, showModal: true })
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  postSignUpData() {
    const first = document.getElementById("first-name") ? document.getElementById("first-name").value : null;
    const last = document.getElementById("last-name") ? document.getElementById("last-name").value : null;
    const preferences = (this.state.volSelected) ? this.state.volSelected.map( entry => entry.value ) : null;
    const phone = document.getElementById("phone-number") ? document.getElementById("phone-number").value : null;
    const email = document.getElementById("email") ? document.getElementById("email").value : null;
    const location = this.state.locSelected ? this.state.locSelected.value : null;

    //Don't submit data unless both fields are non-empty
    if (
      first === "" ||
      last === "" ||
      preferences === "" ||
      phone === "" ||
      email === "" ||
      location === ""
    ) {
      this.handleShowModal('Invalid inputs!');
      return;
    }

    const SignUpData = {
      name: {
          first: first,
          last: last
      },
      preferences: preferences,
      phoneNum: phone,
      email: email,
      loc: location,
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
    })
  }

  clear() {
    // everything except for the 2 dropdown menu values gets reset
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("phone-number").value = "";
    document.getElementById("email").value = "";
  }

  render() {
    const { volSelected } = this.state;
    const { locSelected } = this.state;

    return (
      <div className="wrapper">
        <Modal centered show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.errorMsg}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="title">
          <h2>New Volunteer? Sign Up Here!</h2>
        </div>
        <div className="fields" style={{ paddingBottom: "20px" }}>
          <div className="fields-column">
            <div id="first-name-field" className="input">
              <label for="first-name">First Name</label>
              <input id="first-name"></input>
            </div>
            <div id="last-name-field" className="input">
              <label for="last-name">Last Name</label>
              <input id="last-name"></input>
            </div>
            <div id="volunteer-preferences-field" className="drop-down">
              <label for="volunteer-preferences">Volunteer Preferences</label>
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
            </div>
          </div>
          <div className="fields-column">
            <div id="phone-number-field" className="input">
              <label for="phone-number">Phone Number</label>
              <input id="phone-number"></input>
            </div>
            <div id="email-field" className="input">
              <label for="email">Email</label>
              <input id="email"></input>
            </div>
            <div id="location-preference-field" className="drop-down">
              <label for="location-preference">Location Preference</label>
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
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            this.postSignUpData();
            this.clear();
          }}
        >
          {" "}
          Sign Up
        </Button>
      </div>
    );
  }
}

export default Signup;
